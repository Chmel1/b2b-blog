<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    
    public function definition(): array
    {
        return [
            'title' => fake()->realText(50),       
            'content' => fake()->realText(1000), 
            'created_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ];
    }
}