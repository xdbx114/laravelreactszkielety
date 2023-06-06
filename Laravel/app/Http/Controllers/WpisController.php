<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wpis;

class WpisController extends Controller
{
    public function store()
    {
        $credentials = request(['tytul', 'tresc','user_id']);
        Wpis::create($credentials);

        return response()->json('successss');
    }

    public function update(Request $request, $id)
    {
        $wpis = Wpis::find($id);

        if (!$wpis) {
            return response()->json(['error' => 'Wpis not found'], 404);
        }

        $validatedData = $request->validate([
            'tytul' => 'required',
            'tresc' => 'required',
            'user_id' => 'required|exists:users,id',
        ]);

        $wpis->update($validatedData);

        return response()->json($wpis);
    }

    public function destroy($id)
    {
        $wpis = Wpis::find($id);

        if (!$wpis) {
            return response()->json(['error' => 'Wpis not found'], 404);
        }

        $wpis->delete();

        return response()->json('success');
    }
}
