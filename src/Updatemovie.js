import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import { Sidebar } from './component';


 function Updatemovie() {
    const navigate=useNavigate();

    const [values,setValues]=useState({
        revenue:'',
        budget:'',
        release_date:'',
        runtime:'',
        title:'',
        id:'',
        homepage:'',
        })

    const handleInput=(event)=>{
    setValues(prev=>({...prev,[event.target.name]:[event.target.value]}));
    }

    const handleSubmit=(event)=>{           
    event.preventDefault();
    console.log(values);

    const colnames=[`Revenue`,`Budget`,`Release_data`,`Runtime`,`Title`,`Id`,`Homepage`];
    
    var c=0;
    var arr=[];
    for(var i in values){
        if (i!="id" && values[i]!=''){
            arr.push(colnames[c]+"="+`"${values[i]}"`);
            
        }
        c++;
    }
    
    var sql=`UPDATE movie SET ${arr.join(",")} WHERE Id='${values.id}';`;
    console.log(sql);
    axios.post('http://localhost:8081/generalup',[sql])
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
            <h2>Update movie</h2>
            <form action="" onSubmit={handleSubmit}>
                <p>
                    <label>Revenue</label><br/>
                    <input type="number" name="revenue" onChange={handleInput} />
                </p>
                <p>
                    <label>Budget</label><br/>
                    <input type="number" name="budget"  onChange={handleInput} />
                </p>
                <p>
                    <label>Release_date</label><br/>
                    <input type="date" name="release_date"  onChange={handleInput} />
                </p>
                <p>
                    <label>Title</label><br/>
                    <input type="text" name="title" onChange={handleInput} />
                </p>

                <p>
                    <label>Runtime</label><br/>
                    <input type="time" name="runtime"  onChange={handleInput} />
                </p>
                    <label>ID</label><br/>
                    <input type="number" name="id"  onChange={handleInput} required/>
                <p>
                    <label>Homepage</label><br/>
                    <input type="text" name="homepage" onChange={handleInput}  />
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

export default Updatemovie;