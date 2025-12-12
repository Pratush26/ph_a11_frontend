import Footer from "../Shared/Footer";
import NavBar from "../Shared/NavBar";
import Img from '../assets/notFound.png'
import { Link } from "react-router";

export default function NotfoundPage() {
    return (
        <div className="flex flex-col items-center justify-between min-h-screen w-full">
            <NavBar />
            <main className="w-full flex flex-col items-center my-10 gap-4">
            <img src={Img} alt="page not found" className="w-3/4 mx-auto max-w-xs" />
            <p className="font-semibold">The page you are looking for is not found!</p>
            <Link to='/' className="btn btn-primary trns rounded-sm">Back to Home</Link>
            </main>
            <Footer />
        </div>
    )
}