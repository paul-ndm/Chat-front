import React, { useContext, useState, useEffect } from "react"
import { auth, googleProvider} from "../firebase/firebase"
import {checkAccount, getUsers} from '../utils/api'

import { useContacts } from './contactState'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthState({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState()
  const [allUsers, setAllUsers] = useState()
  const { setContacts } = useContacts()

  function signup(email, password) {
    console.log(email, password)
    const newUser = auth.createUserWithEmailAndPassword(email, password)
    .catch(e=> console.log(e.code))
    return newUser

  }

  const googleSignIn = () => auth.signInWithPopup(googleProvider)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])
// get all users from firestore
  useEffect(()=> {

    (async() => {const allUsersData = await getUsers()
    setAllUsers(allUsersData)})()

  },[])

// getting user-contacts
  useEffect( ()=> {
  if(currentUser) {

   (async()=>{const userData = await checkAccount(currentUser)
   setUserData(userData)
   console.log('loading contacts: ', userData.contacts)
   const userContacts = userData.contacts
    setContacts(userContacts)})()
  }
},[currentUser])

  //not in use yet
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  const value = {
    currentUser,
    allUsers,
    googleSignIn,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}