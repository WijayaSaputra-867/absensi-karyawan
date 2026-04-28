<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'id' => Str::uuid(),
            'name' => 'Muhammad Wijaya Saputra',
            'role' => 'admin',
            'email' => 'wijayasaputra679@gmail.com',
            'password' => Hash::make('12345678')
        ]); // menambahkan data sesuai yang diinginkan

        User::factory(20)->create(); // menambahkan data random berapapun yang di inginkan
    }
}
