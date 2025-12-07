import { useState } from "react"
import AddStaffForm from "../../../Components/AddStaff"

export default function ManageStaffsPage() {
    const [isModalOpened, setIsModalOpened] = useState(false)
    return (
        <main className="relative w-11/12 mx-auto min-h-screen">
            <h1 className="text-4xl my-8 font-semibold text-center">Manage Staffs</h1>
            {isModalOpened && <AddStaffForm setIsModalOpened={setIsModalOpened} />}
            <div className="flex w-full justify-between items-center gap-4">
                <p>Total Staff</p>
                <button onClick={() => setIsModalOpened(true)} className="btn btn-primary trns shadow-md/30">Add Staff</button>
            </div>
        </main>
    )
}