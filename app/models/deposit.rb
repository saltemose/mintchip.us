# == Schema Information
#
# Table name: deposits
#
#  id      :bigint           not null, primary key
#  amount  :float
#  user_id :integer
#
class Deposit < ApplicationRecord 
    validates :user_id, presence: true

    belongs_to :user 
end
