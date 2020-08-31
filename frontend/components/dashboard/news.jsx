import React from 'react';


class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        
        this.renderNews = this.renderNews.bind(this);

    }

    componentDidMount() {
        this.props.fetchNews()
    }

    renderNews() {
        const { allNews } = this.props;
        let news;
        news = allNews.filter((article) => {
            if (article.author !== null)
            return article; 
        })
    return (
    <div className="main-news-container">
    <div className="news-title">News</div>
                {
                    news.map((article) => {
                        return (
                                <a key={article.title} href={`${article.url}`} className="news-list">
                                <ul className="news-list-item-link">
                                    <div className="news-list-item">
                                    <div className="left-news-item">
                                    <div className="news-list-source">{article.author}</div>
                                    
  
                                    <div className="news-list-title">{article.title}</div>
                        
                                    <div className="news-list-content">{article.content}</div>
                                    </div>

                                    <div className="right-news-item">
                                    <div className="news-image"><img src={`${article.urlToImage}`} alt=""/></div>
                                    </div>
                                    </div>
                                </ul>
                                </a>
                        );
                    })
                }
        </div>
    )};

    render() {
        return (
            <div className="news-container">
                {this.renderNews()}
            </div>
        )
    }
}

export default News;