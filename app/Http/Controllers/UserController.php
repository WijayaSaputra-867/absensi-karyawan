<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', ''); // mengambil data dari input type

        $users = User::query() // membuat query user
            ->select('id', 'name', 'role') // memilih field yang akan tampil
            ->when(
                $search,
                fn($q) => $q
                    ->where('name', 'like', "%{$search}%") // akan mengganti $users yang lama jika kondisi terpenuhi
            )
            ->orderBy('name', 'ASC') // mengurutkan berdasarkan nama dari A sampai ke Z
            ->paginate(5) // membatasi data perhalaman menjadi beberapa halaman saja
            ->withQueryString(); // agar search terbaca di url

        return Inertia::render('Users/Index', compact('users')); // menjalankan tampilan react dan mengirim data pengguna ke tampilan react
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Users/Create'); // menjalankan tampilan react
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
