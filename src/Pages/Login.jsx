import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Services/api";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await login({ email, password })
            localStorage.setItem('token', response.data.token)
            navigate('/')
        } catch (err) {
            setError('Invalid email or password')
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-600">
                        Job Tracker 🎯
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Track your job search
                    </p>
                </div>

                {/* Error message */}
                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                {/* Email input */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="email@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Password input */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Login button */}
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Login
                </button>

                {/* Register link */}
                <p className="text-center text-gray-500 mt-6 text-sm">
                    New user?{' '}
                    <Link to="/register" className="text-blue-600 font-medium hover:underline">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login;