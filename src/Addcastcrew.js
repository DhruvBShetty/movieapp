import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Sidebar} from './component';
import axios from 'axios'
import './App.css'


 function Addcastcrew() {
    const navigate=useNavigate();

    const [values,setValues]=useState({
        mid:'',
        cid:'',
        sql:"INSERT INTO cast_and_crew VALUES (?)"
        })
    
   

    const handleInput=(event)=>{
    setValues(prev=>({...prev,[event.target.name]:[event.target.value]}));
    }

    const handleSubmit=(event)=>{           
    event.preventDefault();
    console.log(values);
    
    axios.post('http://localhost:8081/generalq',values)
    .then(res=>{
        navigate('/');
    })
    .catch(err=>{
        document.getElementById("error-message").textContent=err["response"]["data"];
        console.log(err["response"]["data"]);
    })
}


    return (
        <body class="body">
            <Sidebar/>
        <div className="form-style">
            <h2>Add Crew_Castid and Movie_id</h2>
            <form action="" onSubmit={handleSubmit} id="usrform">
                <p>
                    <label>Movie_id</label><br/>
                    <input type="number" name="mid" onChange={handleInput} required />
                </p>
                <p>
                    <label>Cast_Crew_id</label><br/>
                    <input type="number" name="cid" onChange={handleInput} required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">submit</button>
                </p>
                <div id="error-message" style={{color: "red",width:"200px"}}></div>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
        </body>
    )

}

export default Addcastcrew;