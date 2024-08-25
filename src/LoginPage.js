import React,{useState} from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { Sidebar } from './component'
import axios from 'axios'
import swal from 'sweetalert';
import  { Redirect } from 'react-router-dom'
// import {UserProfile,PrivateRoutes} from './utils/PrivateRoutes';
import { BrowserRouter,Route} from 'react-router-dom';
import { server_addr } from './utils/PrivateRoutes'

function LoginPage() {
    const [values,setValues]=useState({
        name:'',
        password:'',
})

const handleInput=(event)=>{
    setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
}

const handleSubmit=(event)=>{
      event.preventDefault();
      var sql = `SELECT * FROM users WHERE Account_username="${values.name}" AND Password="${values.password}"`;
      axios.post(`http://${server_addr}/Login`,[sql]).then((res) => {
        // Update the 'obj' property by creating a new array
        console.log(res.data);
        if(res.data.length!=0){
            window.location="/"
        }
        else{
            swal("Oops!", "Username or Password not Found!", "error");
        }

      }).catch(err=>{alert("User of this ID not found")})

}

    return (
        <body class="body">
            
            <Sidebar/>
            <div class="formbody">
            <form action="" onSubmit={handleSubmit} class="form-style" >
            <h2>Sign in to Movies</h2>
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="name" onChange={handleInput} required />
                </p>
                <p>
                    <label>Password</label>
                    <br/>
                    <input type="password" name="password" onChange={handleInput}  required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>

                <footer>
                {/* <p><Link to="/Register">Create new account</Link>.</p> */}
            </footer>
            </form>
            </div>
            
        </body>
    );
    }

export default LoginPage;