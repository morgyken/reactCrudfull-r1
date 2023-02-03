import React, {useEffect, useState}from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

const Edit = () =>{
    const navigate = new useNavigate();

    const{id}  = useParams();


    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const[photo, setPhoto] = useState(null);

    const [type, setType] = useState ("");

    const [quantity, setQuantity] = useState("");

    const [price, setPrice] = useState("");

    const [avatar, setAvatar] = useState (true);


    const onChangeHandler = (e) =>{

        let file = e.target.files[0]
        let reader = new FileReader()
        let limit = 1024 * 1024* 2
        if(file ['size'] > limit) {
            Swal.fire (
                {
                    type: "error",
                    title: "Oops...",
                    text: "Something went wrong somewhere",
                    footer:"Why do I have an issue ? "
                }

            )

        }
        else {
            let reader = new FileReader ()
            reader.onload = e => {
                setAvatar(false)
                setPhoto (e.tartget.result)
            }
            reader.readAsDataURL(file);
        }


    }

    useEffect (() => {

        getProducts()

    }, [])

    const getProducts = async () => {
        await axios.get (`/api/edit_product/${id}`)
         .then(data => {
             //   console.log('data', data.data)
            const { name, description, photo, type, quantity, price} = data.data.product;

            setName(name);
            setDescription(description);
            setPhoto(photo);
            setType(type);
            setQuantity(quantity);
            setPrice(price);
         })


    }


    const ourImage  = (img) => {
        return "upload" + img;

    }

    const updateProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData ();

        formData.append ("name", name)
        formData.append ("description", description)
        formData.append ("photo", photo)
        formData.append ("type", type)
        formData.append ("quantity", quantity)
        formData.append ("price", price)


        await axios.post ("/api/add_product", formData)
            .then(({data})=> {
                toast.fire({
                    icon:"Success",
                    title:"Product Updated Success"
                })
                navigate("/")

            })
            .catch (({response})=> {


            })

    }

    return (
        <div className="container ">
        <div className="product_edit">
        <div className="titlebar">
                    <div className="titlebar_item">
                        <h1> Edit Product</h1>

                    </div>

                    <div className="titlebar_item">
                        <button className='btn' onClick={(event) => updateProduct (event)}> Update</button>
                    </div>

                </div>

                <div className='card-wrapper'>

                    <div className='wrapper_left'>
                        <div className='card'>

                            <p> Name</p>
                            <input type='text' value={name} onChange = {( event)=> {setName(event.target.value)}}  />

                            <p> Description (Optional) </p>

                            <textarea cols= '10' rows='5' value={description} onChange = {( event)=> {setDescription(event.target.value)}} />

                            <div className="media">
                                <ul className="images_list" >
                                    <li className="image_item">

                                        <div className="image_item-imgWrapper">
                                            {
                                                avatar === true?
                                                <img src={ourImage (photo)} width="117px" height ="100px" />
                                                : <img src={photo} width="117px" height ="100px" />
                                            }
                                        </div>
                                    </li>
                                    <li className="image_item">
                                        <form className="image_item-form" >
                                            <label className='image_item-form--label'>
                                                Add Image
                                            </label>
                                            <input type='file'  onChange={onChangeHandler} className='image_item-form--input' />
                                        </form>

                                    </li>
                                </ul>
                            </div>



                        </div>

                    </div>

                    <div className='wrapper_right'>
                        <div className='card'>

                            <p> Product Type </p>
                            <input type='text' value={type} onChange = {( event)=> {setType(event.target.value)}}  />

                            <hr className='hr'/>

                            <p> Inventory</p>

                            <input type='text' value={quantity} onChange = {( event)=> {setQuantity(event.target.value)}}  />

                            <hr className='hr'/>

                            <p> Price</p>

                            <input type='text' value={price} onChange = {( event)=> {setPrice(event.target.value)}} />

                            <br className='br'/>

                        </div>

                    </div>


                </div>

                <div className="titlebar">
                    <div className="titlebar_item">


                    </div>

                    <div className="titlebar_item">
                        <button className='btn' onClick={(event) => updateProduct (event)} > Update</button>

                    </div>

                </div>

        </div>

        </div>
    )


}


export default Edit
