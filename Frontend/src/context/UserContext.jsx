import React, {createContext, useState, useEffect} from "react"
import Cookies from "universal-cookie"

const cookies = new Cookies();
export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(cookies.get("user") || null);
    
    useEffect(() => {
        if(user){
            cookies.set("user", user, {path: "/"});
        }else{
            cookies.remove("user", {path: "/"});
        }
    },[user]);

    useEffect(() => {
        const storedUser = cookies.get("user");
        if(storedUser && !user){
            setUser(storedUser)
        }
    },[]);

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}