<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WpisController;
use App\Http\Controllers\CommentsController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('login', [AuthController::class,'login']);
Route::post('register', [AuthController::class,'register']);

Route::group(['middleware'=>'api'],function(){
    Route::get('users', [AuthController::class, 'users']);

    Route::get('wpisy', [WpisController::class, 'wpisy']);
    Route::post('wpisy', [WpisController::class, 'store']);
    Route::put('wpisy/{id}', [WpisController::class, 'update']);
    Route::delete('/wpisy/{id}', [WpisController::class, 'destroy']);

    Route::get('/commentsget/{wpisId}', [CommentsController::class, 'wpisComments']);
    Route::post('/comments', [CommentsController::class, 'store']);
    Route::put('/comments/{id}', [CommentsController::class, 'update']);
    Route::delete('/comments/{id}', [CommentsController::class, 'destroy']);

    Route::put('users/{id}', [AuthController::class, 'update']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me']);
});