import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faClock,faFlagCheckered} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import swal from 'sweetalert';

let token = await axios.get("http://localhost:8081/getsession").then(res=>res.data);


const SidebarData=[{title:"Home",link:"/"},{title:"Action",link:"/Action"},{
    title:"Comedy",link:"/Comedy"},{title:"Drama",link:"/Drama"},{title:"Horror",link:"/Horror"},{title:"Filter",link:"/Filter"},{title:"Addmovie",link:"/Addmovie"},
    {title:"Addmovieinfo",link:"/Addmovieinfo"},{title:"Updatemovie",link:"/Updatemovie"},{title:"Updatemovinfo",link:"/Updatemovieinfo"},
    {title:"Watchlist",link:`/Watchlist/${token.uname==''?'login':token.uname}`},{title:"Finished list",link:`/Finishedlist/${token.uname==''?'login':token.uname}`}]

function Moviecomp(props){

    if(token.uname!='' && token.uid!=''){
    return <div class='mcomp'>
    <div class="imgcontainer">
    <a href={'/reviews/'+props.id}>
    <img src={props.piclink} class="image" alt={"image of "+props.name} ></img>
    </a>
    {/* <div class="overlay">{props.name}</div> */}
    </div>
    <FontAwesomeIcon icon={faStar} />{props.voteavg.toFixed(1)}
     <p style={{padding:"3px",fontSize:"16px"}}>{props.overview}</p>
     <br/>
     <div class="bottom-right">
    
     <FontAwesomeIcon icon={faClock} title='Add to watchlist' style={{color:"red",}}
     onClick={()=>{ const sql=`UPDATE lists SET watch=1,done=0 WHERE mid=${props.id} and uid=${token.uid};`
        axios.post('http://localhost:8081/generalup',[sql]).then(
            swal("Great!", props.name + " was added to watchlist", "success")).catch(err=>
                {if(err["response"]["data"]["errno"]==1062){
                swal("Already watchlisted!", props.name + " is already in watchlist", "info")}
                console.log(err["response"]["data"]);}
            );}}
     />
     <span>&nbsp;</span>
     <FontAwesomeIcon icon={faFlagCheckered} style={{color:"green",}} title='Add to completed list'
     onClick={()=>{ const sql=`UPDATE lists SET watch=0,done=1 WHERE mid=${props.id} and uid=${token.uid};`
     axios.post('http://localhost:8081/generalup',[sql]).then(
         swal("Great!", props.name + " was added to finish list", "success")).catch(err=>
             {if(err["response"]["data"]["errno"]==1062){
             swal("Already watchlisted!", props.name + " is already in finish list", "info")}
             console.log(err["response"]["data"]);}
         );}}/>
     </div>
    </div>
    }else{
        return <div class='mcomp'>
        <div class="imgcontainer">
        <a href={'/reviews/'+props.id}>
        <img src={props.piclink} class="image" alt={"image of "+props.name} ></img>
        </a>
        {/* <div class="overlay">{props.name}</div> */}
        </div>
        <FontAwesomeIcon icon={faStar} />{props.voteavg.toFixed(1)}
         <p style={{padding:"3px",fontSize:"16px"}}>{props.overview}</p>
         </div>
    }
     
}

function Reviewcomp(props){
    return <div class='mcomp'>
    <div class="imgcontainer">
    <img src={props.piclink} class="image" alt={"image of "+props.name} ></img>
    {/* <div class="overlay">{props.name}</div> */}
    </div>
    <FontAwesomeIcon icon={faStar} />{props.voteavg.toFixed(1)}
     <p style={{padding:"3px",fontSize:"16px"}}>{props.overview}</p>
    </div>
     ;
}

function Actorcomp(props){
    return <div class='mcomp'>
    <div class="imgcontainer">
         
    <img src={props.piclink} class="image" alt={"image of "+props.name}></img>
    <div class="overlay">{props.name}</div>
    </div>
    <p style={{padding:"3px",fontSize:"13px"}}>{props.bio}</p>
    </div>
     ;
}

function Rcomp(props){

    return <div class='rbox'>
             <p style={{fontSize:"14px"}}>{props.review}</p>
              </div>
              
}

function Sidebar(){

   
    return <div class='Sidebar'>
       <img src={require('./movlogo.jpg')} width="175px" height="175px" />
        {SidebarData.map((val,key)=>{
        return <p onClick={()=>window.location.pathname=val.link}>{val.title}</p>;
    })}
    <p onClick ={()=>{axios.get("http://localhost:8081/logout");
                    window.location = "/Login";}}>logout</p>
    </div>
}






export {Moviecomp,Sidebar,Actorcomp,Reviewcomp,Rcomp};