import { useContext } from "react";
import { FaRegUser, FaRegUserCircle, FaUserNurse } from "react-icons/fa";
import { GrOverview, GrStakeholder } from "react-icons/gr";
import { TbLogout2, TbMessageReportFilled } from "react-icons/tb";
import { NavLink } from "react-router";
import { UserContext } from "../Context/AuthContext";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { RiPoliceBadgeLine } from "react-icons/ri";
import Loader from "./Loader";
import SubscribeButton from "../Components/Button/SubscribeButton";
import ThemeBtn from "../Components/Button/themeBtn";

export default function SideBar({ menuOpened }) {
    const { userInfo, loading, signOutUser } = useContext(UserContext)
    return (
        <aside className={`${menuOpened ? "translate-x-0" : "-translate-x-full"} z-80 flex flex-col gap-3 trns absolute top-0 left-0 bg-(--bg-secondary) text-sm font-medium p-4 h-full rounded-br-lg shadow-lg/20`}>
            {
                loading ?
                    <Loader />
                    :
                    <div className="flex items-center gap-2 font-medium">
                        <img src={userInfo?.photo} alt="user profile picture" className="h-8 aspect-square object-cover rounded-full" />
                        {
                            userInfo?.premium ?
                                <span className="flex items-center gap-2 capitalize font-semibold">
                                    <p>{userInfo?.name}</p>
                                    <RiPoliceBadgeLine className="text-blue-700 text-base" />
                                </span>
                                :
                                <SubscribeButton premium={userInfo?.premium} />
                        }
                    </div>
            }
            <NavLink className="trns sideLink flex gap-2 items-center" to='/dashboard'><GrOverview /> Dashboard</NavLink>
            {
                userInfo?.role === "admin"
                &&
                <>
                    <NavLink className="trns sideLink flex gap-2 items-center" to='/manage-users'><FaRegUser /> Manage Users</NavLink>
                    <NavLink className="trns sideLink flex gap-2 items-center" to='/manage-staffs'><FaUserNurse />Manage Staffs</NavLink>
                    <NavLink className="trns sideLink flex gap-2 items-center" to='/assign-issues'><MdOutlineAssignmentTurnedIn />All Issues</NavLink>
                </>
            }
            {
                userInfo?.role === "staff"
                &&
                <NavLink className="trns sideLink flex gap-2 items-center" to='/assigned-issues'><GrStakeholder />Assigned Issues</NavLink>
            }
            {(userInfo?.role === "citizen" || userInfo?.role === "admin") && <NavLink className="trns sideLink flex gap-2 items-center" to='/transactions'><FaMoneyBillTransfer />Transactions</NavLink>}
            {
                userInfo?.role === "citizen"
                &&
                <>
                    <NavLink className="trns sideLink flex gap-2 items-center" to='/report-issue'><TbMessageReportFilled />Report Issue</NavLink>
                    <NavLink className="trns sideLink flex gap-2 items-center" to='/my-issues'><TbMessageReportFilled />My Issues</NavLink>
                </>
            }
            <NavLink className="trns sideLink flex gap-2 items-center" to='/profile'><FaRegUserCircle />Profile</NavLink>
            <ThemeBtn size={"full"} />
            <button onClick={() => signOutUser()} className="flex items-center gap-2 w-full py-1.5 px-3 rounded-md trns btn btn-out text-(--primary-700)"><TbLogout2 /> Log out</button>
        </aside>
    )
}