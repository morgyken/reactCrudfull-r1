<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductsController;

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

Route::post ('/add_product', [ProductsController::class, 'add_product']);

Route::get ('/products', [ProductsController::class, 'get_product']);

Route::get('/edit_product/{id}', [ProductsController::class, 'edit_product']);

Route::put('/update_product/{id}', [ProductsController::class, 'update_product']);

Route::get('/delete_product/{id}', [ProductsController::class, 'delete_product']);


