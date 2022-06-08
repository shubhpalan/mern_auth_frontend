import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  user:{},
  isLoggedIn:false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      login: (state) =>{
        state.isLoggedIn = true;
      },
      logout: (state)=>{
          console.log(state)
          state.isLoggedIn = false;
      },
      updateUser: (state,actions)=>{
          state.user = actions.payload
      }
    },
  });

export const {login,logout,updateUser} = userSlice.actions;

export default userSlice.reducer;
