json.array! @news do |news_article|
  json.set! news_article.id
  json.author news_article.source 
  json.title news_article.title
  json.content news_article.content
  json.url news_article.url
  json.urlToImage news_article.urlToImage
end