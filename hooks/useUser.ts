import { userT } from "@/types/schemas";
import { getAuthStatus, getMyInfo, getUsers, logIn, logOut } from "@/utils/appwrite";
import { useEffect, useState } from "react";

export default function useUser(){
    const [user, setUser] = useState<userT|undefined>(undefined)
    const [users, setUsers] = useState<userT[]>([])
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

    useEffect(()=>{
        if (user && user.isAdmin) {
            getUsers().then((res) => {
                setUsers(res);
              })
        }
    },[user])
    return {
        user, isAuthenticated, deAuthenticateUser, authenticateUser, users
    }
}


