import { Link } from "react-router";
import Logo from '../assets/logo.svg'
import Footer from "../Shared/Footer";
import { HiOutlineMenu } from "react-icons/hi";
import Loader from "../Shared/Loader";

export default function DashboardLoding() {
    return (
        <div className="flex flex-col items-center justify-between min-h-screen">
            <header className="w-full bg-white shadow-md py-4 sticky z-100 top-0">
                <div className="w-11/12 mx-auto flex items-center justify-between gap-4">
                    <HiOutlineMenu />
                    <Link to='/' className="flex items-end">
                        <img src={Logo} alt="logo" className="h-9 w-auto" />
                        <span className="font-bold text-2xl">InfraCare</span>
                    </Link>
                </div>
            </header>
            <div className="flex items-center justify-center w-full min-h-[90vh]">
                <Loader />
            </div>
            <Footer />
        </div>
    )
}