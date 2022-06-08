import axios from 'axios';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const state = useSelector(state=>state.user);
  
  if (!state.isLoggedIn) return <Navigate to="/login" />;

  return (
    <div>
      <h1>Welcome {state.user.name}</h1>
    </div>
  )
}
