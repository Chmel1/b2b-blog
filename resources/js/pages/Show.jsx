import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function Show() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [commentAuthor, setCommentAuthor] = useState('');
    const [commentContent, setCommentContent] = useState('');

    // Загрузка статьи
    useEffect(() => {
        axios.get(`/api/articles/${id}`).then(response => {
            setArticle(response.data.data);
        });
    }, [id]);

    // Отправка комментария
    const submitComment = (e) => {
        e.preventDefault();
        axios.post(`/api/articles/${id}/comments`, {
            author_name: commentAuthor,
            content: commentContent
        }).then(response => {
            
            const newComment = response.data; 
            setArticle({
                ...article,
                comments: [...article.comments, newComment]
            });
            
            setCommentAuthor('');
            setCommentContent('');
        }).catch(error => {
            alert('Ошибка при отправке (проверь консоль)');
            console.error(error);
        });
    };

    if (!article) return <div className="p-4">Загрузка...</div>;

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <Link to="/" className="text-blue-500 hover:underline">← Назад</Link>
            
            <h1 className="text-3xl font-bold mt-4">{article.title}</h1>
            <p className="text-gray-500 text-sm">{article.created_at}</p>
            
            <div className="mt-6 text-lg leading-relaxed whitespace-pre-wrap">
                {article.content}
            </div>

            <hr className="my-8" />

            {/* Блок комментариев */}
            <h3 className="text-xl font-bold mb-4">Комментарии ({article.comments.length})</h3>
            
            <div className="space-y-4 mb-8">
                {article.comments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 border p-3 rounded">
                        <strong className="block text-gray-700">{comment.author_name}</strong>
                        <p className="text-gray-600">{comment.content}</p>
                        <span className="text-xs text-gray-400">{comment.created_at}</span>
                    </div>
                ))}
                {article.comments.length === 0 && <p className="text-gray-500">Пока нет комментариев. Будь первым!</p>}
            </div>

            {/* Форма добавления */}
            <div className="bg-gray-100 p-4 rounded">
                <h4 className="font-bold mb-2">Оставить комментарий</h4>
                <form onSubmit={submitComment}>
                    <div className="mb-2">
                        <input 
                            type="text" 
                            placeholder="Ваше имя"
                            className="w-full border p-2 rounded"
                            value={commentAuthor}
                            onChange={e => setCommentAuthor(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <textarea 
                            placeholder="Текст комментария"
                            className="w-full border p-2 rounded"
                            rows="3"
                            value={commentContent}
                            onChange={e => setCommentContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
}