import React, { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data from '../Api/stateDistrict';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import { UserContext } from "../context/UserContext";
import ClipLoader from "react-spinners/ClipLoader";
const cookies = new Cookies();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function EditAccount(){
    const navigate = useNavigate();

    const token = cookies.get('token');
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        if (!token || !user) {
            navigate('/');
        }
    }, [token, user]);


    const [formdata, setFormdata] = useState({
        name: user.name,
        email: user.email,
        contact: user.contact,
        photo: user.profile,
        state: user.state,
        district: user.district,
        village: user.village,
    });

    const handleChange = (e) => {
        if(e.target.type === 'file'){
            setFormdata({...formdata, [e.target.name]: e.target.files[0]})
        }
        else{
            setFormdata({...formdata, [e.target.name]: e.target.value})
        }
    }

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataToSend = new FormData();
        Object.keys(formdata).forEach((key) => {
            formDataToSend.append(key, formdata[key]);
        });

        try {
            const res = await fetch(`${backendUrl}/editAccount/${user._id}`, {
                method: 'PUT',
                body: formDataToSend
            });

            const result = await res.json();

            if (res.ok) {
                // Update cookie and context
                const updatedUser = result.updatedUser;
                cookies.set('user', updatedUser, { path: '/' });
                setUser(updatedUser);

                // Optional: Force reload or redirect
                toast.success("Account edited successfully!", {
                    onClose: () => navigate('/profile'),
                    autoClose: 2000,
                    position: 'bottom-right',
                    closeOnClick: true,
                    pauseOnHover: false,
                    theme: 'colored'
                });
            } else {
                toast.warn(result.message || "Something went wrong", {
                    autoClose: 1500,
                    pauseOnHover: false,
                    closeOnClick: true,
                    position: 'bottom-right',
                    theme: 'colored'
                });
            }
        } catch (err) {
            toast.error("Server error", {
                autoClose: 1500,
                pauseOnHover: false,
                closeOnClick: true,
                position: 'bottom-right',
                theme: 'colored'
            });
        }
    }

    return (
        <div className="bg-zinc-800 min-h-screen text-white flex justify-center items-center py-4 sm:py-10">
            <div className="p-5 border-2 border-gray-400 rounded-lg w-[80%] sm:w-[40%]">
                <h1 className="font-extrabold text-[25px] text-gray-500 py-4">Register</h1>
                <form method="post" encType="multipart/form-data" onSubmit={handleSubmit} className="flex flex-col">

                    <label htmlFor="name" className="py-2">Name<span className="text-red-500">*</span></label>
                    <input type="text" id="name" name="name" required placeholder="Enter..." value={formdata.name} onChange={handleChange} className="border-2 border-gray-500 bg-transparent outline-none text-white px-3 py-2 rounded-lg" />
                    
                    <label htmlFor="email" className="py-2">Email<span className="text-red-500">*</span></label>
                    <input type="email" id="email" name="email" required placeholder="xyz@gmail.com" value={formdata.email} onChange={handleChange} className="border-2 border-gray-500 bg-transparent outline-none text-white px-3 py-2 rounded-lg" />
                    
                    <label htmlFor="contact" className="py-2">Mobile No.<span className="text-red-500">*</span></label>
                    <input type="text" id="contact" name="contact" required value={formdata.contact} onChange={handleChange} className="border-2 border-gray-500 bg-transparent outline-none text-white px-3 py-2 rounded-lg" />

                    <label htmlFor="image" className="py-2 mt-4">Profile photo<span className="text-red-500">*</span></label>
                    <input type="file" id="image" name="photo" required onChange={handleChange} className="border-2 border-gray-500 bg-transparent outline-none text-white px-3 py-2 rounded-lg" />

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

                    <button className="px-4 py-2 text-green-500 font-bold text-xl hover:text-green-600 rounded-md w-fit self-center mt-4" onSubmit={handleSubmit}>Save</button>
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

export default EditAccount;