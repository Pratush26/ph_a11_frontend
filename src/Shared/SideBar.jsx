import { NavLink } from "react-router";

export default function SideBar({menuOpened}) {
    return (
        <aside className={`${menuOpened? "translate-x-0" : "-translate-x-full"} z-80 flex flex-col gap-3 trns absolute top-0 left-0 bg-white text-sm font-medium p-4 h-full rounded-br-lg shadow-lg/20`}>
            <NavLink className="trns sideLink" to='/dashboard'>Dashboard</NavLink>
            <NavLink className="trns sideLink" to='/manage-users'>Manage Users</NavLink>
            <NavLink className="trns sideLink" to='/manage-staffs'>Manage Staffs</NavLink>
        </aside>
    )
}