# == Schema Information
#
# Table name: news
#
#  id         :bigint           not null, primary key
#  content    :string
#  source     :string
#  title      :string
#  url        :string
#  urlToImage :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class News < ApplicationRecord
    validates :source, :title, :content, :url, :urlToImage, presence: true
end
