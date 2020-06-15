export const fetchNews = () => {
    return $.ajax({
        method: 'GET',
        url: 'api/news'
    })
    
}


