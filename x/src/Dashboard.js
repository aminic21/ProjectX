import React from 'react'
import { getUser,removeUserSession,getToken, setUserSession } from './Utilis/Common'
import { useState, useEffect } from 'react';
import axios from "axios"


const Dashboard = (props) => {
    useEffect(()=>{
        const token = getToken();
        if(!token) {
          return;
        }
      
        axios.get(`http://localhost:4000/api/v1/me?token=${token}`)
        .then(response =>{
          setUserSession(response.data.token, response.data.user)
          setAuthLoading(false);
        }).catch(error =>{
          removeUserSession()
          setAuthLoading(false)
        })
      
      }, [])
      
      const[authLoading, setAuthLoading] = useState(true)
      
        if(authLoading && getToken()){
          return <div className="content">Checking Authenticatoin</div>
        }
      
    const user = getUser();

    const handleLogout =() => {
    removeUserSession()
        props.history.push('/login')
    }

    return (
        <div>
            Dostopno samo prijavljenim uporabnikom <br /><br />
            Welcome {user.name}! <br /> <br />
            <input type ="button" value="Logout" onClick={handleLogout}></input>
        </div>
    )
}

export default Dashboard
