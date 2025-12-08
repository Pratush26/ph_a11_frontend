import { useContext } from "react";
import { FaRegUser, FaUserNurse } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { TbLogout2, TbMessageReportFilled } from "react-icons/tb";
import { NavLink } from "react-router";
import { UserContext } from "../Context/AuthContext";

export default function SideBar({ menuOpened }) {
    const { user, signOutUser } = useContext(UserContext)
    return (
        <aside className={`${menuOpened ? "translate-x-0" : "-translate-x-full"} z-80 flex flex-col gap-3 trns absolute top-0 left-0 bg-white text-sm font-medium p-4 h-full rounded-br-lg shadow-lg/20`}>
            <div className="flex items-center gap-2 font-medium">
                <img src={user?.photoURL} alt="user profile picture" className="h-8 aspect-square object-cover rounded-full" />
                <span>
                    <p>{user?.displayName}</p>
                    <p className="text-xs">{user?.email}</p>
                </span>
            </div>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/dashboard'><GrOverview /> Dashboard</NavLink>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/manage-users'><FaRegUser /> Manage Users</NavLink>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/manage-staffs'><FaUserNurse />Manage Staffs</NavLink>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/report-issue'><TbMessageReportFilled />Report Issue</NavLink>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/my-issues'><TbMessageReportFilled />My Issues</NavLink>
            <button onClick={() => signOutUser()} className="flex items-center gap-2 w-full py-1.5 px-3 rounded-sm trns hover:bg-gray-200 cursor-pointer"><TbLogout2 /> Log out</button>
        </aside>
    )
}