import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaHome } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Cookies from "universal-cookie";
import Footer from "./Footer";
const backendURL = import.meta.env.VITE_BACKEND_URL;
const cookies = new Cookies();

const ProfilePage = () => {
    const navigate = useNavigate();

    let token = cookies.get('token');
    if(!token){
        navigate('/')
        return;
    }
    let user = cookies.get('user') || null;

    const [menuOpen, setMenuOpen] = useState(false);
    const [savedItems, setSavedItems] = useState([]);
    const [userItems, setUserItems] = useState([]);
    const [savedOpen, setSavedOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
  
    if(user){
        // Fetch saved items
        useEffect(() => {
          fetch(`${backendURL}/savedItems/${user._id}`)
            .then((res) => res.json())
            .then((data) => setSavedItems(data))
            .catch((err) => console.error(err));
        }, []);
      
        // Fetch user-added items
        useEffect(() => {
          fetch(`${backendURL}/userItems/${user._id}`)
            .then((res) => res.json())
            .then((data) => setUserItems(data))
            .catch((err) => console.error(err));
        }, []);
    }

    // Remove From Cart
    const removeFromCart = (itemID) => {
        fetch(`${backendURL}/removeFromCart/${itemID}`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userID: user._id})
        })
        .then(async (res) => {
            if(res.ok){
                const data = await res.json();
                toast.success(data.message, {autoClose: 1500, pauseOnHover: false, closeOnClick: true, position: 'bottom-right', theme: 'colored'})
                setSavedItems(prev => prev.filter((item) => item._id !== itemID));
            }
            else{
                const data = await res.json();
                toast.error(data.message, {autoClose: 1500, pauseOnHover: false, closeOnClick: true, position: 'bottom-right', theme: 'colored'})
            }
        })
        .catch((error) => {
            toast.error("something went wrong", {autoClose: 1500, pauseOnHover: false, closeOnClick: true, position: 'bottom-right', theme: 'colored'})
        })
    }

    // Remove Your Items
    const removeAddedItems = (itemID, idomain) => {
        Swal.fire({
            icon: 'warning',
            title: 'Delete Item',
            text: 'Are you sure you want to delete your item permanently',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if(result.isConfirmed){
                fetch(`${backendURL}/removeAddedItems/${itemID}`,{
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({userID: user._id, itemDomain: idomain})
                })
                .then(async (res) => {
                    if(res.ok){
                        const data = await res.json();
                        toast.success(data.message, {autoClose: 1500, pauseOnHover: false, closeOnClick: true, position: 'bottom-right', theme: 'colored'})
                        setUserItems(prev => prev.filter((item) => item._id !== itemID));
                    }
                    else{
                        const data = await res.json();
                        toast.error(data.message, {autoClose: 1500, pauseOnHover: false, closeOnClick: true, position: 'bottom-right', theme: 'colored'})
                    }
                })
                .catch((error) => {
                    toast.error("something went wrong", {autoClose: 1500, pauseOnHover: false, closeOnClick: true, position: 'bottom-right', theme: 'colored'})
                })
            }
        })
    }

    // Handle Logout
    const handleLogout = () => {
        cookies.remove('token');
        cookies.remove('user');
        toast.success('Logged out!', {
            onClose: () => {
                navigate('/');
            },
            autoClose: 2000,
            pauseOnHover: false,
            closeOnClick: true,
            position: 'bottom-right',
            theme: 'colored'
        })
    }

    // Handle Delete Account
    const handleDelete = () => {
        Swal.fire({
            icon: 'error',
            title: 'Delete Account',
            text: 'Are you sure you want to delete your account ? All of your Items will be deleted', 
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if(result.isConfirmed){
                fetch(`${backendURL}/removeAccount`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({userID: user._id})
                })
                .then(async (res) => {
                    if(res.ok){
                        const data = await res.json();
                        toast.success(data.message, {
                            onClose: () => {
                                cookies.remove('token')
                                cookies.remove('user')
                                navigate('/')
                            },
                            autoClose: 1500,
                            pauseOnHover: false,
                            closeOnClick: true,
                            position: 'bottom-right',
                            theme: 'colored'
                        })
                    }
                    else{
                        const data = await res.json();
                        toast.error(data.message, {autoClose: 1500, pauseOnHover: false, closeOnClick: true, position: 'bottom-right', theme: 'colored'})
                    }
                })
                .catch((error) => {
                    toast.error("something went wrong", {autoClose: 1500, pauseOnHover: false, closeOnClick: true, position: 'bottom-right', theme: 'colored'})
                })
            }
        })
    }

    // when clicked on any item
    const handleClickOnItem = (itemID,itemDomain) => {
        cookies.set('itemId', itemID)
        cookies.set('category', itemDomain)
        navigate(`/showItem`)
    }

    return (
        <>
        <div className="w-full min-h-screen bg-zinc-800 text-white p-4 pb-10 border-b-2 border-b-zinc-700">
            <div className="relative">

                {/* Toggle Button for Sidebar */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="absolute top-4 left-4 text-xl">
                {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Sidebar Menu */}
                {menuOpen && (
                <div className="absolute top-12 left-4 bg-gray-800 p-2 rounded-md border border-white">
                    {/* <button className="block w-full text-left px-4 py-1 font-bold hover:bg-gray-700" onClick={() => navigate('/editAccount', {state: {from: '/profile'}})}>Edit</button> */}
                    <button className="block w-full text-left px-4 py-1 text-red-500 font-bold hover:underline" onClick={handleLogout}>Logout</button>
                    <button className="block w-full text-left px-4 py-1 font-bold hover:bg-gray-700" onClick={() => handleDelete()}>Delete Account</button>
                </div>
                )}

                {/* Home Icon */}
                <button onClick={() => navigate('/')} className="absolute top-4 right-4 text-xl" title="Homepage"><FaHome /></button>

                {/* Profile Section */}
                <div className="flex flex-col items-center mt-8">
                    <div className="w-36 h-36 rounded-full overflow-hidden">
                        <img src={user.profile} className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-2xl font-semibold mt-2">{user.name}</h2>
                    <p className="text-gray-400">{user.district}, {user.state}</p>
                    <p className="text-gray-300 text-sm">{user.email}</p>
                </div>

            </div>

            {/* Expandable Sections */}
            <div className="w-full mt-16 flex justify-center items-center">
                <div className="w-full px-4 md:px-10 lg:w-[40%] flex flex-col items-center gap-4">
                    {/* Saved Items */}
                    <div className="w-full border border-white p-4 rounded-md">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setSavedOpen(!savedOpen)}>
                            <span className="text-lg">Saved Items</span>
                            <IoIosArrowDown className={`text-xl transform transition-transform ${savedOpen ? "rotate-180" : ""}`} />
                        </div>
                        {savedOpen && (
                        <div className="mt-2">
                            {savedItems.length > 0 ? (
                            [...savedItems].reverse().map((item) => (
                                <div key={item._id} onClick={() => handleClickOnItem(item._id,item.domain)} className="text-gray-300 border-t border-gray-700 px-2 py-4 flex justify-between items-center cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-16 flex-shrink-0 rounded-md overflow-hidden">
                                            <img src={item.image} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className="text-lg text-gray-200 font-bold">{item.firstField}</h1>
                                            <p className="text-gray-400 text-sm">{item.description}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="text-red-500 font-bold" onClick={() => removeFromCart(item._id)}>Remove</button>
                                    </div>
                                </div>
                            ))
                            ) : (
                            <p className="text-gray-500 mt-2">No saved items</p>
                            )}
                        </div>
                        )}
                    </div>
        
                    {/* User Items */}
                    <div className="w-full border border-white p-4 rounded-md">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setUserOpen(!userOpen)}>
                            <span className="text-lg">Your Items</span>
                            <IoIosArrowDown className={`text-xl transform transition-transform ${userOpen ? "rotate-180" : ""}`} />
                        </div>
                        {userOpen && (
                        <div className="mt-2">
                            {userItems.length > 0 ? (
                            [...userItems].reverse().map((item) => (
                                <div key={item._id} onClick={() => handleClickOnItem(item._id,item.domain)} className="text-gray-300 border-t border-gray-700 px-2 py-4 flex justify-between items-center cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-16 flex-shrink-0 rounded-md overflow-hidden">
                                            <img src={item.image} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className="text-lg text-gray-200 font-bold">{item.firstField}</h1>
                                            <p className="text-gray-400 text-sm">{item.description}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="text-red-500 font-bold ml-4" onClick={() => removeAddedItems(item._id, item.domain)}>Delete</button>
                                    </div>
                                </div>
                            ))
                            ) : (
                            <p className="text-gray-500 mt-2">No added items</p>
                            )}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        <ToastContainer />
        </>
    );
};

export default ProfilePage;