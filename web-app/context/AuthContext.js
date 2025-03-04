'use client'
import React, {useContext, useState, useEffect} from 'react'
import {auth, db} from '@/firebase'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { getDoc } from 'firebase/firestore'

const AuthContext=React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    
    const [currentUser, setCurrentUser] = useState(null)
    const [userDataObj, setUserDataobj] = useState(null)
    const [loading, setLoading] = useState(true)

    function signup(email, password){
        return createUserWithEmailAndPassword(auth,email,password)
    }

    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }

    function logout(){
        setuserDataob(null)
        setCurrentUser(null)
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,async user => {
            try{
                setLoading(true)
                setCurrentUser(user)
                if (!user){
                    console.log('no user found')
                    return
                }
                
                console.log('Fetching user data')
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                let firebaseData = {}
                if(docSnap.exists()){
                    console.log('Found user data')
                    firebaseData= docSnap.data()
                }
                setUserDataobj(firebaseData)
            } catch(err){
                console.log(err.message)
            } finally{
                setLoading(false)
            }
        })
        return unsubscribe        
    }, [])

    const value={
        currentUser,
        userDataObj,
        signup,
        logout,
        login,
        loading
    }
    
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}