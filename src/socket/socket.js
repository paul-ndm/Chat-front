import io from 'socket.io-client'

const URL = 'http://localhost:5000'
const webURL = 'https://eventchating.herokuapp.com'
export const socket = io(webURL);



 

