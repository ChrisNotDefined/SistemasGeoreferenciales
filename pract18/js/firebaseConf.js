// Configure application
var firebaseConfig = {
  apiKey: "AIzaSyBiwD6I6ZZ2WBZfsoZuLREPyKWyXWAlp6w",
  authDomain: "practicasisgeo.firebaseapp.com",
  projectId: "practicasisgeo",
  storageBucket: "practicasisgeo.appspot.com",
  messagingSenderId: "254661227381",
  appId: "1:254661227381:web:ca6f74254391b2b4c9593c",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();