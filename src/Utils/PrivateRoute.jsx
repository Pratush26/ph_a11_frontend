import { useContext } from "react"
import { UserContext } from "../Context/AuthContext"
import { Navigate } from "react-router";
import Loader from "../Shared/Loader";
import { showToast } from "./ShowToast";

export default function PrivateRoute({ children, permitTo }) {
    const { userInfo, loading, signOutUser } = useContext(UserContext)
    if (loading) {
        return (
            <div className='min-h-[90vh] w-fit mx-auto flex items-center justify-center col-span-4'>
                <Loader />
            </div>
        )
    }
    if (userInfo?.role !== permitTo) {
        showToast({ type: "error", msg: "Forbidden Access!" });
        signOutUser();
        return <Navigate to="/" />
    }
    else return children;
}