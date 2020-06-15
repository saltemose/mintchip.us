# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  password_digest :string
#  session_token   :string
#  username        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_session_token  (session_token) UNIQUE
#  index_users_on_username       (username) UNIQUE
#

require 'open-uri' 

class User < ApplicationRecord

    attr_reader :password
  
    validates :username, :password_digest, :session_token, presence: true
    validates :username, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true
  
    after_initialize :ensure_session_token

    has_many :transactions, dependent: :destroy
    has_many :deposits, dependent: :destroy 
    has_many :portfolio_snapshots, dependent: :destroy

    MONTHS = {
      1 => :JAN,
      2 => :FEB,
      3 => :MAR,
      4 => :APR,
      5 => :MAY,
      6 => :JUN,
      7 => :JUL,
      8 => :AUG,
      9 => :SEP,
      10 => :OCT,
      11 => :NOV,
      12 => :DEC
    }
  
    def self.find_by_credentials(username, password)
      user = User.find_by(username: username)
      return nil unless user
      user.is_password?(password) ? user : nil
    end
  
    def password=(password)
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end
  
    def is_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
    end
  
    def reset_session_token!
      generate_unique_session_token
      save!
      self.session_token
    end

    def shares_owned(stock_id)
      transactions.where(stock_id: stock_id).reduce(0) do |shares, transaction| 
        if transaction.order_type == 'buy'
          shares + transaction.num_shares
        else 
          shares - transaction.num_shares
        end
      end
    end

    def calculate_buying_power 
      buying_power = 0
      deposits.each {|deposit| buying_power += deposit.amount}

      transactions.each do |transaction|
        transaction_amount = transaction.price * transaction.num_shares
        transaction.order_type == 'buy' ? buying_power -= transaction_amount : buying_power += transaction_amount
      end 

      buying_power.round(2)
      
    end

    def stocks_owned
      stocks = Hash.new(0)
      return [] if transactions.empty?
      transactions_with_stocks = transactions.includes(:stock)
  
      transactions_with_stocks.each do |transaction|
        curr_stock = transaction.stock
        if transaction.order_type == 'buy'
          stocks[curr_stock.ticker] += transaction.num_shares
        else
          stocks[curr_stock.ticker] -= transaction.num_shares
        end
      end
  
      stocks.reject { |_, shares| shares.zero? }
    end

    def calculate_stocks
      return [] if stocks_owned.empty?
  
      stocks = stocks_owned
                .map { |stock| {symbol: stock[0], shares: stock[1]} }
                .sort_by { |stock| stock[:symbol] }
  
      url = "https://sandbox.iexapis.com/stable/stock/market/batch?types=quote,chart&range=1d&token=#{ENV["iex_api_key"]}&symbols="
      stocks.each { |stock| url += "#{stock[:symbol]},"}
      response = JSON.parse(open(url).read)
  
      #Credit to user245031 and lolmaus - Andrey Mikhaylov on Stack Overflow for the code to make API call in Ruby
      # response = JSON.parse(open(url).read)
      stocks.each_with_index do |stock, idx|
        price = response[stock[:symbol]]['quote']['latestPrice'].to_f.round(2).to_s
        if !price.include?('.')
          price += '.00'
        elsif price.split('.')[1].length == 1
          price += '0'
        end
        stock[:price] = price
        stock[:intradayData] = response[stock[:symbol]]['chart']
        stock[:openPrice] = stock[:intradayData][0]['open']
      end
  
      stocks
    end
  
    
  def calculate_balance
    stocks = calculate_stocks
    balance = calculate_buying_power
    stocks.each do |stock|
      balance += (stock[:price].to_f * stock[:shares])
    end
    
   sprintf('%.2f', balance.round(2))
  end
  
  def grab_portfolio_data
    portfolio_snapshots.order(:date).map do |snapshot|
      { time: format_date(snapshot[:date]), balance: snapshot[:balance] }
    end
  end


  def format_date(date)
    year = date.year.to_s
    month = date.month < 10 ? '0' + date.month.to_s : date.month.to_s
    day = date.day < 10 ? '0' + date.day.to_s : date.day.to_s
    formattedTime = "#{MONTHS[date.month.to_i]} #{date.day}, #{date.year}"

    formattedTime
  end

  def calculate_balance_data(range = nil)
    net_deposits = self.deposits.to_a.reduce(0) { |acc, deposit| acc += deposit.amount }
    data = []
    return data if transactions.empty?

    sorted_transactions = transactions.includes(:stock).sort_by { |transaction| transaction.transaction_date }.to_a
    unique_stocks = transactions.includes(:stock).select(:stock_id).distinct.to_a
    unique_stocks.map! { |transaction| transaction.stock }

    range = ((Time.now - sorted_transactions.first.transaction_date.to_time)/(60*60*24*365)).ceil unless range
    # API can't handle a range greater than 5
    range = 5 if range > 5
    
    # Construct url and make API call
    url = "https://sandbox.iexapis.com/stable/stock/market/batch?types=chart&token=#{ENV["iex_api_key"]}&range=#{range}y&last=5&symbols="
    unique_stocks.each { |stock| url += "#{stock.ticker}, " }
    response = JSON.parse(open(url).read)

    cash_balance = net_deposits
    curr_stocks = Hash.new(0)
    last_balance = cash_balance

    sorted_transactions.each_with_index do |transaction, idx|
      curr_stock = transaction.stock
      transaction_amount = transaction.num_shares * transaction.price

      if transaction.order_type == 'buy'
        curr_stocks[curr_stock.ticker] += transaction.num_shares
        cash_balance -= transaction_amount
      else
        curr_stocks[curr_stock.ticker] -= transaction.num_shares
        cash_balance += transaction_amount
      end

      if idx == sorted_transactions.length - 1
        range = transaction.transaction_date.to_datetime..Time.now.to_datetime
      else
        transaction_datetime = transaction.transaction_date.to_datetime
        next_transaction_datetime = sorted_transactions[idx+1].transaction_date.to_datetime
        range = transaction_datetime..next_transaction_datetime
        next if transaction_datetime.year == next_transaction_datetime.year && transaction_datetime.month == next_transaction_datetime.month && transaction_datetime.day == next_transaction_datetime.day
      end
      stock_value = 0
      
      range.each_with_index do |date, jdx|
        stock_value = 0
        year = date.year.to_s
        month = date.month < 10 ? '0' + date.month.to_s : date.month.to_s
        day = date.day < 10 ? '0' + date.day.to_s : date.day.to_s
        date_string = "#{year}-#{month}-#{day}"
        formattedDate = "#{MONTHS[date.month.to_i]} #{date.day}, #{date.year}"

        stock_day_info = nil
        curr_stocks.each do |k, v|
          stock_day_info = response[k]['chart'].find { |days| days['date'] == date_string}
          stock_value += stock_day_info['close'] * v unless stock_day_info.nil?
        end
        unless stock_day_info.nil?
          balance = cash_balance + stock_value
          last_balance = balance
          data.push({ time: formattedDate, balance: balance.round(2) }) 
        end

        data.push({ time: formattedDate, balance: last_balance.round(2) }) if stock_day_info.nil? && idx == transactions.length - 1 && jdx == range.to_a.length - 1
      end
    end

    return data
  end

  def increment_time(time)
    time_nums = time.split(':').map(&:to_i)
    time_nums[-1] = (time_nums.last + 1) % 60
    time_nums[0] += 1 if time_nums.last == 0
    hour = time_nums.first < 10 ? "0#{time_nums.first}" : time_nums.first.to_s
    minute = time_nums.last < 10 ? "0#{time_nums.last}" : time_nums.last.to_s

    "#{hour}:#{minute}"
  end

  def calculate_daily_data
    ## Get total amount user has ever deposited
    net_deposits = self.deposits.to_a.reduce(0) do |acc, deposit|
      acc += deposit.amount
    end

    data = []
    return data if transactions.empty?

    # Grab transactions from earliest to most recent to iterate through in order
    sorted_transactions = transactions.includes(:stock).sort_by { |transaction| transaction.transaction_date }.to_a

    # Grab unique stocks from transactions to get user's portfolio
    unique_stocks = transactions.includes(:stock).select(:stock_id).distinct.to_a
    unique_stocks.map! { |transaction| transaction.stock }

    # Dynamically generate API url based on stocks owned by user and make batch request to IEX
    url="https://sandbox.iexapis.com/stable/stock/market/batch?types=chart&range=1d&last=5&token=#{ENV["iex_api_key"]}&symbols="
    unique_stocks.each { |stock| url += "#{stock.ticker}, " }
    response = JSON.parse(open(url).read)

    times = ['09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15:', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00']
    open_balance = net_deposits
    balance = calculate_balance
    curr_stocks = Hash.new(0)
    transaction_index = sorted_transactions.length

    # Return nothing if it is a holiday and there is no data this day
    if response.all? { |k, _| response[k]['chart'].empty? }
      times.each do |time|
        hour = time.split(':')[0].to_i
        minute_string = time.split(':')[1]
        label = hour > 12 ? "#{hour - 12}:#{minute_string} PM ET" : "#{time} AM ET"
        label = "#{time} PM ET" if hour == 12

        data.push({ time: label, balance: balance })
      end

      return data
    end


    ## Iterate through all transactions previous to the current day to get closing balance of previous day
    sorted_transactions.each_with_index do |transaction, idx|
      curr_stock = transaction.stock

      if transaction.transaction_date.year >= Time.now.year && transaction.transaction_date.month >= Time.now.month && transaction.transaction_date.day >= Time.now.day
        transaction_index = idx
        break
      end

      if transaction.order_type == 'buy'
        curr_stocks[curr_stock.ticker] += transaction.num_shares
        open_balance -= transaction.num_shares * transaction.price
      else
        curr_stocks[curr_stock.ticker] -= transaction.num_shares
        open_balance += transaction.num_shares * transaction.price
      end
    end

    prev_balance = open_balance
    curr_bal_pushed = false

    # Get rid of stocks we don't own anymore - irrelevant to 1D chart
    curr_stocks.select! { |_, shares| !shares.zero? }
    
    # Filter out response for stocks we no longer own or are potentially delisted
    response.select! { |k, v| curr_stocks.has_key?(k) && !response[k]['chart'].empty? }

    # iterate through times and add data points as necessary
    times.each do |time|
      hour = time.split(':')[0].to_i
      minute = time.split(':')[1].to_i
      minute_string = time.split(':')[1]
      timeObject = Time.new(Time.now.year, Time.now.month, Time.now.day, hour + 5, minute, 0, "+00:00")

      # if time we are iterating over is within 20 mins of current time, push in 
      # current balance the first time and nil every time after (IEX API has 
      # 15 minute delay) unless it's on the weekend
      unless timeObject.on_weekend?
        if timeObject > Time.now.getgm - 1200 || response.all? { |k, _| response[k]['chart'].last['minute'] < time}
          label = hour > 12 ? "#{hour - 12}:#{minute_string} PM ET" : "#{time} AM ET"
          label = "#{time} PM ET" if hour == 12
          unless curr_bal_pushed
            data.push({ time: label, balance: balance })
            curr_bal_pushed = true
            next
          else
            data.push({ time: label, balance: nil })
            next
          end
        end
      end

      if transaction_index < sorted_transactions.length
        if timeObject > sorted_transactions[transaction_index].transaction_date
          transaction = sorted_transactions[transaction_index]
          curr_stock = transaction.stock

          if transaction.order_type == 'buy'
            curr_stocks[curr_stock.ticker] += transaction.num_shares
            open_balance -= transaction.num_shares * transaction.price
          else
            curr_stocks[curr_stock.ticker] -= transaction.num_shares
            open_balance += transaction.num_shares * transaction.price
          end

          transaction_index += 1
        end
      end

      stock_value = 0
      stock_day_info = nil

      curr_stocks.each do |k, v|
        # What minute of the current 5-minute window are we on for this stock
        minute = 0

        search_time = time == '16:00' ? '15:59' : time
        stock_day_info = response[k]['chart'].find { |times| times['minute'] == search_time}

        if stock_day_info && stock_day_info['open']
          stock_value += stock_day_info['open'] * v unless stock_day_info.nil?
        end

        until (stock_day_info && stock_day_info['open']) || minute == 30
          search_time = increment_time(search_time)
          stock_day_info = response[k]['chart'].find { |times| times['minute'] == search_time}
          stock_value += stock_day_info['open'] * v unless stock_day_info.nil? || !stock_day_info['open']

          minute += 1
        end

        # If we haven't found a stock price in 30 minutes of searching we'll 
        # just go based on the quote. Need the additional checks in case we 
        # found the data on exactly minute 30, don't want to double count it
        if (minute == 30 && !stock_day_info) || (minute == 30 && !stock_day_info['open'])
          quote = response[k]['quote']
          price = quote['open'] || quote['close'] || quote['high'] || quote['low'] || quote['latestPrice']
          stock_value += price * v
        end
      end

      balance = open_balance

      if stock_value == 0
        balance = prev_balance
      else
        balance = open_balance + stock_value
        prev_balance = balance
      end

      label = hour >= 12 ? "#{hour - 12}:#{minute_string} PM ET" : "#{time} AM ET"
      label = "#{time} PM ET" if hour == 12
      data.push({ time: label, balance: balance.round(2) }) unless stock_day_info.nil?
    end

    data
  end
  
    private
  
    def ensure_session_token
      generate_unique_session_token unless self.session_token
    end
  
    def new_session_token
      SecureRandom.urlsafe_base64
    end
  
    def generate_unique_session_token
      self.session_token = new_session_token
      while User.find_by(session_token: self.session_token)
        self.session_token = new_session_token
      end
      self.session_token
    end
  

  end
  
