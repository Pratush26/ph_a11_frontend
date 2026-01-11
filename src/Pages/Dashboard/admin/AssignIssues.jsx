import { useState } from "react"
import { useAxios } from "../../../Hooks/UseAxios"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../../Shared/Loader"
import Error from "../../../Shared/Error"
import '../../../Utils/table.css'
import axios from "axios"
import StaffListModal from "../../../Components/Modals/StaffListModal"

export default function AssignIssues() {
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [targetedIssue, setTargetedIssue] = useState(null)
    const axis = useAxios()
    const [filters, setFilters] = useState({ page: 1, limit: 12, priority: "", status: "", category: "", assigned: "false" });

    const buildQueryString = (filters) => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        return params.toString();
    };
    const { data: issueData, isLoading: dataLoading, isFetching, error: dataError } = useQuery({
        queryKey: ['issues', 'not-assigned', filters],
        queryFn: () => axis(`/privateIssues?${buildQueryString(filters)}`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
    const { data: categoryList } = useQuery({
        queryKey: ['categoryList'],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/categories`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })

    if (dataError) return <Error msg={dataError.message} />;
    const handleAssign = (id) => {
        setIsModalOpened(!isModalOpened)
        setTargetedIssue(id)
    }
    return (
        <main className="relative w-11/12 mx-auto min-h-screen">
            <h1 className="text-4xl my-8 font-semibold text-center">Assign Issues</h1>
            {isModalOpened && <StaffListModal setIsModalOpened={setIsModalOpened} issueId={targetedIssue} />}
            <div className="flex w-full justify-between items-center gap-4">
                <p>Total Issues ({issueData?.length})</p>
            </div>
            <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full my-8">
                <select defaultValue={filters.status} onChange={(e) => setFilters(f => ({ ...f, priority: e.target.value, page: 1 }))} >
                    <option value="">All Priority</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                </select>
                <select defaultValue={filters.status} onChange={(e) => setFilters(f => ({ ...f, status: e.target.value, page: 1 }))} >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="working">Working</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                </select>
                <select defaultValue={filters.category} onChange={(e) => setFilters(f => ({ ...f, category: e.target.value, page: 1 }))} >
                    <option value="">All Category</option>
                    {
                        categoryList?.map((e, i) => <option key={i} value={e.name} className="capitalize">{e.name}</option>)
                    }
                </select>
                <select defaultValue={filters.assigned} onChange={(e) => setFilters(f => ({ ...f, assigned: e.target.value, page: 1 }))} >
                    <option value="">All Progress</option>
                    <option value="true">Assigned</option>
                    <option value="false">Not-assigned</option>
                </select>
            </form>
            {
                (dataLoading || isFetching) ?
                    <div className="flex w-full min-h-[90vh] items-center justify-center">
                        <Loader />
                    </div>
                    :
                    <table className="table-auto text-center text-sm font-medium border-collapse w-full sm:w-11/12 mx-auto overflow-hidden my-6">
                        <thead>
                            <tr>
                                <th className="hidden sm:table-cell">SL no.</th>
                                <th>Issue Info</th>
                                <th className="hidden md:table-cell">Category</th>
                                <th className="hidden lg:table-cell">Submission Date</th>
                                <th className="hidden sm:table-cell">Status</th>
                                <th>Priority</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                issueData?.map((e, i) => (
                                    <tr key={i} className="border border-gray-300 bg-(--bg-secondary) w-full">
                                        <td className="hidden sm:table-cell">{i + 1}</td>
                                        <td>
                                            <div className="flex justify-center items-center text-start gap-2">
                                                <img src={e.photo} alt="staff photo" className="h-10 md:h-20 w-auto rounded-lg" />
                                                <span>
                                                    <p>{e.title}</p>
                                                    <p className="text-xs hidden lg:block">{e.location}</p>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="hidden md:table-cell">{e.category}</td>
                                        <td className="hidden lg:table-cell">{new Date(e.createdAt).toDateString()}</td>
                                        <td className="hidden sm:table-cell">
                                            <span className={`${e.status === "pending" ? "bg-amber-500" : e.status === "working" ? "bg-violet-500" : e.status === "in-progress" ? "bg-blue-500" : e.status === "resolved" ? "bg-emerald-500" : e.status === "closed" ? "bg-gray-500" : "bg-rose-500"} rounded-full text-white py-0.5 px-3`}>
                                                {e.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className={`${e.priority === "low" ? "bg-gray-500" : "bg-blue-500"} rounded-full text-white py-0.5 px-3`}>
                                                {e.priority}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-2 items-center justify-center">
                                                <button onClick={() => handleAssign(e._id)} disabled={!!e.assignedTo} className={`btn-primary btn trns hover:scale-103 hover:shadow-md/30 rounded-full`}>Assign</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
            }
        </main>
    )
}