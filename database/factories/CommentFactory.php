<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'author_name' => fake()->name(),
            'content' => fake()->sentence(10),
        ];
    }
}