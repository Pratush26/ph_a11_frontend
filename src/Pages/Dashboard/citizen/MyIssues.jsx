import { useAxios } from "../../../Hooks/UseAxios"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../../Shared/Loader"
import Error from "../../../Shared/Error"
import '../../../Utils/table.css'
import { Link } from "react-router"
import BoostPriorityButton from "../../../Components/BoostPriorityButton"
import UpdateIssueModal from "../../../Components/UpdateIssueModal"
import { useState } from "react"
import DeleteIssueButton from "../../../Components/DeleteIssue"
import axios from "axios"

export default function MyIssuePage() {
    const axis = useAxios()
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [targetedIssue, setTargetedIssue] = useState(null)
    const [filters, setFilters] = useState({ page: 1, limit: 12, status: "", category: "", submittedBy: "user" });

    const buildQueryString = (filters) => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        return params.toString();
    };
    const { data: myIssue, isLoading, isFetching, error: dataError } = useQuery({
        queryKey: ['issues', 'my', filters],
        queryFn: () => axis(`/privateIssues?${buildQueryString(filters)}`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
    const { data: categoryList } = useQuery({
        queryKey: ['categoryList'],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/categories`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
    if (dataError) return <Error msg={dataError.message} />;
    const handleEdit = (data) => {
        setTargetedIssue(data)
        setIsModalOpened(true)
    }
    return (
        <main className="relative w-11/12 mx-auto min-h-screen">
            {isModalOpened && <UpdateIssueModal setIsModalOpened={setIsModalOpened} issue={targetedIssue} />}
            <h1 className="text-4xl my-8 font-semibold text-center">My Issues</h1>
            <div className="flex w-full justify-between items-center gap-4">
                {
                    myIssue?.length > 0 ?
                        <p>Total Issues ({myIssue.length})</p>
                        :
                        <p>No Issue Found!</p>
                }
            </div>
            <form className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 w-full my-8">
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
            </form>
            <table className="table-auto text-center text-sm font-medium border-collapse w-full sm:w-11/12 mx-auto overflow-hidden my-6">
                <thead>
                    <tr>
                        <th className="hidden sm:table-cell">SL no.</th>
                        <th>Issue Info</th>
                        <th className="hidden lg:table-cell">Submission Date</th>
                        <th>Status</th>
                        <th className="hidden md:table-cell">Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-800">
                    {
                        (isLoading || isFetching) ?
                            <div className="flex w-full min-h-[90vh] items-center justify-center">
                                <Loader />
                            </div>
                            :
                            myIssue?.map((e, i) => (
                                <tr key={i} className="border border-gray-300 bg-white">
                                    <td className="hidden sm:table-cell">{i + 1}</td>
                                    <td>
                                        <div className="flex flex-col md:flex-row items-center text-start gap-2">
                                            <img src={e.photo} alt="staff photo" className="h-20 w-auto rounded-lg" />
                                            <span>
                                                <Link to={`/issue-details/${e._id}`} className="hover:underline" >{e.title}</Link>
                                                <p className="text-xs">{e.location}</p>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="hidden lg:table-cell">{new Date(e.createdAt).toLocaleString()}</td>
                                    <td>
                                        <span className={`${e.status === "pending" ? "bg-amber-500" : e.status === "working" ? "bg-violet-500" : e.status === "in-progress" ? "bg-blue-500" : e.status === "resolved" ? "bg-emerald-500" : e.status === "closed" ? "bg-gray-500" : "bg-rose-500"} rounded-full text-white py-0.5 px-3`}>
                                            {e.status}
                                        </span>
                                    </td>
                                    <td className="hidden md:table-cell">
                                        <span className={`${e.priority === "low" ? "bg-gray-500" : "bg-blue-500"} rounded-full text-white py-0.5 px-3`}>
                                            {e.priority}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 justify-end">
                                            {e.priority !== "high" && <BoostPriorityButton title={e.title} id={e._id} />}
                                            {
                                                e?.status === "pending"
                                                &&
                                                <button onClick={() => handleEdit(e)} className="btn btn-out trns rounded-full">Edit</button>
                                            }
                                            <DeleteIssueButton id={e._id} title={e.title} />
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