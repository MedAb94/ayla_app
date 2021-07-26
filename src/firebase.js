import firebaseG from 'firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyCCFcaEsqgwA1wQboPRIYA5HIizjcSRYSs",
    authDomain: "ayla-320e8.firebaseapp.com",
    projectId: "ayla-320e8",
    storageBucket: "ayla-320e8.appspot.com",
    messagingSenderId: "836743845749",
    appId: "1:836743845749:web:6b5174f01cd27d55de653c",
    measurementId: "G-2SYJ0HZZXB"
}
const fbApp = firebase.initializeApp(firebaseConfig)
const auth = fbApp.auth()
const db = fbApp.database()
const firestore = firebaseG.firestore()
const storage = firebaseG.storage()
const fb = {
    auth,
    db,
    firestore,
    storage
}
export default fb
