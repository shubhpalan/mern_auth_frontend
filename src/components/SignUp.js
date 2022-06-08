import React, { Component } from 'react';
import axios from "axios";
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { login, logout,updateUser } from "../features/user/userSlice";
import { toastError, toastSuccess } from '../utils/toast';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      signUpInputs : [
        {
          id:1,
          type:"text",
          label:"name",
          placeholder:"Enter Your Name",
          value:""
        },
        {
          id:2,
          type:"email",
          label:"email",
          placeholder:"Enter Your Email",
          value:""
        },
        {
          id:3,
          type:"password",
          label:"password",
          placeholder:"Enter Your password",
          value:""
        },
        {
          id:4,
          type:"tel",
          label:"phone",
          placeholder:"Enter Your Phone",
          value:""
        },
      ]
    }
  }
  submitForm = (e) =>{
    e.preventDefault();
    let formData = {};
    this.state.signUpInputs.map(input=>{
      formData[input.label] = input.value;
      return '';
    });
    axios.post("http://localhost:3010/user/signup",formData,{withCredentials:true}).then((r)=>{
      if(r.data.success){
        toastSuccess("SignUp Succesful")
        this.props.login();
        this.props.updateUser(r.data.user);
      }else{
        toastError(r.data.message);

      }
      
    })

  }
  updateInputs = (e) =>{
    let updatedInputs = this.state.signUpInputs.map(input=>{
      if(input.label === e.target.getAttribute('data-label')){
        input.value = e.target.value;
      }
      return input;
    });
    this.setState({
        signUpInputs:updatedInputs
      })
  }

  render() {
    if (this.props.user.isLoggedIn) return <Navigate to="/" />;
 
    return (
      <div>
          <form onSubmit={this.submitForm}>
            <h1>SignUp</h1>
            {
              this.state.signUpInputs.map((input)=>{
                return (
                  <input 
                    key={input.id}
                    type={input.type}
                    value={input.value}
                    placeholder={input.placeholder}
                    data-label={input.label}
                    onInput={this.updateInputs}
                    
                  />
                )
              })
            }
            <button type='submit'>Submit</button>
          </form>
      </div>
    )
  }
}



const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = {
  login,
  logout,
  updateUser,
};  
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
