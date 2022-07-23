import React, { useEffect, useState } from 'react';
import  { useContext } from 'react';
import AuthContext from '../ContextManagers/AuthContext';
import {  Link } from "react-router-dom";

function LoginPage(){

    let {loginUser, error} = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState(false)


    return(
        <div className="user-form" > 
        <span className='form-header'> Login</span>
        <form type="submit" onSubmit={loginUser} >
            <label> Username</label>
            <input className="form-fields" type="text" name= "email"  placeholder = "Enter your username..."/>
            <label> Password</label>
            <input className="form-fields" type="password" name= "password"  placeholder = "Enter your password..."/>
            <div style={{display: errorMessage? "inline" : "none"}}>
                     INCORRECT PASSWORD OR EMAIL
            </div>
            <input className='form-button' type="submit"  value="Login"/>
        </form>
        <span className='form-text'>Don't have an account? 
          <Link to="/register" className="form-link"> register </Link>
          </span>
        </div>
        
    )
}

export default LoginPage