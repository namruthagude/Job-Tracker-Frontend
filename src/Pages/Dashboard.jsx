import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getApplications, addApplication, getStats, 
         updateApplication, deleteApplication } from "../Services/api";

function Dashboard() {
    const [applications, setApplications] = useState([])
    const [stats, setStats] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [companyFilter, setCompanyFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [newApp, setNewApp] = useState({
        companyName: '', jobTitle: '', jobBoard: '',
        salaryExpected: '', notes: ''
    })

    const navigate = useNavigate()

    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        try {
            const appResponse = await getApplications(statusFilter, companyFilter)
            setApplications(appResponse.data)
            const statsResponse = await getStats()
            setStats(statsResponse.data)
        } catch (err) {
            navigate('/login')
        }
    }

    const handleSignout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateApplication(id, newStatus)
            fetchData()
        } catch (err) { console.log(err) }
    }

    const handleDelete = async (id) => {
        try {
            await deleteApplication(id)
            fetchData()
        } catch (err) { console.log(err) }
    }

    const handleSubmit = async () => {
        try {
            await addApplication(newApp)
            setNewApp({ companyName: '', jobTitle: '', 
                jobBoard: '', salaryExpected: '', notes: '' })
            setShowForm(false)
            fetchData()
        } catch (err) { console.log(err) }
    }

    const getStatusColor = (status) => {
        switch(status) {
            case 'Interview': return 'bg-blue-100 text-blue-700'
            case 'Selected': return 'bg-green-100 text-green-700'
            case 'Rejected': return 'bg-red-100 text-red-700'
            case 'Ghosted': return 'bg-gray-100 text-gray-700'
            case 'Follow Up': return 'bg-yellow-100 text-yellow-700'
            default: return 'bg-purple-100 text-purple-700'
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-600">
                    Job Tracker 🎯
                </h1>
                <div className="flex gap-3">
                    <Link to="/account"
                        className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                        Account
                    </Link>
                    <button onClick={handleSignout}
                        className="text-gray-600 hover:text-red-500 text-sm font-medium">
                        Sign Out
                    </button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-6">

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
                            <p className="text-gray-500 text-sm">Total Applied</p>
                            <p className="text-3xl font-bold text-blue-600 mt-1">
                                {stats.totalApplications}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
                            <p className="text-gray-500 text-sm">Interviews</p>
                            <p className="text-3xl font-bold text-green-500 mt-1">
                                {stats.totalInterviews}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
                            <p className="text-gray-500 text-sm">Offers</p>
                            <p className="text-3xl font-bold text-yellow-500 mt-1">
                                {stats.totalOffers}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
                            <p className="text-gray-500 text-sm">Response Rate</p>
                            <p className="text-3xl font-bold text-purple-500 mt-1">
                                {stats.responseRate}
                            </p>
                        </div>
                    </div>
                )}

               

                {/* Add Form */}
                {showForm && (
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            New Application
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                placeholder="Company Name *"
                                value={newApp.companyName}
                                onChange={(e) => setNewApp({...newApp, companyName: e.target.value})}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            />
                            <input
                                placeholder="Job Title *"
                                value={newApp.jobTitle}
                                onChange={(e) => setNewApp({...newApp, jobTitle: e.target.value})}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            />
                            <input
                                placeholder="Job Board (LinkedIn, keepmeposted.mt)"
                                value={newApp.jobBoard}
                                onChange={(e) => setNewApp({...newApp, jobBoard: e.target.value})}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            />
                            <input
                                type="number"
                                placeholder="Expected Salary (optional)"
                                value={newApp.salaryExpected}
                                onChange={(e) => setNewApp({...newApp, salaryExpected: e.target.value})}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            />
                            <input
                                placeholder="Notes (optional)"
                                value={newApp.notes}
                                onChange={(e) => setNewApp({...newApp, notes: e.target.value})}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 md:col-span-2"
                            />
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
                            >
                                Save Application
                            </button>
                            <button
                                onClick={() => setShowForm(false)}
                                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Applications List */}
                <div className="flex flex-col gap-3">
                    {applications.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                            <p className="text-gray-400 text-lg">No applications yet!</p>
                            <p className="text-gray-400 text-sm mt-1">
                                Click "+ Add Application" to get started
                            </p>
                        </div>
                    ) : (
                        applications.map((app) => (
                            <div key={app.id}
                                className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">

                                {/* Company Initial */}
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center flex-shrink-0">
                                    {app.companyName.charAt(0).toUpperCase()}
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-semibold text-gray-800">
                                            {app.companyName}
                                        </p>
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {app.jobTitle} · {app.jobBoard}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Applied: {new Date(app.appliedDate).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <select
                                        value={app.status}
                                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                        className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none"
                                    >
                                        <option>Applied</option>
                                        <option>Interview</option>
                                        <option>Selected</option>
                                        <option>Rejected</option>
                                        <option>Ghosted</option>
                                        <option>Follow Up</option>
                                    </select>
                                    <button
                                        onClick={() => handleDelete(app.id)}
                                        className="text-red-400 hover:text-red-600 text-sm font-medium px-2 py-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;