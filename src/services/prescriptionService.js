import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/prescriptions",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export const prescriptionService={
    create(data)        {
        console.log("prici");
        return API.post('/', data).then(res => alert(res.data)); 
    },
  getDoctor()         { return API.get('/doctor').then(res => res.data); },
  getPatient()        { return API.get('/patient').then(res => res.data); },
  update(id, data)    { return API.put(`/${id}`, data).then(res => res.data); },
  delete(id)          { return API.delete(`/${id}`).then(res => res.data); }
}
