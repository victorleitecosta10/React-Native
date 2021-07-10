import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyBpGaziKF1RO8JGaeB0_O3Z0m7ZfYwultM",
    authDomain: "meuapp-2fd1e.firebaseapp.com",
    databaseURL: "https://meuapp-2fd1e-default-rtdb.firebaseio.com",
    projectId: "meuapp-2fd1e",
    storageBucket: "meuapp-2fd1e.appspot.com",
    messagingSenderId: "938051507070",
    appId: "1:938051507070:web:0f180b689d977901c2992f",
    measurementId: "G-MCJ8BXD09H"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
