import { useNavigate, Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function Account(){
    const navigate = useNavigate();

    const token = localStorage.getItem('token')
    const user = token?jwtDecode(token):null
    console.log('Token:', token)
    console.log('User:', user)

    const handleSignout = () =>{
        localStorage.removeItem('token')
        navigate('/login')
    }

    return(
        <div>
            <h1>My Account</h1>

            {user && <p> Email : {user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']}</p>}

            <Link to="/">Back to Dashboard</Link>

            <button onClick={handleSignout}>Signout</button>
        </div>
    )
}

export default Account;