import React, { useState } from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase/firebase'

function Login() {

    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = (e) =>{
        e.preventDefault();
        
        // firebase login will go there 

        auth
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
            history.push('/')
        })
        .catch(error => alert(error.message))


        
        
        
    }

    const register = (e) => {
        e.preventDefault();

        // firebase register will go there
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            //create new user
            console.log(auth);
            if(auth){
                history.push('/')
            }
        })
        .catch((error) => {
            alert(error.message)
        })
    }



    return (
        <div className="login">
            <Link to="/">
                <img className="login_logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt=""/>
            </Link>
            <div className="login_container">
                <h1>Sign In</h1>
                <form>
                    <h5>Email</h5>
                    <input onChange={e => setEmail(e.target.value)} value={email} type="text"/>

                    <h5>Password</h5>
                    <input onChange={e => setPassword(e.target.value)} value={password} type="password"/>

                    <button type='submit' onClick={signIn} className="login_signInButton">Sign In</button>
                    <p>
                        By signing in you agree to Amazon Fake Clone's Conditions 
                        of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest
                        Based Ads Notice
                    </p>
                    <button onClick={register} className="login_registerButton">Create your amazon account</button>
                </form>

            </div>
        </div>
    )
}

export default Login
