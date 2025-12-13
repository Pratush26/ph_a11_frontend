import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../../Hooks/UseAxios";
import Loader from "../../Shared/Loader";
import Error from "../../Shared/Error";
import DashboardGraph from "../../Components/DashboardGraph";
import TransactionGraph from "../../Components/TransactionGraph";

export default function Dashboard() {
    const axis = useAxios()
    const { data: analytics, isLoading: analyticsLoading, error: analyticsErr } = useQuery({
        queryKey: ['analytics'],
        queryFn: () => axis("/issuesAnalytics").then(res => res.data),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    })
    if (analyticsLoading) {
        return (
            <div className='min-h-[90vh] w-fit mx-auto flex items-center justify-center col-span-3'>
                <Loader />
            </div>
        )
    }
    if (analyticsErr) return <Error msg={analyticsErr.message} />;
    return (
        <main className="w-11/12 my-10 mx-auto">
            <h3 className="text-3xl font-semibold text-center my-8">Welcome to Dashboard</h3>
            <h4 className="text-2xl font-semibold my-2">Issues Analytics</h4>
            <section className="flex items-center justify-center gap-6 w-full">
                {
                    analytics.analyticsData.map((e, i) => (
                        <div key={i} className="p-4 bg-white rounded-xl shadow-md/30 w-full">
                            <p className="text-lg font-semibold capitalize">{e._id}</p>
                            <p>{e.count}</p>
                        </div>
                    ))
                }
            </section>
            <h4 className="text-2xl font-semibold mb-6 mt-10">Issues Graph</h4>
            <section className="w-full min-h-[70vh] p-10 bg-white rounded-2xl shadow-md/30">
                <DashboardGraph data={analytics.graphicalData} />
            </section>
            <h4 className="text-2xl font-semibold mb-6 mt-10">Transaction Bar</h4>
            <section className="w-full min-h-[70vh] p-10 bg-white rounded-2xl shadow-md/30">
                <TransactionGraph data={analytics.transactions} />
            </section>
        </main>
    )
}