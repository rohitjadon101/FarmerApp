import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data from '../Api/stateDistrict';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
const cookies = new Cookies();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function EditAccount(){
    const navigate = useNavigate();

    const token = cookies.get('token');
    const user = cookies.get('user');
    if(!token || !user){
        navigate('/')
        return;
    }

    const [formdata, setFormdata] = useState({
        name: user.name,
        email: user.email,
        contact: user.contact,
        photo: user.profile,
        state: user.state,
        district: user.district,
        village: user.village,
    });

    // const [formdata, setFormdata] = useState({
    //     name: '',
    //     email: '',
    //     contact: '',
    //     photo: '',
    //     state: '',
    //     district: '',
    //     village: '',
    // });

    // if(user){
    //     useEffect(() => {
    //         fetch(`${backendUrl}/getUser/${user._id}`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setFormdata({name: data.name, email: data.email, contact: data.contact, photo: data.profile, state: data.state, district: data.district, village: data.village})
    //         })
    //         .catch((error) => console.log("something went wrong!"))
    //     }, [user])
    // }

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

        await fetch(`${backendUrl}/editAccount/${user._id}`, {
            method: 'PUT',
            body: formData
        }).then(async (res) => {
            const result = await res.json();
            if(res.ok){
                toast.success(result.message,{
                    onClose: () => {
                        navigate('/profile')
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

                    <button>Save</button>
                </form>
            </div>
        <ToastContainer />
        </div>
    )
}

export default EditAccount;