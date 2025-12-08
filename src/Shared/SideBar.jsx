import { FaRegUser, FaUserNurse } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { TbMessageReportFilled } from "react-icons/tb";
import { NavLink } from "react-router";

export default function SideBar({menuOpened}) {
    return (
        <aside className={`${menuOpened? "translate-x-0" : "-translate-x-full"} z-80 flex flex-col gap-3 trns absolute top-0 left-0 bg-white text-sm font-medium p-4 h-full rounded-br-lg shadow-lg/20`}>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/dashboard'><GrOverview /> Dashboard</NavLink>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/manage-users'><FaRegUser /> Manage Users</NavLink>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/manage-staffs'><FaUserNurse />Manage Staffs</NavLink>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/report-issue'><TbMessageReportFilled />Report Issue</NavLink>
            <NavLink className="trns sideLink flex gap-2 items-center" to='/my-issues'><TbMessageReportFilled />My Issues</NavLink>
        </aside>
    )
}