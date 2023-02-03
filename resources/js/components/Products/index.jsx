import React, {useEffect, useState} from "react";
import { Navigate, useNavigate, useParams  } from "react-router-dom";
import axios from 'axios'
import Swal from "sweetalert2";


const Index = () => {

    const navigate = useNavigate();

    const [product, setProduct]  = useState([]);

    const newProduct= () => {

        navigate("/products/new");

    }

    useEffect(() => {
        getProducts();

    }, [])


    const getProducts = async () => {

        await axios.get("/api/products")
            .then (data=> {
                setProduct (data.data.products);
        })

    }

    const editProduct =(id) => {
        navigate("/product/edit/" + id);
    }

    const deleteProduct = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })

          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {

                axios.get("/api/delete_product/" + id)
                .then ( () => {
                    swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Product successfully deleted',
                            'Success'
                        )
                    getProducts();
                })

            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
    }


    return (

        <div className="container">
            <div className="products-list">
                <div className="titlebar">

                    <div className="titlebar_item">

                        <h1> Products</h1>

                    </div>

                    <div className="titlebar_item">
                        <div className="btn" onClick={() => newProduct()}>
                        Add product

                        </div>

                    </div>
                </div>

                <div className="table" >
                    <div className="list_header">

                        <p> Image </p>
                        <p> Product </p>
                        <p> Type </p>
                        <p> Inventory </p>
                        <p> Actions </p>
                    </div>

                    {
                        product.length > 0 && ( product.map((item, key) => {

                            return (

                        <div className="list_items" key = {key}>
                            <img src={`upload/${item.photo}`} height="40px" />

                            <p> {item.name}</p>
                            <p> {item.type} </p>
                            <p> {item.quantity}</p>
                            <div>
                                <button className="btn-icon success" onClick={() => editProduct(item.id)} >
                                    <i className="fas fa-pencil-alt"> </i>

                                </button>

                                <button className="btn-icon danger "  onClick={() => deleteProduct (item.id)}>
                                    <i className="far fa-pencil-alt"> </i>

                                </button>


                        </div>

                    </div>

                    )}))

                }
                </div>

            </div>
        </div>
    )
}

export default Index;
