import React from "react";
import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import './LogInPage.css'
import icon from '../../assets/twitterIcon.png';


const LogInPage = () => {
    const [username, setUsername] = useState('esma111')
    const [email, setEmail] = useState('esma111@esma.com')
    const [password, setPassword] = useState('ABCabc123!')
    const {login, error, isLoading} = useLogin()
  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      await login(username, email, password)
    }

    return (
        <div className="login_page">
            <div>
                <img src={icon} />
                <p>Welcome back</p>
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
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    )
}


export default LogInPage;