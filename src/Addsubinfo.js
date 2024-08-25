import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import {Sidebar} from './component';


 function Addsubinfo() {
    const navigate=useNavigate();

    const [values,setValues]=useState({
        id:'',
        dts:'',
        dte:'',
        amt:'',
        sql:"INSERT INTO subscriptions VALUES (?)"
        })

    const handleInput=(event)=>{
    setValues(prev=>({...prev,[event.target.name]:[event.target.value]}));
    }

    const handleSubmit=(event)=>{
    event.preventDefault();
    console.log(values);
    
    axios.post('http://${server_addr}/generalq',values)
    .then(res=>{
        navigate('/');
    })
    .catch(err=>{
        document.getElementById("error-message").textContent=err["response"]["data"];
        console.log(err["response"]["data"]);
    })
}


    return (
        <div className="text-center m-5-auto">
            <h2>Add subscriber's info</h2>
           
            <form action="" onSubmit={handleSubmit}>
                <p>
                    <label>Id</label><br/>
                    <input type="number" name="id" onChange={handleInput} required />
                </p>
                <p>
                    <label>Subscription date start</label><br/>
                    <input type="date" name="dts"  onChange={handleInput} required/>
                </p>
                <p>
                    <label>Subscription date end</label><br/>
                    <input type="date" name="dte"  onChange={handleInput} required/>
                </p>
                <p>
                    <label>Amount paid</label><br/>
                    <input type="number" name="amt" onChange={handleInput} required />
                </p>
                
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
                <div id="error-message" style={{color: "red",width:"200px"}}></div>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}

export default Addsubinfo;