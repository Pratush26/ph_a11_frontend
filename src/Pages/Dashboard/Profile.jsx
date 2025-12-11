import { useContext } from "react"
import { UserContext } from "../../Context/AuthContext"

export default function Profile() {
    const { userInfo } = useContext(UserContext)
    return (
        <main className="w-11/12 mx-auto my-10">
            <section className="min-h-[70vh] flex flex-col items-center justify-center gap-2">
                <img src={userInfo.photo} alt="user image" className="h-24 w-24 object-cover rounded-full" />
                <p className="px-4 py-2 text-sm rounded-full bg-blue-600 text-white font-medium">{userInfo.role}</p>
                <h5 className="text-2xl font-semibold">{userInfo.name}</h5>
                <p>{userInfo.email}</p>
            </section>
        </main>
    )
}