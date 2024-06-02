import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Sidebar} from './component';
import axios from 'axios'
import './App.css'
import swal from 'sweetalert';

let token = await axios.get("http://localhost:8081/getsession").then(res=>res.data);


 function Addmovie() {

    const navigate=useNavigate();
    const [values,setValues]=useState({
        revenue:'',
        budget:'',
        release_date:'',
        runtime:'',
        title:'',
        id:'',
        homepage:''
        })

    const handleInput=(event)=>{
    setValues(prev=>({...prev,[event.target.name]:[event.target.value]}));
    }

    const handleSubmit=(event)=>{           
    event.preventDefault();
    console.log(values);
    
    axios.post('http://localhost:8081/Addmovie',values)
    .then(res=>{
        navigate('/')
    })
    .catch(err=>{
        document.getElementById("error-message").textContent=err["response"]["data"]
        console.log(err["response"]["data"])
    })
  }
    if (token.admin === 1){
    return (<body class="body">
        <Sidebar/>
        <div className="form-style">
            <h2>Add movie</h2>
            <form action="" onSubmit={handleSubmit}>
                <p>
                    <label>Revenue</label><br/>
                    <input type="number" name="revenue" onChange={handleInput} required />
                </p>
                <p>
                    <label>Budget</label><br/>
                    <input type="number" name="budget"  onChange={handleInput} required/>
                </p>
                <p>
                    <label>Release_date</label><br/>
                    <input type="date" name="release_date"  onChange={handleInput} required/>
                </p>
                <p>
                    <label>Title</label><br/>
                    <input type="text" name="title" onChange={handleInput} required />
                </p>

                <p>
                    <label>Runtime</label><br/>
                    <input type="time" name="runtime"  onChange={handleInput} required/>
                </p>
                    <label>ID</label><br/>
                    <input type="number" name="id"  onChange={handleInput} required/>
                <p>
                    <label>Homepage</label><br/>
                    <input type="text" name="homepage" onChange={handleInput} required />
                </p>
                
                <p>
                    <button id="sub_btn" type="submit">Submit</button>
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
else{
    swal({
        title: "Admin Access!",
        text: "Sorry, you don't have access to this feature",
        icon: "info"
      }).then(res=>{navigate('/')})
}
}
 

export default Addmovie;