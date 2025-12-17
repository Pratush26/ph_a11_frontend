import { Link } from 'react-router'
import Logo from '../assets/logo.svg'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { useContext } from 'react'
import { UserContext } from '../Context/AuthContext'

export default function Footer() {
    const { user } = useContext(UserContext)
    return (
        <footer className="text-sm bg-gray-300 w-full pt-8">
            <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start w-11/12 mx-auto'>
                <Link to='/' className="flex items-end">
                    <img src={Logo} alt="logo" className="h-9 w-auto" />
                    <span className="font-bold text-2xl">InfraCare</span>
                </Link>
                <div className='flex flex-col gap-3'>
                    <Link className='trns hover:text-gray-600' to='/'>Home</Link>
                    <Link className='trns hover:text-gray-600' to='/about'>About</Link>
                    <Link className='trns hover:text-gray-600' to='/contact'>Contact</Link>
                </div>
                <div className='flex flex-col gap-3'>
                    {
                        user ?
                        <>
                            <Link className='trns hover:text-gray-600' to='/dashboard'>Dashboard</Link>
                            <Link className='trns hover:text-gray-600' to='/profile'>Profile</Link>
                        </>
                            :
                            <>
                                <Link className='trns hover:text-gray-600' to='/register'>Register</Link>
                                <Link className='trns hover:text-gray-600' to='/login'>Login</Link>
                            </>
                    }
                    <Link className='trns hover:text-gray-600' to='/all-issues'>All Issues</Link>
                    <Link className='trns hover:text-gray-600' to='/terms'>Terms & Conditions</Link>
                </div>
                <div className='space-y-2 text-lg'>
                    <h6 className='font-semibold'>Social Links</h6>
                    <div className='flex gap-3'>
                        <a className='trns hover:text-gray-700' href="http://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                        <a className='trns hover:text-gray-700' href="http://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a className='trns hover:text-gray-700' href="http://twitter.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
                        <a className='trns hover:text-gray-700' href="http://whatsapp.com" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                    </div>
                </div>
            </section>
            <p className="m-4 text-xs text-gray-700 text-center mb-4">&copy; 2025 InfraCare | All rights are reserved.</p>
        </footer>
    )
}