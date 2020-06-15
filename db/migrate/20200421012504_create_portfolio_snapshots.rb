class CreatePortfolioSnapshots < ActiveRecord::Migration[6.0]
  def change
    create_table :portfolio_snapshots do |t|
      t.integer :user_id
      t.date :date
      t.float :balance
    end
  end
end
