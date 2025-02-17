import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data from '../Api/stateDistrict';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function RegisterPage(){
    const navigate = useNavigate();

    const [formdata, setFormdata] = useState({
        name: '',
        email: '',
        password: '',
        contact: '',
        photo: '',
        state: '',
        district: '',
        village: '',
    });
    const handleChange = (e) => {
        if(e.target.type === 'file'){
            setFormdata({...formdata, [e.target.name]: e.target.files[0]})
        }
        else{
            setFormdata({...formdata, [e.target.name]: e.target.value})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(formdata).forEach((key) => {
            formData.append(key, formdata[key]);
        });

        await fetch(`${backendUrl}/register`, {
            method: 'POST',
            body: formData
        }).then(async (res) => {
            const result = await res.json();
            if(res.ok){
                setLoading(false);
                toast.success(result.message,{
                    onClose: () => {
                        navigate('/login')
                    },
                    autoClose: 2000,
                    position: 'bottom-right',
                    closeOnClick: true,
                    pauseOnHover: false,
                    theme: 'colored'
                })
            }else{
                toast.warn(result.message,{autoClose: 1500, pauseOnHover: false, closeOnClick: true, position: 'bottom-right', theme: 'colored'})
            }
        }).catch((err) => {
            toast.error("Network Error",{autoClose: 1500, pauseOnHover: false, closeOnClick: true, position: 'bottom-right', theme: 'colored'})
        });
    };

    const [loading, setLoading] = useState(false);

    return (
        <div className="bg-zinc-800 min-h-screen w-full text-white flex justify-center items-center py-4 sm:py-10">
            <div className="sm:p-5 sm:border-2 border-gray-400 rounded-lg w-[80%] sm:w-[40%]">
                <h1 className="font-extrabold text-[25px] text-gray-500 py-4">Register</h1>
                <form method="post" encType="multipart/form-data" onSubmit={handleSubmit} className="flex flex-col">

                    <label htmlFor="name" className="py-2">Name<span className="text-red-500">*</span></label>
                    <input type="text" id="name" name="name" required placeholder="Enter..." value={formdata.name} onChange={handleChange} className="border-2 border-gray-500 bg-transparent outline-none text-white px-3 py-2 rounded-lg" />
                    
                    <label htmlFor="email" className="py-2">Email<span className="text-red-500">*</span></label>
                    <input type="email" id="email" name="email" required placeholder="xyz@gmail.com" value={formdata.email} onChange={handleChange} className="border-2 border-gray-500 bg-transparent outline-none text-white px-3 py-2 rounded-lg" />
                    
                    <label htmlFor="password" className="py-2">password<span className="text-red-500">*</span></label>
                    <input type="password" id="password" name="password" required value={formdata.password} onChange={handleChange} className="border-2 border-gray-500 bg-transparent outline-none text-white px-3 py-2 rounded-lg" />
                    
                    <label htmlFor="contact" className="py-2">Mobile No.<span className="text-red-500">*</span></label>
                    <input type="text" id="contact" name="contact" required value={formdata.contact} onChange={handleChange} className="border-2 border-gray-500 bg-transparent outline-none text-white px-3 py-2 rounded-lg" />

                    <label htmlFor="image" className="py-2 mt-4">Profile photo</label>
                    <input type="file" id="image" name="photo" onChange={handleChange} className="border-2 border-gray-500 bg-transparent outline-none text-white px-3 py-2 rounded-lg" />

                    {/* Retrieving States */}
                    <label htmlFor="state" className="py-2 mt-4">State <span className="text-red-500">*</span></label>
                    <select name="state" id="state" required value={formdata.state} onChange={handleChange} className="px-3 py-2 bg-transparent text-white border-2 border-zinc-600 rounded-lg outline-none">
                        <option value="" className="text-black">Select--</option>
                        {data.states.length > 0 ? (
                            data.states.map((m) => (
                                <option key={m.state} value={m.state} className="px-4 py-1 text-black">{m.state}</option>
                            ))
                        ) : (<option value='No state' className="px-4 py-1 text-black">No state</option>)}
                    </select>

                    {/* Retrieving Districts */}
                    <label htmlFor="district" className="py-2 mt-4">District <span className="text-red-500">*</span></label>
                    <select name="district" id="district" required value={formdata.district} onChange={handleChange} className="px-3 py-2 bg-transparent text-white border-2 border-zinc-600 rounded-lg outline-none">
                        <option value="" className="text-black">Select--</option>
                        {data.states.map((m) => (
                            m.state === formdata.state && ( 
                                m.districts.map((d) => (
                                    <option key={d} value={d} className="px-4 py-1 text-black">{d}</option>
                                ))
                            )
                        ))}
                    </select>

                    {/* Mentioning Address */}
                    <label htmlFor="place" className="py-2 mt-4">Village or Street</label>
                    <input type="text" id="place" name="village" value={formdata.village} onChange={handleChange} className="border-2 border-gray-500 bg-transparent outline-none text-white px-3 py-2 rounded-lg" />

                    <button className="px-4 py-2 text-green-500 font-bold text-xl hover:text-green-600 rounded-md w-fit self-center mt-4" onClick={() => setLoading(true)}>Save</button>
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

export default RegisterPage;