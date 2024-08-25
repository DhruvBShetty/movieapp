import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar } from './component'
import axios from 'axios'
import './App.css'


 function Updatecredits() {
    const navigate=useNavigate();

    const [values,setValues]=useState({
        name:'',
        popularity:'',
        id:'',
        actor_or_crew:'',
        picture:'',
        biography:'',
        birthday:'',
        })
    
   

    const handleInput=(event)=>{
    setValues(prev=>({...prev,[event.target.name]:[event.target.value]}));
    }

    const handleSubmit=(event)=>{           
    event.preventDefault();
    console.log(values);

    const colnames=[`Name`,	
        `Popularity`,	
        `cast_and_crew_id`,	
        `Actor_or_crew`,	
        `Picture`,	
        `Biography`,	
        `Birthday`];

    var c=0;
    var arr=[];
    for(var i in values){
        if (i!="id" && values[i]!=''){
            arr.push(colnames[c]+"="+`"${values[i]}"`);
            
        }
        c++;
    }
    
    var sql=`UPDATE credits_detail SET ${arr.join(",")} WHERE cast_and_crew_id=${values.id};`;
    console.log(sql);
    axios.post('http://${server_addr}/generalup',[sql])
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
            <h2>Update Crew or Cast</h2>
            <form action="" onSubmit={handleSubmit} id="usrform">
                <p>
                    <label>Name</label><br/>
                    <input type="text" name="name" onChange={handleInput} />
                </p>
                <p>
                    <label>Cast_Crew_id</label><br/>
                    <input type="number" name="id" onChange={handleInput} required />
                </p>
                <p>
                    <label>Popularity</label><br/>
                    <input type="number" name="popularity" step="0.01" onChange={handleInput} />
                </p>
                <p>
                    <label>Actor_or_crew</label><br/>
                    <input type="number" name="actor_or_crew" onChange={handleInput} min="0" max="1" />
                </p>
                <p>
                    <label>Biography</label><br/>
                    <textarea name="biography" form="usrform" onChange={handleInput} maxLength="400" rows="10" cols="30" ></textarea>
                </p>

                <p>
                    <label>Picture</label><br/>
                    <input type="text" name="picture"  onChange={handleInput} />
                </p>

                <p>
                    <label>Birthday</label><br/>
                    <input type="date" name="birthday"  onChange={handleInput} />
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

export default Updatecredits;