import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



// import { getAnalytics } from 'firebase/analytics';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCXFUXzTqGfRUA7cKHyIEJpDokyv4JNNLo",
  authDomain: "ry-dev-c22ea.firebaseapp.com",
  projectId: "ry-dev-c22ea",
  storageBucket: "ry-dev-c22ea.appspot.com",
  messagingSenderId: "585931856923",
  appId: "1:585931856923:web:8346d4442a599fb4336cbe",
  measurementId: "G-QZRJ2GTS00"
};

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// // const auth = getAuth(app)


const googleSignIn = () => {
  let provider = new GoogleAuthProvider(app)
  signInWithPopup(auth, provider)
    .then((re) => {
      console.log(re);
    })
    .catch((err) => alert(err.message));
};


export {googleSignIn}

