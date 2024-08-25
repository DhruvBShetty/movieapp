import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar } from './component'
import axios from 'axios'
import './App.css'
import { server_addr } from './utils/PrivateRoutes'

 function Register() {
    const navigate=useNavigate();

    const [values,setValues]=useState({
        id:null,
        name:'',
        join_date:new Date().toISOString().split('T')[0],
        email:'',
        background:'',
        rating:null,
        password:''
        })

    const handleInput=(event)=>{
    setValues(prev=>({...prev,[event.target.name]:[event.target.value]}));
    }

    const handleSubmit=(event)=>{
    event.preventDefault();
    console.log(values);
    
    axios.post(`http://${server_addr}/Register`,values)
    .then(res=>{
        navigate('/Login')
    })
    .catch(err=>{
        document.getElementById("error-message").textContent=err["response"]["data"]["sqlMessage"];
        console.log(err["response"]["data"]["sqlMessage"])
    })
}


    return (
        <body className="body">
            <Sidebar/>
            <form action="" onSubmit={handleSubmit} class="form-style">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="name" onChange={handleInput} required />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email"  onChange={handleInput} required/>
                </p>
                <p>
                    <label>Background(Student,Journalist,Investor,etc)</label><br/>
                    <input type="text" name="background"  onChange={handleInput} required/>
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" onChange={handleInput} required />
                </p>
                
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
                <div id="error-message" style={{color: "red",width:"200px"}}></div>
                <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
                </footer>
            </form>
          
        </body>
    )

}

export default Register;