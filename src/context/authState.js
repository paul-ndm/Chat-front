import React, { useContext, useState, useEffect } from "react"
import { fireBase, auth, googleProvider, db } from "../firebase/firebase"
import {checkAccount, createAccount, getUsers} from '../utils/api'
import { v4 as uuidV4 } from 'uuid'
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
  const { setContacts, selectedContactIndex } = useContacts()

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
  useEffect(async()=> {
    const allUsersData = await getUsers()
    setAllUsers(allUsersData)
  },[])

// getting user-data
  useEffect( async ()=> {
    if(currentUser) {
   const userData = await checkAccount(currentUser)
   setUserData(userData)
   console.log('contacts: ', userData.contacts)

   const userContacts = userData.contacts

   const contactsSelected = userContacts.map((contact, index) => {
    const { userId, name, messages } = contact
    const selected = index === selectedContactIndex
    const newContact = { userId, name, messages, selected}
    return newContact
  })
  setContacts(contactsSelected)
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