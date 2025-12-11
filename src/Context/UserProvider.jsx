import { useEffect, useState } from "react";
import { UserContext } from "./AuthContext";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import axios from "axios";

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    const signOutUser = () => signOut(auth)
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setLoading(true);

      if (u) {
        setUser(u);

        try {
          const res = await axios.get(
            `${import.meta.env.VITE_SERVER}/userInfo`,
            {
              headers: {
                authorization: `Bearer ${u.accessToken}`,
              },
            }
          );
          setUserInfo(res.data);
        } catch (error) {
          console.error("User Info Error:", error);
          setUserInfo(null);
        }
      } else {
        setUser(null);
        setUserInfo(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

    return (
        <UserContext.Provider value={{ user, userInfo, loading, auth, signOutUser }}>
            {children}
        </UserContext.Provider>
    )
}