import { useRouteError } from "react-router"
import Footer from "../Shared/Footer"
import Error from "../Shared/Error"
import NavBar from "../Shared/NavBar"

export default function ErrorPage() {
    const {message} = useRouteError()
    return (
        <div className='flex flex-col w-full min-h-screen gap-2 items-center justify-between'>
            <NavBar />
            <Error msg={message} />
            <Footer />
        </div>
    )
}