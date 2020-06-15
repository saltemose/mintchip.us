# == Schema Information
#
# Table name: portfolio_snapshots
#
#  id      :bigint           not null, primary key
#  balance :float
#  date    :date
#  user_id :integer
#
class PortfolioSnapshot < ApplicationRecord 
    validates :date, :balance, presence: true

    belongs_to :user
end 
