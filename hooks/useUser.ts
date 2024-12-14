import { userT } from "@/types/schemas";
import { functions, getAuthStatus, getMyInfo, getUsers, logIn, logOut } from "@/utils/appwrite";
import { useEffect, useState } from "react";

export default function useUser(){
    const [user, setUser] = useState<userT|undefined>(undefined)
    const [users, setUsers] = useState<userT[]>([])
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    function editMyInfo(user:userT){
        setUser(prev=>{
            if(prev?.isAdmin){
                user.isAdmin = true
            }
            return user
        })
    }
    async function authenticateUser(email: string, password:string) {  
       try {
           await logIn(email, password)
                setIsAuthenticated(true)
       } catch (error) {
        console.log(error);
        
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
    
    function addNewUser(user:userT) {
        setUsers(prev=>[user, ...prev])
    }
    function editUser(user:userT) {
        setUsers(prev=>prev.map(item=>{
            if (item.$id === user.$id) {
                return user
            }
            return item
        }))
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
    console.log({user, isAuthenticated});
    
    },[isAuthenticated])

    useEffect(()=>{
        if (user && user.isAdmin) {
            getUsers().then((res) => {
                setUsers(res);
              })
        }
    },[user])
    return {
        user, isAuthenticated, users, editMyInfo, deAuthenticateUser, authenticateUser, addNewUser, editUser
    }
}

export type useUserT = ReturnType<typeof useUser>

