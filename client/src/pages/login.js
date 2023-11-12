import React,{useState} from 'react'

import {Db,Auth} from '../firebase/Firebase'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const navigate=useNavigate()
    const [error, seterror] = useState()

    const handleemail=async(e)=>{
        e.preventDefault()
        setemail(e.target.value)
       }
      
       const handlepassword=async(e)=>{
        e.preventDefault()
        setpassword(e.target.value)
       }
      
    const handleSubmit=(e)=>{

        e.preventDefault()

        if(email==''){
            return seterror("Please Enter Email")
        }

        if(password==''){
            return seterror("Password must be 6 or more characters")
          }
          Auth.signInWithEmailAndPassword(email,
            password)
               .then(s=>{
                  console.log("44545s4"+s);
                
               navigate('/')
                  
               })  
               .catch(e=>{
                  console.log("44545"+e.message);
                  var errmsg=e.message+"";
                  seterror(errmsg)
                  console.log("44545"+e.message+"jkkdzjf ");
                 }) 
       


    }


    return (

        <div id="login">
           
            <div className="logincontainer container">
                <div id="login-row" className="row justify-content-center align-items-center">

                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                        <p style={{marginLeft:'30px',marginTop:'6px'}}>{error}</p>
                       
                            <form id="login-form" onSubmit={handleSubmit}>
                            <h3 className="text-center text-info" style={{color:'black',fontSize:'30px'}}>Login</h3>
                                <div className="form-group">
                                  
                                    <input type="email" onChange={handleemail}
                                     name="email" id="email" placeholder="Email" className="form-control" required />
                                </div>
                                <div className="form-group">
                                   
                                    <input type="password" onChange={handlepassword}
                                    name="password" id="password" placeholder="Password" required
                                    className="form-control" />
                                </div>
                                <div className="form-group divform" >
                                   
                                    <input type="submit" name="submit" className="registerinfo" value="Login" />
                                   
                                    {/* <input type="button" name="register" style={{marginLeft:'30px'}} onClick={handleregister}
                                    className="registerinfo" value="Register" /> */}
                                   

                                </div>

                                  <div className="forgetpassword">
                                    <p className="reg-push-md">
                                        Forgot your password?
                                        <a href="/password_reset/"> Reset it here.</a>
                                    </p>
                                  </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}
