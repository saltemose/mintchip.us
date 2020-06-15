export const fetchNews = () => {
    return $.ajax({
        method: 'GET',
        url: `https://newsapi.org/v2/everything?q=business&apiKey=${window.newsKey}`
    })
    
}