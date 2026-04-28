<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
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
        $request->validate([
            'name' => 'required|string|min:4|max:255',
            'role' => 'in:admin,employee',
            'email' => 'required|string|min:4|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Password::min(8)->mixedCase()->letters()->numbers()->symbols()]
        ]); // melakukan validasi agar menyesuaikan dengan fieldnya

        User::create([
            'id' => Str::uuid(),
            'name' => $request->name,
            'role' => $request->role,
            'email' => $request->email,
            'password' => $request->password
        ]); // menambahkan data user melalui model

        return redirect()->back(); // mengembalikan ke halaman sebelumnya
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
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|min:4|max:255',
            'role' => 'in:admin,employee',
            'email' => 'required|string|min:4|max:255|unique:users,email,' . $user->id
        ]); // melakukan validasi agar menyesuaikan dengan fieldnya

        $user->update([
            'name' => $request->name,
            'role' => $request->role,
            'email' => $request->email
        ]); // mengubah data user berdasarkan model

        return redirect()->back(); // mengembalikan ke halaman sebelumnya
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // dd($user);
        $user->delete(); // menghapus data user
        return redirect()->back(); //  mengembalikan ke halaman sebelumnya
    }

    public function editPassword(User $user)
    {
        // dd($user);
        return Inertia::render('Users/Password', compact('user'));
    }

    public function updatePassword(User $user)
    {
        //
    }
}
