import React from "react";
import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import './LogInPage.css'
import icon from '../../assets/twitterIcon.png';


const LogInPage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      await login(username, email, password)
    }

    return (
        <div className="login_page">
            <div>
                <img src={icon} />
                <p>Welcome Back</p>
            </div>
            <form className="login_form" onSubmit={handleSubmit}>
            <input 
                    type="text" 
                    name="text" 
                    placeholder="Username"
                    onChange={(e)=> setUsername(e.target.value)}
                    value={username} />
                <input 
                    type="text" 
                    name="text" 
                    placeholder="Email"
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email} />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password} />
                <button disabled={isLoading}>Log in</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}


export default LogInPage;