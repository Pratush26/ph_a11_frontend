import { useAxios } from "../../../Hooks/UseAxios"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../../Shared/Loader"
import Error from "../../../Shared/Error"
import '../../../Utils/table.css'

export default function MyIssuePage() {
    const axis = useAxios()
    const { data: myIssue, isLoading, error: dataError } = useQuery({
        queryKey: ['issues', 'my'],
        queryFn: () => axis('/my-issues').then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
    if (isLoading) return (
        <div className="flex w-full min-h-[90vh] items-center justify-center">
            <Loader />
        </div>
    )
    if (dataError) return <Error msg={dataError.message} />;
    console.log(myIssue)
    return (
        <main className="relative w-11/12 mx-auto min-h-screen">
            <h1 className="text-4xl my-8 font-semibold text-center">My Issues</h1>
            <div className="flex w-full justify-between items-center gap-4">
                <p>Total Issues ({myIssue.length})</p>
            </div>
            <table className="table-auto text-center text-sm font-medium border-collapse w-full sm:w-11/12 mx-auto overflow-hidden my-6">
                <thead>
                    <tr>
                        <th className="hidden sm:table-cell">SL no.</th>
                        <th>Issue Info</th>
                        <th className="hidden sm:table-cell">Submission Date</th>
                        <th className="hidden sm:table-cell">Status</th>
                        <th className="hidden sm:table-cell">Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-800">
                    {
                        myIssue?.map((e, i) => (
                            <tr key={i} className="border border-gray-300 bg-white">
                                <td className="hidden sm:table-cell">{i + 1}</td>
                                <td>
                                    <div className="flex items-center text-start gap-2">
                                        <img src={e.photo} alt="staff photo" className="h-20 w-auto rounded-lg" />
                                        <span>
                                            <p>{e.title}</p>
                                            <p className="text-xs">{e.location}</p>
                                        </span>
                                    </div>
                                </td>
                                <td>{new Date(e.createdAt).toLocaleString()}</td>
                                <td>
                                    <span className={`${e.status === "pending"? "bg-amber-500" : e.status === "in-progress"? "bg-blue-500" : e.status === "resolved"? "bg-emerald-500" : e.status === "closed"? "bg-gray-500" : "bg-rose-500"} rounded-full text-white py-0.5 px-3`}>
                                    {e.status}
                                    </span>
                                </td>
                                <td>
                                    <span className={`${e.priority === "low"? "bg-gray-500" : "bg-blue-500"} rounded-full text-white py-0.5 px-3`}>
                                    {e.priority}
                                    </span>
                                </td>
                                <td>
                                    {/* <div className="flex gap-2 justify-center">
                                        <button disabled={e.blocked} className={`${e.blocked ? 'btn-out' : 'btn-primary'} btn trns hover:scale-103 hover:shadow-md/30 rounded-full`}>Block</button>
                                        <button disabled={!e.blocked} className={`${e.blocked ? 'btn-primary' : 'btn-out'} btn trns hover:scale-103 hover:shadow-md/30 rounded-full`}>Unblock</button>
                                    </div> */}
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