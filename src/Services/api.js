import axios  from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL : API_URL
});

api.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token');

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const register = (data) => api.post('/auth/register',data);
export const login = (data) => api.post('/auth/login', data);

export const getApplications = (status, company) =>
    api.get('/jobapplications', {params : {status, company}});


export const addApplication = (data) => api.post('/jobapplications', data);

export const updateApplication = (id, status) => api.put(`/jobapplications/${id}/status`, {status});
export const deleteApplication = (id) => api.delete(`/jobapplications/${id}`);

export const getStats = () =>
    api.get('jobapplications/stats');

