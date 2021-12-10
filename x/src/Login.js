import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utilis/Common';

const Login = (props) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
const handleLogin = () =>{
   
    axios.post("http://localhost:4000/api/v1/login",{
        username:username,
        password:password
    }).then(response => {
        setLoading(false)
        setUserSession(response.data.token, response.data.user)
        props.history.push('/dashboard')
        
    }).catch(error => {
        setLoading(false)
        if(error.response.status === 401 || error.response.status === 400){
        setError(error.response.data.message)
        console.error('error >>>', error)
        }else {
            setError("Something went wrongy")
        }
    });
    
    }
    

    return (
        <div>
           Login <br /><br />
           Ko se prijavimo dobimo nazaj  JWT token ki je veljaven 24H.<br />
            Preden se prijavite, v nastavitvah spremenite No throttling v Slow 3G v DevToolsih.
           <div>
               Username <br />
               <input type="text" value= {username} onChange={e => setUsername(e.target.value)}></input>
           </div>
           <div>
               Password <br />
               <input type="password" value= {password} onChange={e => setPassword(e.target.value)}></input>
           </div> <br /><br />
           {error && <div className='error'>{error}</div>}
           <input type="button" value={loading ? "Loading..." : "Login"} disabled={loading} onClick={handleLogin} ></input>
        </div>
    )
}

export default Login
