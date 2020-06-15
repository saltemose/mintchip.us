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
require 'test_helper'

class NewsTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
