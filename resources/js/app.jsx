import './bootstrap';

import { BrowserRouter } from 'react-router-dom';

/*
import React from 'react';
import App from './components/App';
import { ReactDOM } from 'react';

ReactDOM.createRoot(document.getElementById('app').render(
    <App/>
))
*/

import {createRoot} from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
import App from './components/App';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'

window.Swal = Swal;

const toast= Swal.mixin({
    toast:true,
    position:'top-end',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
})

window.toast = toast

root.render (

    <BrowserRouter>
        <App/>
    </BrowserRouter>


);





