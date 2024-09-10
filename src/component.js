import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faClock,faFlagCheckered} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import swal from 'sweetalert';
import { server_addr } from './utils/PrivateRoutes';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {token} from './utils/PrivateRoutes';
import Cookies from 'js-cookie';
const picpath="https://www.themoviedb.org/t/p/w300_and_h450_bestv2"



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
        axios.post(`http://${server_addr}/generalup`,[sql]).then(
            swal("Great!", props.name + " was added to watchlist", "success")).catch(err=>
                {if(err["response"]["data"]["errno"]==1062){
                swal("Already watchlisted!", props.name + " is already in watchlist", "info")}
                console.log(err["response"]["data"]);}
            );}}
     />
     <span>&nbsp;</span>
     <FontAwesomeIcon icon={faFlagCheckered} style={{color:"green",}} title='Add to completed list'
     onClick={()=>{ const sql=`UPDATE lists SET watch=0,done=1 WHERE mid=${props.id} and uid=${token.uid};`
     axios.post(`http://${server_addr}/generalup`,[sql]).then(
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

function Recomm(props){
    return <div class="rbody">
    <div class='App-header'>
    <div class='mcomp'>
    <div class="imgcontainer">
    <a href={'/reviews/'+props.rid}>
    <img src={props.piclink} class="recimage" alt={"image of "+props.name}></img>
    </a>
    {/* <div class="overlay">{props.name}</div> */}
    </div>
    <p style={{color:"white"}}><FontAwesomeIcon icon={faStar} style={{color:"white"}}/>{props.voteavg.toFixed(1)}</p>
    </div>
    </div> 
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
    
    var defaultside=[{title:`${token.uname!=''?'Hello '+token.uname:''
    }`,link:"/"},{title:"Home",link:"/"},{title:"Action",link:"/Action"},{
      title:"Comedy",link:"/Comedy"},{title:"Drama",link:"/Drama"},{title:"Horror",link:"/Horror"},{title:"Filter",link:"/Filter"},
      // {title:"Addmovie",link:"/Addmovie"},{title:"Addmovieinfo",link:"/Addmovieinfo"},{title:"Updatemovie",link:"/Updatemovie"},{title:"Updatemovinfo",link:"/Updatemovieinfo"},
      {title:"Watchlist",link:`/Watchlist/${token.uname==''?'login':token.uname}`},{title:"Finished list",link:`/Finishedlist/${token.uname==''?'login':token.uname}`}];

    var [SidebarData,setside]=useState(defaultside);

    
    if(token.admin==1){

      var Sidebaradm=[{title:`Hello ${token.uname}`,link:"/"},{title:"Home",link:"/"},{title:"Action",link:"/Action"},{
        title:"Comedy",link:"/Comedy"},{title:"Drama",link:"/Drama"},{title:"Horror",link:"/Horror"},{title:"Filter",link:"/Filter"},
        ,{title:"Addmovieinfo",link:"/Addmovieinfo"},{title:"Updatemovinfo",link:"/Updatemovieinfo"},{title:"Addmovie",link:"/Addmovie"},{title:"Updatemovie",link:"/Updatemovie"},
        {title:"Watchlist",link:`/Watchlist/${token.uname==''?'login':token.uname}`},{title:"Finished list",link:`/Finishedlist/${token.uname==''?'login':token.uname}`}];

       return <div class='Sidebar'>
       <img src={require('./movlogo.jpg')} width="175px" height="175px" />
        {Sidebaradm.map((val,key)=>{
        return <p onClick={()=>window.location.pathname=val.link}>{val.title}</p>;
    })}
    <p onClick ={()=>{
      axios.get(`http://${server_addr}/logout`,{
        withCredentials: true,
      });
                    window.location = "/Login";}}>logout</p>
    </div>
    }
    else if (token.uname!==""){
      return <div class='Sidebar'>
       <img src={require('./movlogo.jpg')} width="175px" height="175px" />
        {SidebarData.map((val,key)=>{
        return <p onClick={()=>window.location.pathname=val.link}>{val.title}</p>
        ;
    })}
    <p onClick ={()=>{
      axios.get(`http://${server_addr}/logout`,{
        withCredentials: true,
      });
                    window.location = "/Login";}}>logout</p>
    </div>
    }
    else{
    
      return <div class='Sidebar'>
       <img src={require('./movlogo.jpg')} width="175px" height="175px" />
        {SidebarData.map((val,key)=>{
        return <p onClick={()=>window.location.pathname=val.link}>{val.title}</p>
        ;
    })}
    </div>
      
    }
}

function Recommend(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            You may also like...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"black"}}>
        {props.obj.map((i)=><Recomm piclink={picpath+i["Picture"]} voteavg={i["Vote_Avg"]} rid={i["rid"]}/>)}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }





export {Moviecomp,Sidebar,Actorcomp,Reviewcomp,Rcomp,Recommend,Recomm};