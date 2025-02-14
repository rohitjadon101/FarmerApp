import React from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./components/Home";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import AddMachine from "./addItems/AddMachine";
import AddCrop from "./addItems/AddCrop";
import AddAnimal from "./addItems/AddAnimal";
import AddField from "./addItems/AddField";
import ShowItem from "./addItems/ShowItem";
import EditAccount from "./components/EditAccount";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editAccount" element={<EditAccount />} />

        <Route path="/add/machine" element={<AddMachine />} />
        <Route path="/add/crop" element={<AddCrop />} />
        <Route path="/add/animal" element={<AddAnimal />} />
        <Route path="/add/field" element={<AddField />} />
        <Route path="/showItem" element={<ShowItem />} />
      </Routes>
    </Router>
  )
}

export default App;