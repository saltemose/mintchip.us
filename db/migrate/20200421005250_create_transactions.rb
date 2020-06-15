class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.integer :user_id
      t.integer :stock_id
      t.float :price
      t.integer :num_shares
      t.string :order_type
      t.datetime :transaction_date
    end
  end
end
