import { useState } from "react"
import AddStaffForm from "../../../Components/AddStaff"
import { useAxios } from "../../../Hooks/UseAxios"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../../Shared/Loader"
import Error from "../../../Shared/Error"
import '../../../Utils/table.css'

export default function ManageStaffsPage() {
    const [isModalOpened, setIsModalOpened] = useState(false)
    const axis = useAxios()
    const { data: staffsData, isLoading, error: dataError } = useQuery({
        queryKey: ['staffs'],
        queryFn: () => axis('/users?role=staff').then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
    if (isLoading) return (
        <div className="flex w-full min-h-[90vh] items-center justify-center">
            <Loader />
        </div>
    )
    if (dataError) return <Error msg={dataError.message} />;
    console.log(staffsData)
    return (
        <main className="relative w-11/12 mx-auto min-h-screen">
            <h1 className="text-4xl my-8 font-semibold text-center">Manage Staffs</h1>
            {isModalOpened && <AddStaffForm setIsModalOpened={setIsModalOpened} />}
            <div className="flex w-full justify-between items-center gap-4">
                <p>Total Staff ({staffsData.length})</p>
                <button onClick={() => setIsModalOpened(true)} className="btn btn-primary trns shadow-md/30 rounded-md">Add Staff</button>
            </div>
            <table className="table-auto text-center text-sm font-medium border-collapse w-full sm:w-11/12 mx-auto overflow-hidden my-6">
                <thead>
                    <tr>
                        <th className="hidden sm:table-cell">SL no.</th>
                        <th>Staff Info</th>
                        <th>Phone</th>
                        <th className="hidden sm:table-cell">Address</th>
                        <th className="hidden sm:table-cell">NID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-800">
                    {
                        staffsData?.map((e, i) => (
                            <tr key={i} className="border border-gray-300 bg-white">
                                <td className="hidden sm:table-cell">{i + 1}</td>
                                <td>
                                    <div className="flex items-center text-start gap-2">
                                        <img src={e.photo} alt="staff photo" className="h-10 aspect-square object-cover rounded-full" />
                                        <span>
                                            <p>{e.name}</p>
                                            <p className="text-xs">{e.email}</p>
                                        </span>
                                    </div>
                                </td>
                                <td>{e.phone}</td>
                                <td className="text-xs">{e.address}</td>
                                <td className="text-xs">{e.nid}</td>
                                <td>
                                    <div className="flex gap-2 justify-center">
                                        <button disabled={e.blocked} className={`${e.blocked ? 'btn-out' : 'btn-primary'} btn trns hover:scale-103 hover:shadow-md/30 rounded-full`}>Block</button>
                                        <button disabled={!e.blocked} className={`${e.blocked ? 'btn-primary' : 'btn-out'} btn trns hover:scale-103 hover:shadow-md/30 rounded-full`}>Unblock</button>
                                    </div>
                                </td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
        </main>
    )
}