class CreateDeposits < ActiveRecord::Migration[6.0]
  def change
    create_table :deposits do |t|
      t.integer :user_id
      t.float :amount
    end
  end
end
