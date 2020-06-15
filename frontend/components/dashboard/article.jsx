import React from 'react';

const Article = ({ article }) => (
    <li>
        <a href={article.url} target="_blank">
            <div className="article-image">
            </div>
            <div className="article-info">
                <h4>{article.title}</h4>
                <p>{article.description}</p>
            </div>
        </a>
    </li>
);

export default Article;