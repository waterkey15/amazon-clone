import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC2B8HNKF3E7gBhCbUKy7GEhTrm_O7XIa8",
    authDomain: "clone-github-5a1c7.firebaseapp.com",
    projectId: "clone-github-5a1c7",
    storageBucket: "clone-github-5a1c7.appspot.com",
    messagingSenderId: "728648486195",
    appId: "1:728648486195:web:dd91b8aeb1a3e982198246",
    measurementId: "${config.measurementId}"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  

  export { db, auth };