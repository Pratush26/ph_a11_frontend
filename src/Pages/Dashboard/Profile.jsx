import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { RiPoliceBadgeLine } from "react-icons/ri"
import UpdateUserName from "../../Components/UpdateUserName"
import UpdateProfilePic from "../../Components/UpdateProfilePic"
import SubscribeButton from "../../Components/SubscribeButton"

export default function Profile() {
    const { userInfo, signOutUser, resetPassword } = useContext(AuthContext)
    return (
        <main className="w-11/12 flex flex-col items-center justify-center gap-6 min-h-[70vh] mx-auto my-10">
            <section className="flex items-center justify-center gap-4">
                <div className="space-y-3">
                    <div className="flex justify-end items-baseline">
                        <UpdateProfilePic />
                    <img src={userInfo.photo} alt="user image" className="h-24 w-24 object-cover rounded-full" />
                    </div>
                    <span
                        title={`${userInfo.blocked ? "Contact with the Authority" : userInfo?.role}`}
                        className={`px-4 py-2 text-sm rounded-full ${userInfo.blocked ? "bg-rose-600" : "bg-blue-600"} text-white font-semibold flex flex-col items-center cursor-pointer`}
                    >
                        {userInfo.blocked ? "Blocked" : userInfo.role}
                        {userInfo.premium && <RiPoliceBadgeLine className="text-base" />}
                    </span>
                </div>
                <div className="space-y-1">
                    <h5 className="text-2xl font-semibold">{userInfo.name}</h5>
                    <p>Contact: {userInfo.phone}</p>
                    <p>NID: {userInfo.nid}</p>
                    <p>Email: {userInfo.email}</p>
                </div>
            </section>
            <div className="flex justify-center gap-4">
                <button onClick={() => resetPassword(userInfo?.email)} className="btn rounded-md btn-primary trns">Change password</button>
                <UpdateUserName />
            </div>
            <div className="flex justify-center gap-4">
                {!userInfo?.premium && <SubscribeButton premium={userInfo?.premium} />}
                <button onClick={signOutUser} className="btn rounded-md btn-out trns">Log out</button>
            </div>
        </main>
    )
}