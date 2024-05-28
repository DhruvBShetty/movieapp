import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Sidebar} from './component';
import axios from 'axios'
import './App.css'


 function Addcreditsdetail() {
    const navigate=useNavigate();

    const [values,setValues]=useState({
        name:'',
        popularity:'',
        id:'',
        actor_or_crew:'',
        picture:'',
        biography:'',
        birthday:'',
        sql:"INSERT INTO credits_detail VALUES (?)"
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
            <h2>Add Crew_Cast</h2>
            <form action="" onSubmit={handleSubmit} id="usrform">
                <p>
                    <label>Name</label><br/>
                    <input type="text" name="name" onChange={handleInput} required />
                </p>
                <p>
                    <label>Cast_Crew_id</label><br/>
                    <input type="number" name="id" onChange={handleInput} required />
                </p>
                <p>
                    <label>Popularity</label><br/>
                    <input type="number" name="popularity"  onChange={handleInput} required/>
                </p>
                <p>
                    <label>Actor_or_crew</label><br/>
                    <input type="number" name="actor_or_crew" onChange={handleInput} min="0" max="1" required/>
                </p>
                <p>
                    <label>Biography</label><br/>
                    <textarea name="biography" form="usrform" onChange={handleInput} maxLength="400" rows="10" cols="30" required></textarea>
                </p>

                <p>
                    <label>Picture</label><br/>
                    <input type="text" name="picture"  onChange={handleInput} required />
                </p>

                <p>
                    <label>Birthday</label><br/>
                    <input type="date" name="birthday"  onChange={handleInput} required />
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

export default Addcreditsdetail;