import { Link, NavLink } from "react-router";
import Logo from '../assets/logo.svg'
export default function NavBar() {
    return (
        <header className="w-full bg-white shadow-md py-4 sticky z-100 top-0">
        <nav className="w-11/12 mx-auto flex items-center justify-between text-sm font-medium">
            <Link to='/' className="flex items-end">
                <img src={Logo} alt="logo" className="h-9 w-auto" />
                <span className="font-bold text-2xl">InfraCare</span>
            </Link>
            <div className="space-x-2">
                <NavLink className="trns hover:text-gray-600" to='/'>Home</NavLink>
                <NavLink className="trns hover:text-gray-600" to='/all-issues'>All Issues</NavLink>
            </div>
            <div className="space-x-2">
                <NavLink className="trns hover:text-gray-600" to='/register'>Register</NavLink>
                <NavLink className="trns hover:text-gray-600" to='/login'>Login</NavLink>
            </div>
        </nav>
        </header>
    )
}