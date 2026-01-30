import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Create() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate(); // Хук для перенаправления пользователя

    const submitForm = (e) => {
        e.preventDefault();
        
        // Отправляем данные на Бэкенд
        axios.post('/api/articles', {
            title: title,
            content: content
        }).then(() => {
            // Если успешно — перекидываем пользователя на Главную
            navigate('/');
        }).catch(error => {
            alert('Ошибка при создании!');
            console.error(error);
        });
    };

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <Link to="/" className="text-blue-500 hover:underline">← Назад</Link>
            
            <h1 className="text-3xl font-bold mt-4 mb-6">Новая статья</h1>
            
            <form onSubmit={submitForm} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Заголовок</label>
                    <input 
                        type="text" 
                        className="w-full border p-2 rounded"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Текст статьи</label>
                    <textarea 
                        className="w-full border p-2 rounded h-32"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    Опубликовать
                </button>
            </form>
        </div>
    );
}