import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDXCY9JGX_CFH8odtzH3C1trr9J0kVEugQ",
    authDomain: "ticket-back-nest.firebaseapp.com",
    projectId: "ticket-back-nest",
    storageBucket: "ticket-back-nest.appspot.com",
    messagingSenderId: "32548875194",
    appId: "1:32548875194:web:1d23a60c0335e33b7d0b83"
  };

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();