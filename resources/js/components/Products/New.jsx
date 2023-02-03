import { toSafeInteger } from 'lodash';
import React, {useState} from 'react';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';


const New =() => {

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const[photo, setPhoto] = useState(null);

    const [type, setType] = useState ("");

    const [quantity, setQuantity] = useState("");

    const [price, setPrice] = useState("");

    const navigate = useNavigate();

    const onChangeHandler = (e) =>{

        let file = e.target.files[0]
        let reader = new FileReader()
        let limit = 1024 * 1024* 2

        console.log (file['size'])
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

        reader.onloaded = (file) => {
            setPhoto (reader.result)

        }

        reader.readAsDataURL(file);
    }

    const createProduct = async(e) => {
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
                    icon:"success",
                    title:"Product created"
                })
                navigate("/")

            })
            .catch (({response})=> {


            })




    }



    return (
        <div className="container">
            <div className="products_create">

                <div className="titlebar">
                    <div className="titlebar_item">
                        <h1> Add Product</h1>

                    </div>

                    <div className="titlebar_item">
                        <button className='btn' onClick={(event) => createProduct (event)}> Save</button>

                    </div>

                </div>

                <div className='card-wrapper'>

                    <div className='wrapper_left'>
                        <div className='card'>

                            <p> Name</p>
                            <input type='text' value={name} onChange={(event) => {setName (event.target.value)} } />

                            <p> Description (Optional) </p>

                            <textarea cols= '10' rows='5' value={description } onChange = { (event) =>{ setDescription (event.target.value)}} />

                            <div className="media">
                                <ul className="images_list" >
                                    <li className="image_item">

                                        <div className="image_item-img">
                                            <img src= {photo} width= "178px" height = "100px" />
                                        </div>

                                    </li>
                                    <li className="image_item">
                                        <form className="image_item-form" >
                                            <label className='image_item-form--label'>
                                                Add Image
                                            </label>
                                            <input type='file' className='image_item-form--input' onChange={onChangeHandler} />
                                        </form>

                                    </li>
                                </ul>
                            </div>



                        </div>

                    </div>

                    <div className='wrapper_right'>
                        <div className='card'>

                            <p> Product Type </p>
                            <input type='text' value={type}  onChange={ (event) => { setType ( event.target.value)}} />

                            <hr className='hr'/>

                            <p> Inventory</p>

                            <input type='text'  value={quantity}  onChange={ (event) => { setQuantity ( event.target.value)}}  />

                            <hr className='hr'/>

                            <p> Price</p>

                            <input type='text' value={price}  onChange={ (event) => { setPrice ( event.target.value)}} />

                            <br className='br'/>

                        </div>

                    </div>


                </div>

                <div className="titlebar">
                    <div className="titlebar_item">


                    </div>

                    <div className="titlebar_item">
                        <button className='btn' onClick={(event) => createProduct (event)} > Save</button>

                    </div>

                </div>


            </div>

        </div>
    )

}


export default New
