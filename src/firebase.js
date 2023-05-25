// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAKRIMszNEBS34DIysvVre8Qd5ad6zo3OM',
  authDomain: 'ux-design-master-53e54.firebaseapp.com',
  projectId: 'ux-design-master-53e54',
  storageBucket: 'ux-design-master-53e54.appspot.com',
  messagingSenderId: '849550703164',
  appId: '1:849550703164:web:0bf6418b28542657f8e139',
  measurementId: 'G-574KVM1LNX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
export {auth,db,storage,analytics}
