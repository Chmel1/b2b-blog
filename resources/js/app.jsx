import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Show from './pages/Show';
import Create from './pages/Create';

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<Home />} />
                <Route path="/articles/:id" element={<Show />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </BrowserRouter>
    );
}

if (document.getElementById('app')){
    const root = ReactDOM.createRoot(document.getElementById('app'));
    root.render(<App />);
}