import { Outlet, Navigate } from 'react-router-dom'
import React,{useState} from 'react'
import axios from 'axios';

let token = await axios.get("http://localhost:8081/getsession").then(res=>res.data);

console.log(token.uname);

function PrivateRoutes(){
    var ans= (token.uname != "") && (token.uid != "");

    return(
       ans ? <Outlet/> : <Navigate to = '/Login'/>)
};

export {PrivateRoutes};