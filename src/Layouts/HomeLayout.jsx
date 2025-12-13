import { Outlet, useLocation } from "react-router";
import NavBar from "../Shared/NavBar";
import Footer from "../Shared/Footer";
import { useEffect } from "react";

export default function HomeLayout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [pathname]);
    return (
        <div className="flex flex-col items-center justify-between min-h-screen">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}