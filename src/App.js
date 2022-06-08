import axios from 'axios';
import React, { useEffect } from 'react';
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import { useDispatch } from 'react-redux';
import {login, updateUser} from "./features/user/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("http://localhost:3010/user/me",{withCredentials:true}).then((r)=>{
      if(r.data.success){
        console.log(r.data);
        dispatch(login())
        dispatch(updateUser(r.data.user));
      }
    });
}, []);
  return (
    <>
      <BrowserRouter>
       <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
