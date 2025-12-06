import { Outlet } from "react-router";
import NavBar from "../Shared/NavBar";
import Footer from "../Shared/Footer";

export default function HomeLayout() {
    return (
        <div className="flex flex-col items-center justify-between min-h-screen">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}