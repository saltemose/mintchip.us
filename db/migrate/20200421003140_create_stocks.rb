class CreateStocks < ActiveRecord::Migration[6.0]
  def change
    create_table :stocks do |t|
      t.string :name
      t.string :ticker
    end
    add_index :stocks, :ticker, unique: true
  end
end
