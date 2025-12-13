import { useContext } from "react";
import { AuthContext, UserContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

export default function AuthProvider({ children }) {
    const {user, userInfo, loading, auth, signOutUser} = useContext(UserContext);
    const googleProvider = new GoogleAuthProvider();
    const updateUser = (name, photoUrl) => updateProfile(auth.currentUser, { displayName: name, photoURL: photoUrl })
    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    const sigInUser = (email, password) => signInWithEmailAndPassword(auth, email, password)
    const googleSignIn = () => signInWithPopup(auth, googleProvider)
    const resetPassword = (email) => sendPasswordResetEmail(auth, email)

    return (
        <AuthContext.Provider value={{ user, userInfo, loading, createUser, updateUser, sigInUser, signOutUser, googleSignIn, resetPassword }}>
            {children}
        </AuthContext.Provider>
    )
}