<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CommentController;
use Illuminate\Support\Facades\Route;


Route::controller(ArticleController::class)
->prefix("articles")
->name('articles.')
->group(function () {
    Route::get('/', 'index')->name('index');
    Route::post('/', 'store')->name('store'); 
    Route::get('/{id}', 'show')->name('show');
});

Route::post('/articles/{id}/comments', [CommentController::class,'store']);