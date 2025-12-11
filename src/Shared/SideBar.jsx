import { useContext } from "react";
import { FaRegUser, FaRegUserCircle, FaUserNurse } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { TbLogout2, TbMessageReportFilled } from "react-icons/tb";
import { NavLink } from "react-router";
import { UserContext } from "../Context/AuthContext";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { RiPoliceBadgeLine } from "react-icons/ri";
import Loader from "./Loader";
import { useAxios } from "../Hooks/UseAxios";
import Swal from "sweetalert2";
import { showToast } from "../Utils/ShowToast";

export default function SideBar({ menuOpened }) {
    const { userInfo, loading, signOutUser } = useContext(UserContext)
    const axis = useAxios()
    const handleSubscribe = async () => {
        try {
            Swal.fire({
                        title: `Do you want to explore our Premium Subscriptions?`,
                        text: "1000৳ payment required for Premium subscription!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Subscribe now!",
                        cancelButtonText: "Cancel"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axis.post("/premium-checkout-session").then(res => {
                                window.location.href = res.data.url
                            }).catch(err => {
                                showToast({ type: "error", message: err?.message || err || "Payment failed" })
                                console.error(err)
                            })
                        }
                    });
                } catch (error) {
                    console.error(error)
                    showToast({ type: "error", message: error?.message || "Payment failed" })
        }
    }
    return (
        <aside className={`${menuOpened ? "translate-x-0" : "-translate-x-full"} z-80 flex flex-col gap-3 trns absolute top-0 left-0 bg-white text-sm font-medium p-4 h-full rounded-br-lg shadow-lg/20`}>
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
                                <button onClick={handleSubscribe} disabled={userInfo.premium} className="btn btn-primary trns rounded-md">Subscribe</button>
                        }
                    </div>
            }
            <NavLink className="trns sideLink flex gap-2 items-center" to='/dashboard'><GrOverview /> Dashboard</NavLink>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/manage-users'><FaRegUser /> Manage Users</NavLink>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/manage-staffs'><FaUserNurse />Manage Staffs</NavLink>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/assign-issues'><MdOutlineAssignmentTurnedIn />Assign Issues</NavLink>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/transactions'><FaMoneyBillTransfer />Transactions</NavLink>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/report-issue'><TbMessageReportFilled />Report Issue</NavLink>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/my-issues'><TbMessageReportFilled />My Issues</NavLink>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/profile'><FaRegUserCircle />Profile</NavLink>
            <button onClick={() => signOutUser()} className="flex items-center gap-2 w-full py-1.5 px-3 rounded-sm trns hover:bg-gray-200 cursor-pointer"><TbLogout2 /> Log out</button>
        </aside>
    )
}