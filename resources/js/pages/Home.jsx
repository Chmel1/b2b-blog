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
        //container mx-auto p-4
        //max-w-3xl mx-auto p-4
        <div className = "container mx-auto p-10">
            <h1 className = "text-3xl font-bold mb-4">Блог B2B</h1>
            <Link to = "/create" className = "bg-blue-500 text-white px-4 py-2 rounded">Написать статью</Link>

            <div className = "mt-6 space-y-4">
                {articles.map(article =>(
                    <Link 
                        key={article.id} 
                        to={`/articles/${article.id}`} 
                        className="block border p-4 rounded shadow hover:bg-gray-50 transition duration-200"
                    >
                        <h2 className = "text-xl font-bold">
                            
                            {article.title}
                        </h2>
                        
                        
                        <p className = "text-gray-600">{article.created_at}</p>
                        <p className = "mt-2">{article.content.substring(0,700)}...</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}