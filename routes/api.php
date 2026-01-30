<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CommentController;
use Illuminate\Support\Facades\Route;


Route::controller(ArticleController::class)->prefix("articles")->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::get('/{id}', 'show');
});

Route::post('/articles/{id}/comments', [CommentController::class,'store']);