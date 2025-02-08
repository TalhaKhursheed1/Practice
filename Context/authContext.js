// /* eslint-disable no-unused-vars */
// import { createContext, useContext, useEffect, useState } from 'react';
// import { auth } from '../firebaseConfig';
// import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
// import { doc,getDoc,setDoc } from 'firebase/firestore';


// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(undefined);


//     useEffect(() => {
//         const unsub = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 setIsAuthenticated(true);
//                 setUser(user);
//             }
//             else{
//                 setIsAuthenticated(false);
//                 setUser(null);
//             }
//         });
//         return unsub;
//     }, []);

//     const login = async (email, password) => {
//         try {

//         }
//         catch (error) {
//             console.error(error);
//         }
//     };
//     const signUp = async (email, password, username, profileUrl) => {
//         try {
//             const response = await createUserWithEmailAndPassword(auth, email, password);
//             console.log('signUp', response?.user);
            
//          await addDoc

//         }
//         catch (error) {
//             console.error(error);
//         }
//     };
//     const logOut = async () => {
//         try {

//         }
//         catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         // eslint-disable-next-line react/react-in-jsx-scope
//         <AuthContext.Provider value={{ user, isAuthenticated, login, signUp, logOut }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const value = useContext(AuthContext);

//     if (!value) {
//         throw new Error('useAuth must be used within an AuthContextProvider');
//     };
//     return value;
// };



// authContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
// import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined); // undefined initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const user = await AsyncStorage.getItem('user'); // Check for stored user data
        setIsAuthenticated(!!user); // Set authentication status based on presence of user data
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = async (user) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
