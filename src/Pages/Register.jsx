import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { register } from "../Services/api";

function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = async() =>{
        try{
            const response = await register({email, password});
            localStorage.setItem('token', response.data.token);
            navigate('/')
        }
        catch(err){
            setError("Registration failed");
        }
    }

    return (
        <div>
            <h1>Create Account</h1>
            {error && <p style={{color: 'red'} }>{error}</p>}

            <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
            />

            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(p) => setPassword(p.target.value)}
            />

            <button onClick={handleRegister}>Register</button>

            <p>Already have an account? <Link to= "/login">Login </Link></p>
        </div>
    )
}

export default Register;