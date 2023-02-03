<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Intervention\Image\Facades\Image;

use App\Models\Products;

class ProductsController extends Controller
{

public function get_product(){
    $products =Products::all();

    return response()->json(['products' => $products], 200);

}
public function add_product (request $request) {

    $product = new Products();

    $product->name = $request->name;

    $product->description = $request->description;

    //return response()->json([$product -> photo]);

     if($product->photo !== null) {
        $strpos = strpos($request-> photo, ';');

        $sub = substr($request-> photo, 0, $strpos);

        $ex = explode('/', $sub) [1];

        $name =time().".".$ex;

        $img = Image::make($request->photo)->resize(117, 100);

        $upload_path = public_path()."/upload/";

        $img->save($upload_path.$name);

        $product->photo = $name;
        }

        else {
            $product->photo = "image.png";
        }

        $product->photo = $request->name;

        $product->type = $request->type;

        $product->quantity = $request->quantity;

        $product ->price = $request->price;

        $product->save();


    }

    public function delete_product (request $request, $id){

        $product = Products:: findOrFail($id);
        $image_path = public_path()."/upload/";
        $image = $image_path.$product->photo;

        if (file_exists($image)) {
            @unlink($image);
        }

        $product ->delete ();

    }

    public function edit_product ($id){

        $product = Products::find($id);

        return response()->json(['product'=> $product], 200);
    }

    public function update_product (Request $request, $id){

        $product = Products::find($id);

        $product->name = $request->name;

    $product->description = $request->description;

    if($product->photo !== $request->photo) {
        $strpos = strpos($request-> photo, ';');

        $sub = substr($request-> photo, 0, $strpos);

        $ex = explode('/', $sub) [1];

        $name =time().".".$ex;

        $img = Image::make($request->photo)->resize(117, 1000);

        $upload_path = public_path()."/upload/";

        $image = $upload_path . $product -> photo;

        $img->save($upload_path.$name);

        if(file_exists ($image)) {
            @unlink($image);
        }

        $product->photo = $name;
        }

        else {
            $name = $product->photo;
        }

        $product->photo = $name;

        $product->type = $request->type;

        $product->quantity = $request->quantity;

        $product ->price = $request->price;

        $product->save();



    }

}
