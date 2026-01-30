<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Http\Resources\CommentResource;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, $article_id){

        $article = Article::findOrFail($article_id);

        $validated = $request->validate([
            'author_name' => 'required|string|max:100',
            'content' => 'required|string',
        ]);

        $comment = $article->comments()->create($validated); 

        return response()->json(new CommentResource($comment));
    }
}
