import { useContext } from "react"
import { UserContext } from "../Context/AuthContext"
import { Navigate, useLocation } from "react-router";
import Loader from "../Shared/Loader";
import { showToast } from "./ShowToast";

export default function AuthenticateRoute({ children }) {
    const { user, loading } = useContext(UserContext)
    const { pathname } = useLocation()
    if (loading) {
        return (
            <div className='min-h-[90vh] w-fit mx-auto flex items-center justify-center col-span-4'>
                <Loader />
            </div>
        )
    }
    if (!user) {
        showToast({ type: "warning", msg: "Login is required!" });
        return <Navigate state={pathname} to="/login" />
    }
    return children;
}