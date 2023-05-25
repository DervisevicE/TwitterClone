import { useState } from "react"
import './SignUpPage.css'
import icon from '../../assets/twitterIcon.png';
import { useSignup } from "../../hooks/useSignup";
import FileBase from 'react-file-base64';


const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(username, email, password, profilePicture)
  }

  return (
    <div className="signup_page">
      <div>
        <img src={icon} />
        <p>Sign up</p>
      </div>
      <form className="signup_form" onSubmit={handleSubmit}>
      <label>Profile photo:</label>
        <FileBase type="file" multiple={false} onDone={({ base64 }) => setProfilePicture(base64)}/>
        <label>Username:</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label>Email address:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  )
}

export default SignupPage