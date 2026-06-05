import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Account() {
    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    const user = token ? jwtDecode(token) : null

    const handleSignout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-600">
                    Job Tracker 🎯
                </h1>
                <Link to="/" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                    ← Back to Dashboard
                </Link>
            </div>

            <div className="max-w-lg mx-auto px-4 py-10">

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm p-8">

                    {/* Avatar */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 text-3xl font-bold flex items-center justify-center mb-4">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            My Account
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            {user?.email || 'Not logged in'}
                        </p>
                    </div>

                    {/* Account Info */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <p className="text-xs text-gray-400 uppercase font-medium mb-1">
                            Email Address
                        </p>
                        <p className="text-gray-800 font-medium">
                            {user?.email || 'Unknown'}
                        </p>
                    </div>

                    {/* Sign Out Button */}
                    <button
                        onClick={handleSignout}
                        className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition mb-3"
                    >
                        Sign Out
                    </button>

                    {/* Back Button */}
                    <Link to="/">
                        <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
                            Back to Dashboard
                        </button>
                    </Link>

                </div>

                {/* App Info */}
                <div className="text-center mt-6">
                    <p className="text-gray-400 text-sm">
                        Job Tracker — Built with ASP.NET Core + React
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                        Helping job seekers in Malta and beyond 🇲🇹
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Account;