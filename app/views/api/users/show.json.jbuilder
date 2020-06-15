json.partial! "api/users/user", user: @user
json.transactions @user.transactions.map { |el| el.id }