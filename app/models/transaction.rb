# == Schema Information
#
# Table name: transactions
#
#  id               :bigint           not null, primary key
#  num_shares       :integer
#  order_type       :string
#  price            :float
#  transaction_date :datetime
#  stock_id         :integer
#  user_id          :integer
#
class Transaction < ApplicationRecord
    validates :user_id, :stock_id, :price, :num_shares, :order_type, presence: true

    belongs_to :user
    belongs_to :stock 

end
