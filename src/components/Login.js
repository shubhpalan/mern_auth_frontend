import React, { Component } from 'react';
import axios from "axios";
import { connect, } from "react-redux";
import { login, logout,updateUser } from "../features/user/userSlice";
import { Navigate } from 'react-router-dom';
import { toastError, toastSuccess } from '../utils/toast';



class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      signInInputs : [
        {
          id:1,
          type:"email",
          label:"email",
          placeholder:"Enter Your Email",
          value:""
        },
        {
          id:2,
          type:"password",
          label:"password",
          placeholder:"Enter Your password",
          value:""
        }
      ]
    }
  }
  submitForm = (e) =>{
    e.preventDefault();
    let formData = {};
    this.state.signInInputs.map(input=>{
      formData[input.label] = input.value;
      return '';
    });
    axios.post("http://localhost:3010/user/login",formData,{withCredentials:true}).then((r)=>{
      if(r.data.success){
        toastSuccess("Login Succesful")
        this.props.login();
        this.props.updateUser(r.data.user);
      }else{
        toastError(r.data.message);
      }
    })

  }
  updateInputs = (e) =>{
    // Updating corresponding value for input with corresponding label
    let updatedInputs = this.state.signInInputs.map(input=>{
      if(input.label === e.target.getAttribute('data-label')){
        input.value = e.target.value;
      }
      return input;
    });
    this.setState({
        signInInputs:updatedInputs
      })
  }
  render() {
    if (this.props.user.isLoggedIn) return <Navigate to="/" />;
 
    return (
      <div>
          <form onSubmit={this.submitForm}>
            <h1>Login</h1>
            {
              this.state.signInInputs.map((input)=>{
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
            <button type='submit'>Login</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
