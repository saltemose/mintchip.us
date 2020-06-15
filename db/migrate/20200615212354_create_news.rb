class CreateNews < ActiveRecord::Migration[6.0]
  def change
    create_table :news do |t|
      t.string :source
      t.string :title
      t.string :content
      t.string :url
      t.string :urlToImage

      t.timestamps
    end
  end
end
