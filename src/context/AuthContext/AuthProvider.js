import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, deleteUser, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { createContext } from 'react';
import app from '../../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleAuthProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleAuthProvider);
    }

    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [])

    const logout = () => {
        setLoading(true);
        // localStorage.removeItem('genius-token')
        return signOut(auth)
    }
    const userDelete = () => {
        return deleteUser(auth.currentUser);
    }

    const authInfo = {
        user,
        loading,
        createUser,
        login,
        googleLogin,
        updateUser,
        logout,
        userDelete

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;