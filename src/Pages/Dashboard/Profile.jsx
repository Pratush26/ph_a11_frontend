import { useContext } from "react"
import { UserContext } from "../../Context/AuthContext"
import { RiPoliceBadgeLine } from "react-icons/ri"

export default function Profile() {
    const { userInfo, signOutUser } = useContext(UserContext)
    return (
        <main className="w-11/12 flex flex-col items-center justify-center gap-6 min-h-[70vh] mx-auto my-10">
            <section className="flex items-center justify-center gap-4">
                <div className="space-y-3">
                    <img src={userInfo.photo} alt="user image" className="h-24 w-24 object-cover rounded-full" />
                    <p className={`px-4 py-2 text-sm rounded-full ${userInfo.blocked ? "bg-rose-600" : "bg-blue-600"} text-white font-medium flex flex-col items-center`}>{userInfo.blocked ? "Blocked" : userInfo.role} {userInfo.premium && <RiPoliceBadgeLine className="text-base" />}</p>
                </div>
                <div className="space-y-1">
                    <h5 className="text-2xl font-semibold">{userInfo.name}</h5>
                    <p>Contact: {userInfo.phone}</p>
                    <p>NID: {userInfo.nid}</p>
                    <p>Email: {userInfo.email}</p>
                </div>
            </section>
            <div className="flex justify-center gap-4">
                <button className="btn rounded-md btn-primary trns">Change password</button>
                <button className="btn rounded-md btn-primary trns">Update name</button>
                <button onClick={signOutUser} className="btn rounded-md btn-out trns">Log out</button>
            </div>
        </main>
    )
}