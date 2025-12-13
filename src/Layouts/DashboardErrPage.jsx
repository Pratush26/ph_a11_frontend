import { Link, useRouteError } from "react-router";
import Logo from '../assets/logo.svg'
import Footer from "../Shared/Footer";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineMenu } from "react-icons/hi";
import { useState } from "react";
import SideBar from "../Shared/SideBar";
import Error from "../Shared/Error";

export default function DashboardErrorPage() {
    const [menuOpened, setMenuOpened] = useState(false)
    const { message } = useRouteError()
    return (
        <div className="flex flex-col items-center justify-between min-h-screen">
            <header className="w-full bg-white shadow-md py-4 sticky z-100 top-0">
                <div className="w-11/12 mx-auto flex items-center justify-between gap-4">
                    <button className="text-xl" onClick={() => setMenuOpened(!menuOpened)}>{menuOpened ? <RxCross2 /> : <HiOutlineMenu />}</button>
                    <Link to='/' className="flex items-end">
                        <img src={Logo} alt="logo" className="h-9 w-auto" />
                        <span className="font-bold text-2xl">InfraCare</span>
                    </Link>
                </div>
            </header>
            <div className="relative w-full min-h-[90vh]">
                <SideBar menuOpened={menuOpened} />
                <Error msg={message} />
            </div>
            <Footer />
        </div>
    )
}