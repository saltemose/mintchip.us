import * as NewsApiUtil from '../util/news_api_util';

export const RECEIVE_NEWS = 'RECEIVE_NEWS';

const receiveNews = allNews => ({
    type: RECEIVE_NEWS,
    allNews
})

export const fetchNews = () => dispatch => (
    NewsApiUtil.fetchNews().then(allNews => dispatch(receiveNews(allNews)))
);

export const fetchMarketNews = () => dispatch => (
    NewsApiUtil.fetchNews()
    .then(news => dispatch(receiveNews(news)))
)