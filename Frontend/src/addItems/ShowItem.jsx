import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function ShowItem(){
    const navigate = useNavigate();

    if(!cookies.get('token')){
      navigate('/login');
      return;
    }
    const user = cookies.get('user');
    const itemId = cookies.get('itemId');
    const category = cookies.get('category');

    const [item, setItem] = useState();
    useEffect(() => {
        if(category && itemId){
          fetch(`${backendUrl}/showItem/${category}/${itemId}`)
          .then(async (res) => {
            if(res.ok){
              const data = await res.json();
              setItem(data);
            }
            else{
              const data = await res.json();
              toast.error("Error Occured!", {
              autoClose: 2000,
              position: 'bottom-right',
              closeOnClick: true,
              pauseOnHover: false,
              theme: 'colored'
              })
            }
          })
          .catch((err) => {
            toast.error("something went wrong:", {
              autoClose: 2000,
              position: 'bottom-right',
              closeOnClick: true,
              pauseOnHover: false,
              theme: 'colored'
            })
          })
        }
    },[category,itemId])

    const addToCart = () => {
      try {
        fetch(`${backendUrl}/addToCart`,{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({itemID: item._id, category: category, userID: user._id})
        })
        .then(async (res) => {
          if(res.ok){
            const data = await res.json();
            toast.success(data.message, {
              autoClose: 2000,
              pauseOnHover: false,
              closeOnClick: true,
              position: 'bottom-right',
              theme: 'colored'
            })
          }
          else{
            const data = await res.json();
            toast.error(data.message, {
              autoClose: 2000,
              pauseOnHover: false,
              closeOnClick: true,
              position: 'bottom-right',
              theme: 'colored'
            })
          }
        })
      } catch (error) {
        toast.error("Server Error:", {
          autoClose: 2000,
          pauseOnHover: false,
          closeOnClick: true,
          position: 'bottom-right',
          theme: 'colored'
        })
      }
    }
  
    return(
        <>
        <Header />
        <div className="md:min-h-screen bg-gradient-to-tr from-gray-700 to-zinc-700 flex justify-center md:py-10">
          {item && 
            <div className="lg:w-[60%] h-fit px-4 md:px-10 pt-5 md:border-2 border-gray-500 rounded-md flex flex-col">
                {/* Seller Info */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={item.userDP} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h1 className="font-bold text-xl text-gray-300">{item.userName}</h1>
                    <p className="text-sm text-gray-400">{item.userAddress}</p>
                  </div>
                </div>
                <hr className="my-4 border-gray-600" />

                {/* Product Details */}
                <div className="flex flex-col">
                  {/* Image of Product */}
                  <div className="lg:w-[80%] h-64 self-center flex-shrink-0 overflow-hidden rounded-lg bg-gray-600 flex justify-center items-center">
                    <img src={item.image} className="w-full h-full object-cover" />
                  </div>
                  {/* Description of Product */}
                  <div className="flex flex-col items-start px-4 lg:px-20 py-10">
                    <h2 className="font-semibold text-2xl text-gray-300">{item.firstField}</h2>
                    <p className="text-gray-400">{item.description}</p>
                    <div className="border-2 border-gray-400 rounded-md my-2">
                      <p className="font-bold text-green-500 px-4 py-2">{item.price}</p>
                    </div>
                    <p className="text-gray-200 "><span className="text-gray-400 font-bold">Address : {item.place}, {item.district}, {item.state}</span></p>
                    <h3 className="text-lg font-bold shadow-md text-gray-300 pt-5">Contact Information</h3>
                    <p className="text-gray-500 font-semibold pt-2">Mobile no. : <span className="text-gray-400">{item.userContact}</span></p>
                    <p className="text-gray-500 font-semibold">Email : <span className="text-gray-400">{item.userEmail}</span></p>

                    <button onClick={addToCart} className="mt-5 px-4 py-2 border-2 border-gray-500 rounded-lg bg-green-500 text-gray-700 font-bold">Add To Cart</button>
                  </div>
                </div>
            </div>
          }
        </div>
        <Footer />
        <ToastContainer />
        </>
    )
}

export default ShowItem;