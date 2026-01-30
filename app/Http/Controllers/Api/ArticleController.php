<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Http\Resources\ArticleResource;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(){//Показать все статьи
        $articles = Article::latest()->get();

        return ArticleResource::collection($articles);
    }

    public function show($id){//Просмотреть одну статью
        $article = Article::with('comments')->findOrFail($id);

        return new ArticleResource($article);
    }

    public function store(Request $request){//Создание нового поста
        $validated = $request->validate([
            'title'=> 'required|string|max:255',
            'content'=> 'required|string',
        ]);

        $article = Article::create($validated);

        return response()->json(new ArticleResource($article), 201);
    }
}
