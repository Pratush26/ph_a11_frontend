import Footer from "../Shared/Footer"
import Loader from "../Shared/Loader"
import NavBar from "../Shared/NavBar"

export default function LoadingUi() {
    return (
        <div className='flex w-full flex-col min-h-screen gap-2 items-center justify-between'>
            <NavBar />
            <Loader />
            <Footer />
        </div>
    )
}