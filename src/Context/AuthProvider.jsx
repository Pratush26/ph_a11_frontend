import { useContext } from "react";
import { AuthContext, UserContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

export default function AuthProvider({ children }) {
    const {user, loading, auth, signOutUser} = useContext(UserContext);
    const googleProvider = new GoogleAuthProvider();
    const updateUser = (name, photoUrl) => updateProfile(auth.currentUser, { displayName: name, photoURL: photoUrl })
    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    const sigInUser = (email, password) => signInWithEmailAndPassword(auth, email, password)
    const googleSignIn = () => signInWithPopup(auth, googleProvider)

    return (
        <AuthContext.Provider value={{ user, loading, createUser, updateUser, sigInUser, signOutUser, googleSignIn }}>
            {children}
        </AuthContext.Provider>
    )
}