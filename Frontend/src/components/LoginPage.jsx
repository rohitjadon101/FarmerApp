import React, { useState, useContext } from "react";
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { UserContext } from "../context/UserContext";
const cookies = new Cookies();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function LoginPage(){
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);

    const [formdata, setFormData] = useState({email: '',password: ''});

    const handleChange = (e) => {
      setFormData({...formdata, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const res = await fetch(`${backendUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formdata)
          })
          const data = await res.json();
          setLoading(false);

          if(data.token){
            cookies.set('token', data.token);
            setUser(data.foundUser);
            toast.success("login succcessFully",{
              onClose: () => {
                navigate('/')
              },
              autoClose: 1500,
              position: 'top-right',
              closeOnClick: true,
              pauseOnHover: false,
              theme: 'colored'
            });
          }
          else{
            toast.error(`${data.message}`, {
              autoClose: 1500,
              position: 'top-right',
              closeOnClick: true,
              pauseOnHover: false,
              theme: 'colored'
            })
          }

        } catch (error) {
          setLoading(false);
          toast.error(`${data.message}`, {
            autoClose: 1500,
            position: 'top-right',
            closeOnClick: true,
            pauseOnHover: false,
            theme: 'colored'
          })
        }
    };

    const [loading, setLoading] = useState(false);

    return (
      <div className="min-h-screen bg-zinc-900 flex justify-center items-center">
          <div className="sm:w-1/3 px-2 lg:px-4 py-10 border-2 border-zinc-600 rounded-lg overflow-hidden flex flex-col justify-center">
              <h1 className="text-2xl font-bold mb-5 ml-4 text-white">User Login</h1>
              <form onSubmit={handleSubmit} className="flex flex-col p-4 text-white w-full">
                  <input type="email" name="email" value={formdata.email} onChange={handleChange} placeholder="email" className="px-4 py-2 bg-zinc-800 rounded-lg outline-none"/>
                  <input type="password" name="password" value={formdata.password} onChange={handleChange} placeholder="password" className="px-4 py-2 bg-zinc-800 rounded-lg outline-none mt-2"/>
                  <p className="mt-2 text-gray-400">Don't have an account ? <span className="text-blue-500 underline cursor-pointer hover:text-blue-600" onClick={() => navigate('/register')}>Create Account</span></p>
                  <div className="flex gap-4 mt-10">
                      <button className="px-4 py-1 bg-blue-600 rounded-lg" onClick={() => setLoading(true)}>Login</button>
                      <a href="/" className="px-4 py-1 bg-zinc-600 rounded-lg">Back</a>
                  </div>
                  {loading && (
                    <div className="mt-2 flex justify-center items-center">
                    <ClipLoader 
                      color="#5ad356"
                      loading={loading}
                      size={30}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                  )}
              </form>
          </div>
          <ToastContainer />
      </div>
    )
}

export default LoginPage;