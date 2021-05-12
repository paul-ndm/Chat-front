import { fireBase, db } from "../firebase/firebase"
import { URL } from "../socket/socket"


export const checkAccount = (currentUser) => {
  const docName = currentUser.displayName + ' '+ currentUser.uid
  return db.collection('user-info').doc(docName).get().then((doc)=> {
    if (doc.exists) {
        return doc.data()
    } else {
        const newUser = db.collection('user-info').doc(docName).set({
          userId: currentUser.uid,
          name: currentUser.displayName,
          contacts: []
        })
        return newUser
    }
}).catch((error) => {console.log("Error getting user-info:", error)})
}

export const updatePrivateChat = (currentUser, contacts) => {
  const docName = currentUser.displayName + ' '+ currentUser.uid
  db.collection("user-info").doc(docName).update({
    contacts: contacts //fireBase.firestore.FieldValue.arrayUnion(contacts)
}).then(() => {console.log("private chat updated");
}).catch((error) => {console.error("Error updating privat chat: ", error);
});
}

export const getUsers = async () => {
  const snapshot = await fireBase.firestore().collection('user-info').get()
  return snapshot.docs.map(doc => doc.data());
}

export const addContact = async (currentUser, selectedUser) => {
  const docName = currentUser.displayName + ' '+ currentUser.uid
  await db.collection("user-info").doc(docName).update({
    contacts: fireBase.firestore.FieldValue.arrayUnion(selectedUser)
  })

}

export const deleteContactInDb = async (currentUser, contact) => {
  const docName = currentUser.displayName + ' '+ currentUser.uid
  console.log(contact)
  await db.collection("user-info").doc(docName).update({
    contacts: fireBase.firestore.FieldValue.arrayRemove(contact)
  })

}

export const getEventsForUser = async (userId) => {
    try {
      console.log('getting events for:', userId)
      const res = await fetch(`${URL}/events/${userId}`)
      const data = await res.json()
      console.log('found events: ', data)
      return data
    } catch (err) {
      console.log(err)
  }}

  export const leaveEvent = async (userId, userName, eventId) => {
    const data = {userId, userName, eventId}

    const options = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }
  
      try {
        const res = await fetch(`${URL}/events`, options)
        const data = await res.json()
        return data.results
      } catch (err) {
        console.log(err)
    }}

  // not in use
export const getAllEvents = async () => {
  try {
    const res = await fetch(`${URL}/events`)
    const data = await res.json()
    return data.results
  } catch (err) {
    console.log(err)
}}
