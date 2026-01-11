import { useAxios } from "../../../Hooks/UseAxios"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../../Shared/Loader"
import Error from "../../../Shared/Error"
import '../../../Utils/table.css'
import AssignedRow from "../../../Components/AssignedRow"

export default function AssignedIssues() {
    const axis = useAxios()
    const { data: myIssue, isLoading, error: dataError } = useQuery({
        queryKey: ['issues', 'assigned'],
        queryFn: () => axis('/privateIssues?assignedTo=staff').then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
    if (isLoading) return (
        <div className="flex w-full min-h-[90vh] items-center justify-center">
            <Loader />
        </div>
    )
    if (dataError) return <Error msg={dataError.message} />;

    return (
        <main className="relative w-11/12 mx-auto min-h-screen">
            <h1 className="text-4xl my-8 font-semibold text-center">Assigned Issues</h1>
            <div className="flex w-full justify-between items-center gap-4">
                <p>Total Issues ({myIssue.length})</p>
            </div>
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
                <tbody>
                    {
                        myIssue?.map((e, i) => <AssignedRow key={i} i={i} e={e} />)
                    }
                </tbody>
            </table>
        </main>
    )
}