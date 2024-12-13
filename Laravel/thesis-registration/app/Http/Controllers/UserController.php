<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // A User model betöltése

class UserController extends Controller
{
    // Felhasználók listázása
    public function index()
    {
        $users = User::all(); // Összes felhasználó lekérése
        return response()->json($users);
    }

    // Felhasználói adatok módosítása
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->update($request->all()); // Adatok frissítése
        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }
}
