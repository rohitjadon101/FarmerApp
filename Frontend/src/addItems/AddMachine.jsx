import React, { useState } from "react";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import data from '../Api/stateDistrict';
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function AddMachine(){
    const navigate = useNavigate();

    if(!cookies.get('token')){
        navigate('/login');
        return;
    }
    const user = cookies.get('user');

    const [formdata, setFormdata] = useState({name: '', description: '', price: '', machineCategory: '', photo: '', state: '', district: '', place: '' })
    const handleChange = (e) => {
        if(e.target.type === 'file'){
            setFormdata({...formdata, [e.target.name]: e.target.files[0]})
        }
        else{
            setFormdata({...formdata, [e.target.name]: e.target.value})
        }
    }
    const machineCategories = ["Tractor", "Trolly", "Cultivator", "Seeddril", "Bike", "Rottervator", "Labeler", "Other Accessories"]

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        Object.keys(formdata).forEach((key) => {
            formData.append(key, formdata[key])
        })

        await fetch(`${backendUrl}/add/machine/${user._id}`, {
            method: 'POST',
            body: formData
        }).then(async (res) => {
            const data = await res.json();
            if(res.ok){
                toast.success(data.message,{
                    onClose: () => {
                        navigate('/add/machine');
                    },
                    autoClose: 2000,
                    position: 'bottom-right',
                    closeOnClick: true,
                    pauseOnHover: false,
                    theme: 'colored'
                })
            }else{
                toast.error(data.message,{
                    autoClose: 2000,
                    position: 'bottom-right',
                    closeOnClick: true,
                    pauseOnHover: false,
                    theme: 'colored'
                })
            }
        }).catch((err) => {
            toast.error("Network Error",{
                autoClose: 2000,
                position: 'bottom-right',
                closeOnClick: true,
                pauseOnHover: false,
                theme: 'colored'
            })
        });
    };

    return (
        <div className="bg-zinc-800 min-h-screen text-white flex justify-center items-center py-20">
            <div className="p-5 border-2 border-gray-400 rounded-lg lg:w-[40%]">
                <h1 className="font-extrabold text-[25px] text-gray-500 py-4">Add Machine</h1>
                <form onSubmit={handleSubmit} className="flex flex-col">

                    <label htmlFor="name" className="py-2">Name of machine <span className="text-red-500">*</span></label>
                    <input type="text" id="name" name="name" required placeholder="eg: Swaraj 855" value={formdata.name} onChange={handleChange} className="border-2 border-gray-500 bg-transparent outline-none text-white px-3 py-2 rounded-lg" />

                    <label htmlFor="description" className="py-2 mt-4">Description</label>
                    <textarea id="description" name="description" placeholder="eg: one year old in good condition" value={formdata.description} onChange={handleChange} className="border-2 border-gray-500 bg-transparent outline-none text-white px-3 py-2 rounded-lg"></textarea>

                    <label htmlFor="price" className="py-2 mt-4">Price <span className="text-red-500">*</span></label>
                    <input type="text" id="price" name="price" required placeholder="eg: 350000 Rs." value={formdata.price} onChange={handleChange} className="border-2 border-gray-500 bg-transparent outline-none text-white px-3 py-2 rounded-lg" />

                    <label htmlFor="image" className="py-2 mt-4">Photo of machine <span className="text-red-500">*</span></label>
                    <input type="file" id="image" name="photo" required onChange={handleChange} className="border-2 border-gray-500 bg-transparent outline-none text-white px-3 py-2 rounded-lg" />

                    {/* Selecting category of Machine */}
                    <label htmlFor="category" className="py-2 mt-4">Category <span className="text-red-500">*</span></label>
                    <select name="machineCategory" id="category" required value={formdata.machineCategory} onChange={handleChange} className="px-3 py-2 bg-transparent text-white border-2 border-zinc-600 rounded-lg outline-none">
                        <option value="" className="text-black">Select--</option>
                        {machineCategories.map((m) => (
                            <option key={m} value={m} className="px-4 py-1 text-black">{m}</option>
                        ))}
                    </select>

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
                    <input type="text" id="place" name="place" value={formdata.place} onChange={handleChange} className="border-2 border-gray-500 bg-transparent outline-none text-white px-3 py-2 rounded-lg" />

                    <button className="px-4 py-2 text-green-500 font-bold text-xl hover:text-green-600 rounded-md w-fit self-center mt-4">Save</button>
                </form>
            </div>
        <ToastContainer />
        </div>
    )
}

export default AddMachine;