# == Schema Information
#
# Table name: stocks
#
#  id     :bigint           not null, primary key
#  name   :string
#  ticker :string
#
# Indexes
#
#  index_stocks_on_ticker  (ticker) UNIQUE
#
class Stock < ApplicationRecord
    validates :name, :ticker, presence: true
    validates :ticker, uniqueness: true


end
