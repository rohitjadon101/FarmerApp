import React, { useEffect, useState } from "react";
import { GiHamburgerMenu, GiTomato, GiPalmTree, GiWheat   } from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTractor, FaAppleAlt } from "react-icons/fa";
import { FcGlobe } from "react-icons/fc";
import { PiCow } from "react-icons/pi";
import { TbCrop54 } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { LiaCottonBureau } from "react-icons/lia";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import data from '../Api/stateDistrict';
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const cookies = new Cookies();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function HomePage() {
  const navigate = useNavigate();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const [category, setCategory] = useState(cookies.get('category') || 'machine');
  const [loading, setLoading] = useState(true);

  const categories = [
    {name: 'Machine', icon: '🚜'},
    {name: 'Crop', icon: '🌾'},
    {name: 'Animal', icon: '🐄'},
    {name: 'Field', icon: <TbCrop54/>},
    {name: 'Fertilizer', icon: <LiaCottonBureau/>},
    {name: 'Fruit', icon: '🍌'},
    {name: 'Vegetable', icon: '🍅'},
    {name: 'Plant', icon: '🌿'},
    {name: 'Other', icon: <IoSettings/>},
  ]

  const addItem = [
    {icon: <FaTractor size={20} />, title: 'Add Machine', name: 'machine'},
    {icon: <GiWheat  size={20} />, title: 'Add Crop', name: 'crop'},
    {icon: <PiCow size={20} />, title: 'Add Animal', name: 'animal'},
    {icon: <TbCrop54 size={20} />, title: 'Add Field', name: 'field'},
    {icon: <LiaCottonBureau size={20} />, title: 'Add Fertilizer', name: 'fertilizer'},
    {icon: <FaAppleAlt size={20} />, title: 'Add Fruit', name: 'fruit'},
    {icon: <GiTomato size={20} />, title: 'Add Vegetable', name: 'vegetable'},
    {icon: <GiPalmTree  size={20} />, title: 'Add Plant', name: 'plant'},
    {icon: <IoSettings size={20} />, title: 'Add Other', name: 'other'},
  ]

  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const machineCategory = ["Tractor", "Trolly", "Cultivator", "Seeddril", "Bike", "Rottervator", "Labeler", "Other"]
  const cropCategory = ["Wheat", "Soyabean", "Paddy", "Jwar", "Bajra", "Mustard", "Corn", "Gram", "Moong", "Urad", "Other"]
  const animalCategory= ["Cow", "Buffalo", "Goat", "Sheep", "Horse", "OX", "Other"]
  const fieldCategory = ["For Sale", "For Rent"]
  const fertilizerCategory = ["Urea", "DAP", "Phosphorus", "Sulphur", "Organic", "Other"]
  const fruitCategory = ["Apple", "Mango", "Banana", "Papaya", "Grapes", "Guava", "Other"]
  const vegetableCategory = ["Potato", "Tomato", "Onion", "Ginger", "Carrot", "Other"]
  const plantCategory = ["Normal", "Medicinal", "Valuable"]

  // Fetch All items based on the category
  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      fetch(`${backendUrl}/${category}`)
      .then(async (res) => {
        if(res.ok){
          const data = await res.json();
          setItems(data);
          setLoading(false);
        }
        else{
          const data = await res.json();
          toast.error(data.message, {
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
      })})
    } catch (error) {
      toast.error("Server Error:", {
        autoClose: 2000,
        position: 'bottom-right',
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'colored'
      })
    }
  }, [category])

  // Filter the items based on item category and address
  const filteredItems = items.filter((item) => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (selectedState && item.state !== selectedState) return false;
    if (selectedDistrict && item.district !== selectedDistrict) return false;
    return true;
  });
  

  return (
    <div className="bg-[#1a1e21] text-white min-h-screen flex">
      {/* Sidebar */}
      <aside className={`min-h-full bg-[#3f474d] flex flex-col items-center py-6 transition-all duration-300`}>
        <div className="flex flex-col items-center gap-5 overflow-y-auto px-1">
          <div className="font-bold cursor-pointer text-xl" onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}><GiHamburgerMenu /></div>
          {/* Navigation Icons */}
          <nav className="flex flex-col gap-4 mt-4">
              {categories.map((item) => (
                <div key={item.name} className="flex flex-col sm:flex-row items-center gap-2 cursor-pointer" onClick={() => setCategory(item.name.toLowerCase())}>
                  <div className={`border-2 border-gray-400 w-12 h-10 sm:w-14 sm:h-10 text-[25px] rounded-md flex justify-center items-center hover:border-green-600 transition relative ${category == item.name.toLowerCase() ? 'bg-gray-500' : ''}`}>{item.icon}</div>
                  {isSidebarExpanded && <div className="bg-[#3f474d] text-sm px-2 py-1 rounded-md shadow-lg">{item.name}</div>}
                </div>
              ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="bg-gray-700 flex flex-col w-full  relative">
        <header className="w-full flex justify-end py-4 px-6">
          <div className="text-lg cursor-pointer hover:text-gray-400 transition" onClick={toggleFilter}><GiHamburgerMenu /></div>
        </header>

        {/* Filter Dropdown */}
        {showFilter && (
          <div className="absolute top-12 right-4 bg-zinc-700 shadow-md p-4 rounded-md w-48">
              <label className="block text-sm font-semibold">Category:</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full bg-zinc-600 p-1 border-2 border-gray-400 outline-none rounded-md mt-1">
                <option value="">All</option>
                {category === 'machine' && (
                  machineCategory.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))
                )}
                {category === 'crop' && (
                  cropCategory.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))
                )}
                {category === 'animal' && (
                  animalCategory.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))
                )}
                {category === 'field' && (
                  fieldCategory.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))
                )}
                {category === 'fertilizer' && (
                  fertilizerCategory.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))
                )}
                {category === 'fruit' && (
                  fruitCategory.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))
                )}
                {category === 'vegetable' && (
                  vegetableCategory.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))
                )}
                {category === 'plant' && (
                  plantCategory.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))
                )}
              </select>

            <label className="block text-sm font-semibold mt-2">State:</label>
            <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="w-full bg-zinc-600 p-1 border-2 border-gray-400 outline-none rounded-md mt-1">
            <option value="">All</option>
              {data.states.length > 0 ? (
                data.states.map((m) => (
                  <option key={m.state} value={m.state}>{m.state}</option>
                ))
              ) : (<option value='No state'>No state</option>)}
            </select>

            <label className="block text-sm font-semibold mt-2">District:</label>
            <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="w-full bg-zinc-600 p-1 border-2 border-gray-400 outline-none rounded-md mt-1">
              <option value="">All</option>
              {data.states.map((m) => (
                m.state === selectedState && ( 
                  m.districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))
                )
              ))}
            </select>
          </div>
        )}

        {loading ? (
          <div className="py-10 flex justify-center items-center">
            <ClipLoader 
              color="#5ad356"
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <section className="flex flex-col items-center py-2 lg:py-10 gap-8">
            {filteredItems.length > 0 ? (
              [...filteredItems].reverse().map((item) => (
                <div key={item._id} className="border border-gray-500 rounded-lg w-[90%] lg:w-[40%] p-4 sm:p-6 flex flex-col bg-gray-800 hover:shadow-lg transition">

                  {/* Seller Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src={item.userDP} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h1 className="font-bold text-lg">{item.userName}</h1>
                      <p className="text-sm text-gray-300">{item.userAddress}</p>
                      <div className="text-[12px] text-green-500 font-bold">Added : {new Date(parseInt(item._id.substring(0,8),16)*1000).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <hr className="my-4 border-gray-600" />

                  {/* Product Details */}
                  <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between lg:gap-0 lg:items-center">
                    <div className="flex flex-col items-start pl-2 lg:pl-10">
                      <h2 className="font-semibold text-xl">{item.firstField}</h2>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                      <div className="border-2 border-gray-400 rounded-md my-2">
                        <p className="font-bold text-green-400 px-4 py-2">{item.price}</p>
                      </div>
                      {item.quantity && (<div className="text-gray-400 text-sm"><span className="font-bold">Quantity : </span>{item.quantity}</div>)}
                      <p className="text-gray-200 "><span className="text-gray-400 font-bold">Address : </span>{item.place}, {item.district}, {item.state}</p>
                    </div>
                    <div className="lg:w-48 h-36 flex-shrink-0 overflow-hidden rounded-lg bg-gray-600 flex justify-center items-center">
                      <img src={item.image} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="mt-4 px-6 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition"
                    onClick={() => {
                      if(cookies.get('token')){
                        cookies.set('itemId', item._id)
                        cookies.set('category', category)
                        navigate(`/showItem`)
                      }
                      else{
                        toast.warn("login to see Item"),{
                          autoClose: 1500,
                          position: 'bottom-right',
                          closeOnClick: true,
                          pauseOnHover: false,
                          theme: 'colored'
                        }
                      }
                    }}  
                  >
                    Interested
                  </button>
                </div>
              ))
            ) : (<div>No Item available</div>) }
          </section>
        )}
      </main>
      
      {/* For Adding new material */}
      <div
          className="fixed bottom-8 right-8 w-14 h-14 bg-green-500 text-white rounded-full flex justify-center items-center cursor-pointer hover:bg-green-600 transition"
          onClick={() => {
            if(!cookies.get('token')){
              toast.warn("login to add Item!",{
                autoClose: 2000,
                position: 'bottom-right',
                closeOnClick: true,
                pauseOnHover: false,
                theme: 'colored'
              })
            }
            else{
              setIsSliderOpen(!isSliderOpen)
            }
          }}
          title="Add Item"
        >
          <AiOutlinePlus size={24} className={`${isSliderOpen ? 'rotate-45' : '' } duration-200`} />

          {/* Slider */}
          {isSliderOpen && (
            <div
              className="absolute bottom-0 left-0 w-16 h-44 bg-gray-800 text-white rounded-lg flex flex-col flex-nowrap items-center py-2 gap-2 shadow-lg overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600"
              style={{ transform: "translateY(-100%)" }}
            >
              {addItem.map((item) => (
                <div 
                key={item.title} 
                className="w-10 h-10 overflow-hidden flex justify-center items-center flex-shrink-0 rounded-full hover:bg-green-500 cursor-pointer" 
                title={item.title}
                onClick={() => {
                  navigate(`/add/${item.name}`)
                }}
                >
                  {item.icon}
                </div>
              ))}
            </div>
          )}

        </div>
    <ToastContainer />
    </div>
  );
}

export default HomePage;