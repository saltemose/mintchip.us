json.partial! "api/users/user", user: @user
json.balance @user.calculate_balance.to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1,').reverse
json.stocks @user.calculate_stocks
json.buyingPower  sprintf('%.2f', @user.calculate_buying_power).to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1,').reverse
json.balance_data @user.grab_portfolio_data
json.daily_data @user.calculate_daily_data