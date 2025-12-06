import { Link } from "react-router";
import Img from "../assets/error.png"

export default function Error({msg}) {
    return (
        <div className="flex flex-col gap-3 items-center mx-auto w-3/4 text-center my-6">
            <img src={Img} alt="error image" className="w-3/4 h-auto max-w-3xs" />
            <p className="text-rose-600 font-bold animate-bounce">{msg}</p>
            <Link to='/' className="btn btn-primary shadow-md/30 rounded-sm trns" >Go Back to Home</Link>
        </div>
    )
}