<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentsController extends Controller
{
    public function store()
    {
        $credentials = request(['content', 'user_id', 'wpis_id']);
        Comment::create($credentials);

        return response()->json('success');
    }

    public function update(Request $request, $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['error' => 'Comment not found'], 404);
        }

        $validatedData = $request->validate([
            'content' => 'required',
            'user_id' => 'required|exists:users,id',
            'wpis_id' => 'required|exists:wpis,id',
        ]);

        $comment->update($validatedData);

        return response()->json($comment);
    }

    public function destroy($id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['error' => 'Comment not found'], 404);
        }

        $comment->delete();

        return response()->json('success');
    }

    public function wpisComments($wpisId)
    {
        $comments = Comment::where('wpis_id', $wpisId)->get();
        return response()->json($comments);
    }
}
