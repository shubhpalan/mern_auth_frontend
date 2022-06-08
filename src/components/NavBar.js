import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {  logout } from "../features/user/userSlice";
import { toastSuccess } from "../utils/toast";




export default function NavBar() {
  const dispatch = useDispatch();
  const state = useSelector(state=>state.user);
  const logOut = ()=>{
    console.log(state);
    axios.post("http://localhost:3010/user/logout",{},{withCredentials:true}).then((r)=>{
      dispatch(logout());
      toastSuccess("Logout Succesful")

    });
  }
  const isLoggedIn = useSelector((state) => {
    return state.user.isLoggedIn;
  });
  return (
    <div className="navbar">
      <div className="Logo">Logo</div>
      <div className="navmenu">
        <ul>
          {isLoggedIn ? (
            <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
                <button onClick={logOut} >Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">SignIn</Link>
              </li>
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
