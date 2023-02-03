import React from "react";
import {Routes, Route} from "react-router";
import Index from "../components/Products";
import NotFound from "../components/NotFound";
import New from "../components/Products/New";
import Edit from "../components/Products/Edit";

const Router = () => {

    return <div>

        <Routes>
            <Route path="" element ={<Index />} />
            <Route path="/products/new" element ={<New/>} />
            <Route path="/product/edit/:id" element ={<Edit/>} />
            <Route path="/*" element ={<NotFound/>} />
        </Routes>
    </div>
}

export default Router;
