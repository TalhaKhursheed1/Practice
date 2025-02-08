// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth, getReactNativePersistence, initializeAuth} from 'firebase/auth';
import {getFirestore, collection} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBVLmPcCreEyEvilDD7gfbaJs1G_H6GE_o',
  authDomain: 'task-ded11.firebaseapp.com',
  projectId: 'task-ded11',
  storageBucket: 'task-ded11.firebasestorage.app',
  messagingSenderId: '45186529845',
  appId: '1:45186529845:web:9b9f326b87910840fc8f7c',
  measurementId: 'G-JV7WJR1C33',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });

export const db = getFirestore(app);

export const userRef = collection(db , 'users');
export const roomRef = collection(db , 'rooms');
