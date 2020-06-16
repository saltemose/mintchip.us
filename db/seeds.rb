# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require_relative 'portfolio_snapshots'

User.delete_all
Stock.delete_all
Deposit.delete_all
Transaction.delete_all
News.delete_all

u1 = User.create!(
  username: 'guest',
  password: 'password'
)

Deposit.create({user_id: u1.id, amount: 50000})

u2 = User.create!(
  username: 'username',
  password: 'password'
)

nasdaq_stock_data = File.read(Rails.root.join('db/nasdaq.csv'))

nasdaq_stocks_array = nasdaq_stock_data.split(/^/) 
stock_object = {}
nasdaq_stocks = []
nasdaq_stocks_array.each do |stock|
   stock_object = {
        ticker: stock.split(",")[0],
        name: stock.split(",")[1].chomp.delete('\\"')
    } 
nasdaq_stocks.push(stock_object)
stock_object = {}
   nasdaq_stocks
end

nyse_data = File.read(Rails.root.join('db/nyse.csv'))

nyse_stocks_array = nyse_data.split(/^/)
stock_object = {}
nyse_stocks = []
nyse_stocks_array.each do |stock|
    stock_object = {
        ticker: stock.split(",")[0],
        name: stock.split(",")[1].chomp.delete('\"')
    }
nyse_stocks.push(stock_object)
stock_object = {}
    nyse_stocks
end

all_stocks = nasdaq_stocks + nyse_stocks
Stock.create(all_stocks)


  # Find stocks for portfolio
  aapl = Stock.find_by(ticker: :AAPL)
  amzn = Stock.find_by(ticker: :AMZN)
  fb = Stock.find_by(ticker: :FB)
  nflx = Stock.find_by(ticker: :NFLX)
  twtr = Stock.find_by(ticker: :TWTR)
  msft = Stock.find_by(ticker: :MSFT)
  sbux = Stock.find_by(ticker: :SBUX)
  amd = Stock.find_by(ticker: :AMD)
  blue = Stock.find_by(ticker: :BLUE)
  gild = Stock.find_by(ticker: :GILD)
  nktr = Stock.find_by(ticker: :NKTR)
  lulu = Stock.find_by(ticker: :LULU)
  stz = Stock.find_by(ticker: :STZ)

  # Generate transactions based on actual close prices for each stock at given date
  Time.zone = 'Eastern Time (US & Canada)'

Transaction.create([
  {user_id: u1.id, stock_id: aapl.id, price: 68.45, num_shares: 50, order_type: 'buy', transaction_date: Time.zone.local(2014, 4, 16, 16, 0, 0)},
  {user_id: u1.id, stock_id: amzn.id, price: 305.84, num_shares: 20, order_type: 'buy', transaction_date: Time.zone.local(2014, 12, 10, 16, 0, 0)},
  {user_id: u1.id, stock_id: fb.id, price: 92.31, num_shares: 40, order_type: 'buy', transaction_date: Time.zone.local(2015, 9, 14, 16, 0, 0)},
  {user_id: u1.id, stock_id: nflx.id, price: 57.99, num_shares: 50, order_type: 'buy', transaction_date: Time.zone.local(2014, 2, 4, 16, 0, 0)},
  {user_id: u1.id, stock_id: twtr.id, price: 54.50, num_shares: 50, order_type: 'buy', transaction_date: Time.zone.local(2014, 3, 12, 16, 0, 0)},
  {user_id: u1.id, stock_id: msft.id, price: 37.91, num_shares: 50, order_type: 'buy', transaction_date: Time.zone.local(2014, 7, 14, 16, 0, 0)},
  {user_id: u1.id, stock_id: sbux.id, price: 37.54, num_shares: 50, order_type: 'buy', transaction_date: Time.zone.local(2014, 12, 17, 16, 0, 0)},
  {user_id: u1.id, stock_id: amd.id, price: 2.32, num_shares: 1000, order_type: 'buy', transaction_date: Time.zone.local(2015, 5, 20, 16, 0, 0)},
  {user_id: u1.id, stock_id: blue.id, price: 90.34, num_shares: 30, order_type: 'buy', transaction_date: Time.zone.local(2015, 2, 17, 16, 0, 0)},
  {user_id: u1.id, stock_id: gild.id, price: 104.48, num_shares: 50, order_type: 'buy', transaction_date: Time.zone.local(2015, 8, 7, 16, 0, 0)},
  {user_id: u1.id, stock_id: nktr.id, price: 15.27, num_shares: 100, order_type: 'buy', transaction_date: Time.zone.local(2016, 4, 13, 16, 0, 0)},
  {user_id: u1.id, stock_id: lulu.id, price: 51.91, num_shares: 50, order_type: 'buy', transaction_date: Time.zone.local(2015, 10, 12, 16, 0, 0)},
  {user_id: u1.id, stock_id: stz.id, price: 152.50, num_shares: 20, order_type: 'buy', transaction_date: Time.zone.local(2017, 2, 9, 16, 0, 0)}
])

SNAPSHOTS.each do |snapshot|
  date = Date.parse(snapshot[:time])
  balance = snapshot[:balance]
  PortfolioSnapshot.create({ date: date, balance: balance, user_id: u1.id })
end

News.create([
  {source: "The Economist",
  title: "Can Hong Kong remain a global financial centre?",
    content: "The best way to get your head around the role that Hong Kong plays in the global financial system, says a business figure there, is to think of it as an electrical transformer that connects two circuits with different voltages. One is the global financial system with its freewheeling capital flows, open dissemination of information and the rule of law. The other circuit is China’s vast and growing financial system with its controls on capital, censorship and capricious enforcement of contracts.",
    url: "https://www.economist.com/finance-and-economics/2020/06/06/can-hong-kong-remain-a-global-financial-centre",
    urlToImage: "https://www.economist.com/img/b/1280/720/90/sites/default/files/20200606_FNP002_0.jpg"
  },
  {
source: "TechCrunch",
title: "Salesforce Commerce Cloud releases four quick-start pandemic business packs",
url: "http://techcrunch.com/2020/05/21/salesforce-commerce-cloud-releases-four-quick-start-pandemic-business-packs/",
urlToImage: "https://techcrunch.com/wp-content/uploads/2020/05/Screenshot-2020-05-21-07.57.44.jpg?w=428",
content: "As we move deeper into the pandemic, it’s clear that the way we conduct business is changing, maybe forever. That means that business has to change too — and fast. But if you’ve never conducted busin… [+3366 chars]"},
{
  source: "CNN",
  title: "Flour business saved by amateur bakers",
  url: "https://www.cnn.com/videos/travel/2020/06/02/ny-flour-business-saved-during-covid.cnn",
  urlToImage: "https://cdn.cnn.com/cnnnext/dam/assets/200602102736-ny-flour-business-1-super-tease.jpg",
  content: "Chat with us in Facebook Messenger. Find out what's happening in the world as it unfolds."},
  {
    source: "TechCrunch",
    title: "Facebook and Instagram rolls out Shops, turning business profiles into storefronts",
    url: "http://techcrunch.com/2020/05/19/facebook-shops/",
    urlToImage: "https://techcrunch.com/wp-content/uploads/2020/05/Facebook-Shops_color.jpeg?w=711",
    content: "Starting today, you’ll be able to browse and buy products directly from a business’ Facebook Page or Instagram profile. Both Facebook and Instagram already supported a degree of ecommerce for exampl… [+2973 chars]"},
    {
      source: "Gizmodo.com",
      title: "General Electric Finally Manages to Jettison Its Historic Lighting Business",
      url: "https://gizmodo.com/general-electric-finally-manages-to-jettison-its-histor-1843715650",
      urlToImage: "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/lx0hflcbfrzaygwfpryk.jpg",
      content: "General Electric is no longer in the light bulb business, the company announced on Wednesday. GE said that its 129-year-old lighting unitwhich was formed in 1892 from the merger of Thomas Edisons Ed… [+2330 chars]"},

])