import React, {useEffect, useInsertionEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormState } from "react-dom";

export default function Home(){
    const [articles, setArticles] = useState([]);

    useEffect(()=>{
        axios.get('/api/articles').then(response => {
            setArticles(response.data.data);
        });
    }, []);

    return(
        <div className = "container mx-auto p-4">
            <h1 className = "text-3xl font-bold mb-4">Блог B2B</h1>
            <Link to = "/create" className = "bg-blue-500 text-white px-4 py-2 rounded">Написать статью</Link>

            <div className = "mt-6 space-y-4">
                {articles.map(article =>(
                    <div key = {article.id} className = "border p-4 rounded shadow">
                        <h2 className = "text-xl font-bold">
                            <Link to = {`/articles/${article.id}`}>{article.title}</Link>
                        </h2>
                        <p className = "text-gray-600">{article.created_at}</p>
                        <p className = "mt-2">{article.content.substring(0,100)}...</p>
                    </div>
                ))}
            </div>
        </div>
    );
}