import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getApplications, addApplication, getStats, updateApplication, deleteApplication } from "../Services/api";


function Dashboard(){
    const [applications, setApplications] = useState([])
    const [stats, setStats] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [companyFilter, setCompanyFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [newApp, setNewApp] = useState({
        companyName : '',
        jobTitle : '',
        jobBoard : '',
        salaryExpected:'',
        notes : ''
    })

    const navigate = useNavigate()

    useEffect(() =>{
        fetchData();
    }, [])

    const fetchData = async() =>{
        try{
            const appResponse = await getApplications();
            setApplications(appResponse.data)
            const statsResponse = await getStats()
            setStats(statsResponse.data)

        }
        catch(err){
            navigate('/login')
        }
    }

    const handleSignout = () =>{
        localStorage.removeItem('token')
        navigate('/login')
    }

    const handleStatusChange = async(id, newStatus) =>{
        try{
            await updateApplication(id,newStatus);
            fetchData()
        }
        catch(err){
            console.log(err);
        }
    }

    const handleDelete = async(id) =>{
        try{
            await deleteApplication(id);
            fetchData();
        }
        catch(err){
            console.log(err);
        }
    }

    const handleSubmit = async() =>{
        try{
            await addApplication(newApp)
            setNewApp({
                companyName:'',
                jobTitle : '',
                jobBoard : '',
                salaryExpected: '',
                appliedDate : '',
                notes : ''
            })

            setShowForm(false)
            fetchData()
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div>
            <div>
                <h1>Dashboard</h1>
                <button onClick={() => navigate('/account')}>My Account</button>
                <button onClick = {handleSignout}>Signout</button>
            </div>
            
            {stats && (
                <div style={{display:'flex', gap:'20px', margin : "20px 0"}}>
                    <div style={{padding:'20px', background:'#f0f0f0', borderRadius:'8px'}}>
                        <h3>Total Applied</h3>
                        <p style={{fontSize:'32px', fontWeight:'bold'}}>{stats.totalApplications}</p>
                    </div>
                    
                    <div style={{padding:'20px', background:'#f0f0f0', borderRadius:'8px'}}>
                        <h3>Interviews</h3>
                        <p style={{fontSize:'32px', fontWeight:'bold'}}>{stats.totalInterviews}</p>
                    </div>

                    <div style={{padding:'20px', background:'#f0f0f0', borderRadius:'8px'}}>
                        <h3>Offers</h3>
                        <p style={{fontSize:'32px', fontWeight:'bold'}}>{stats.totalOffers}</p>
                    </div>

                    <div style={{padding:'20px', background:'#f0f0f0', borderRadius:'8px'}}>
                        <h3>Response Rate</h3>
                        <p style={{fontSize:'32px', fontWeight:'bold'}}>{stats.responseRate}</p>
                    </div>
                </div>
            )}

            <div>
                <h2>My Applications</h2>
                {applications.length === 0 ? (
                    <p>No applications yet</p>
                ): (applications.map((app) =>(
                    <div key={app.id} style={{
                        border:"1px solid #ddd",
                        padding:"15px",
                        margin:"10px 0",
                        borderRadius:"8px"
                    }}>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <div>
                                <h3>{app.companyName}</h3>
                                <p>{app.jobTitle} --- {app.jobBoard}</p>
                                <p>Applied:{new Date(app.appliedDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <select value={app.status} onChange={(e) => handleStatusChange(app.id, e.target.value)}>     
                                    <option>Applied</option>
                                    <option>Interview</option>
                                    <option>Selected</option>
                                    <option>Rejected</option>
                                    <option>Ghosted</option>
                                    <option>Follow up</option>
                                </select>

                                <button onClick={() => handleDelete(app.id)}>Delete</button>
                            </div>
                        </div>

                    </div>
                )))}
            </div>

            <button onClick={() => setShowForm(!showForm)}>{showForm?'Cancel' : 'Add Application'}</button>

            {showForm && (
                <div style={
                    {
                        border: '1px solid #ddd',
                        padding : '20px',
                        margin : '10px 0',
                        borderRadius: '8px'
                    }
                    
                }>

                    <h2>Add New Application</h2>
                    <input placeholder="Company Name" value={newApp.companyName} onChange={(e) => setNewApp({...newApp, companyName:e.target.value})} />
                    <br/>

                    <input placeholder="Job Title" value={newApp.jobTitle} onChange={(e) => setNewApp({...newApp, jobTitle:e.target.value})} />
                    <br/>

                    <input placeholder="Job Board" value={newApp.jobBoard} onChange={(e) => setNewApp({...newApp, jobBoard:e.target.value})} />
                    <br/>

                    <input placeholder="Salary Expected" value={newApp.salaryExpected} onChange={(e) => setNewApp({...newApp, salaryExpected:e.target.value})} />
                    <br/>

                    <input placeholder="Notes" value={newApp.notes} onChange={(e) => setNewApp({...newApp, notes:e.target.value})} />
                    <br/>

                    <button onClick={handleSubmit}>Save</button>
                    <button onClick={() =>setShowForm(false)}>Cancel</button>

                </div>
            )}
        </div>
    )
}

export default Dashboard;