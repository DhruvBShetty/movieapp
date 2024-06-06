import './App.css';
import LoginPage from './LoginPage';
import Register from './Register';
import Home from './Home';
// import Addcreditsdetail from './Addcreditsdetail';
// import Addcastcrew from './Addcastcrew';
// import Addsubinfo from './Addsubinfo';
import Updatemovie from './Updatemovie';
import Updatemovieinfo from './Updatemovieinfo';
import Addmovie from './Addmovie';
import Addmovieinfo from './Addmovieinfo';
// import Updatecredits from './Updatecredits';
import Comedy from './Comedy';
import Action from './Action';
import Horror from './Horror';
import Drama from './Drama';
// import Actors from './Actors';
import Filter from './Filter';
// import Report from './Report';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import React from 'react';
import Reviews from './Reviews';
import {PrivateRoutes} from './utils/PrivateRoutes';
import Watchlist from './Watchlist';
import Finishedlist from './Finishedlist';



export default function App() {
  return (
  
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>}> </Route>
       <Route path='/Login' element={<LoginPage/>}></Route>
       <Route element={<PrivateRoutes/>}>
                <Route path='/Addmovie' element={<Addmovie/>}></Route>
                {/* <Route path='/Addcreditsdetail' element={<Addcreditsdetail/>}></Route>
                <Route path='/Addcastcrew' element={<Addcastcrew/>}></Route>
                <Route path='/Addsubinfo' element={<Addsubinfo/>}></Route> */}
                <Route path='/Updatemovie' element={<Updatemovie/>}></Route>
                <Route path='/Updatemovieinfo' element={<Updatemovieinfo/>}></Route>
                {/* <Route path='/Updatecredits' element={<Updatecredits/>}></Route>  */}
                <Route path='/Addmovieinfo' element={<Addmovieinfo/>}></Route>
                <Route path='/reviews/:id' element={<Reviews/>}></Route>
                <Route path='/Watchlist/:name' element={<Watchlist/>}></Route>
                <Route path='/Finishedlist/:name' element={<Finishedlist/>}></Route>
       </Route>
       <Route path='/Comedy' element={<Comedy/>}></Route>
       <Route path='/Action' element={<Action/>}></Route>
       <Route path='/Drama' element={<Drama/>}></Route>
       <Route path='/Horror' element={<Horror/>}></Route>
       {/* <Route path='/Actors' element={<Actors/>}></Route> */}
       <Route path='/Filter' element={<Filter/>}></Route>
       {/* <Route path='/Report' element={<Report/>}></Route>   */}
       <Route path='/Register' element={<Register/>}></Route>    
       </Routes>
    </BrowserRouter>
  );
}


