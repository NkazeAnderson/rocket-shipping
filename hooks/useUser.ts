import { userT } from "@/types/schemas";
import { getAuthStatus, getMyInfo, logIn, logOut } from "@/utils/appwrite";
import { useEffect, useState } from "react";

export default function useUser(){
    const [user, setUser] = useState<userT|undefined>(undefined)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    async function authenticateUser(email: string, password:string) {  
       try {
           await logIn(email, password)
                setIsAuthenticated(true)
       } catch (error) {
           setIsAuthenticated(false)
           throw new Error("Invalid Credentials");
       } 
    }
    async function deAuthenticateUser() {  
       try {
           await logOut()
                setIsAuthenticated(false)
       } catch (error) {
           throw new Error("Not Logged In");
       } 
    }
    
    useEffect(()=>{
        !isAuthenticated && getAuthStatus().then(res=>{
            res && setIsAuthenticated(true)
        })
    },[])
    
    useEffect(()=>{
    isAuthenticated?  getMyInfo().then(res=>{
        setUser(res)
    }).catch(e=>console.log(e)
    ) :  setUser(undefined)
    },[isAuthenticated])
    return {
        user, isAuthenticated, deAuthenticateUser, authenticateUser
    }
}


