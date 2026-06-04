import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Services/api";

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword]  = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleLogin = async() =>{

        try{
            const response = await login({email, password});
            localStorage.setItem('token', response.data.token)
            navigate('/')
        }
        catch(err){
            setError("Invalid Username or Password")
        }
    }

    return (
        <div>
            <h1>Login</h1>
            {error && <p style = {{color:'red'}}>{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type = "password"
                placeholder="Password"
                value={password}
                onChange={(p) => setPassword(p.target.value)}
            />

            <button onClick={handleLogin}>Login</button>
            <p>New User? <Link to = "/register">Create one!</Link></p>
        </div>
    )
}

export default Login;
