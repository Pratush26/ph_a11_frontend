import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../../Hooks/UseAxios";
import Loader from "../../Shared/Loader";
import Error from "../../Shared/Error";
import DashboardGraph from "../../Components/DashboardGraph";
import TransactionGraph from "../../Components/TransactionGraph";
import { useContext } from "react";
import { UserContext } from "../../Context/AuthContext";

export default function Dashboard() {
    const { userInfo } = useContext(UserContext)
    const axis = useAxios()
    const { data: analytics, isLoading: analyticsLoading, error: analyticsErr } = useQuery({
        queryKey: ['analytics'],
        queryFn: () => axis("/issuesAnalytics").then(res => res.data),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    })
    const { data: transactions } = useQuery({
        queryKey: ['transactions', 'latest'],
        queryFn: () => axis('/latest-transactions').then(res => res.data),
        enabled: userInfo?.role === 'admin',
        staleTime: 60 * 1000,
        refetchInterval: 60 * 1000,
        refetchOnWindowFocus: true,
    });
    const { data: AssignedIssues, isLoading: issueLoading } = useQuery({
        queryKey: ['issues', 'assigned', 'latest'],
        queryFn: () => axis('/privateIssues?assignedTo=staff&limit=5&status=pending').then(res => res.data),
        enabled: userInfo?.role === 'staff',
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
            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 items-center-safe justify-items-center-safe gap-4 gap-6 w-full">
                {
                    analytics?.analyticsData.map((e, i) => (
                        <div key={i} className="p-4 bg-(--bg-secondary) rounded-xl shadow-md/30 w-full">
                            <p className="text-lg font-semibold capitalize">{e._id}</p>
                            <p>{e.count}</p>
                        </div>
                    ))
                }
                <div className="p-4 bg-(--bg-secondary) rounded-xl shadow-md/30 w-full">
                    <p className="text-lg font-semibold capitalize">Transactions</p>
                    <p>{analytics?.transactions[0]?.summary[0]?.grandTotalAmount}</p>
                </div>
            </section>
            <h4 className="text-2xl font-semibold mb-6 mt-10">Issues Graph</h4>
            <section className="w-full p-10 bg-(--bg-secondary) rounded-2xl shadow-md/30">
                <DashboardGraph data={analytics?.graphicalData} />
            </section>
            {
                userInfo?.role === "staff" ?
                    issueLoading ?
                        <div className='min-h-[40vh] w-fit mx-auto flex items-center justify-center col-span-3'>
                            <Loader />
                        </div>
                        :
                        <>
                            <h4 className="text-2xl font-semibold mb-6 mt-10">Recent Tasks</h4>
                            <section className="w-full p-10 bg-(--bg-secondary) rounded-2xl shadow-md/30 space-y-6">
                                {
                                    AssignedIssues?.map(e => (
                                        <div key={e._id} className="grid grid-cols-[35%_50%_15%] gap-4">
                                            <p>{e.title}</p>
                                            <p>{e.location}</p>
                                            <p>{e.priority}</p>
                                        </div>
                                    ))
                                }
                            </section>
                        </>
                    :
                    <>
                        <h4 className="text-2xl font-semibold mb-6 mt-10">Transaction Bar</h4>
                        <section className="w-full p-10 bg-(--bg-secondary) rounded-2xl shadow-md/30">
                            <TransactionGraph data={analytics?.transactions[0]?.dailyData} />
                        </section>
                    </>
            }
            {
                userInfo?.role === "admin"
                &&
                <>
                    <h5 className="text-xl font-semibold mb-6 mt-10">Latest Transaction</h5>
                    <section className="w-full rounded-2xl shadow-md/30 p-8 space-y-2 bg-(--bg-secondary)">
                        <div className="grid grid-cols-2 sm:grid-cols-3 items-center-safe justify-items-center-safe px-6 py-2 gap-2 font-bold">
                            <p>Sender</p>
                            <p className=" hidden sm:block">Transaction Id</p>
                            <p>Amount</p>
                        </div>
                        {
                            transactions?.map(e => (
                                <div key={e._id} className="grid grid-cols-2 sm:grid-cols-3 items-center-safe text-sm justify-items-center-safe font-medium gap-2 px-6 py-2 rounded-lg trns hover:bg-gray-100">
                                    <p>{e.paidBy}</p>
                                    <p className="text-xs hidden sm:block">{e.transactionId}</p>
                                    <p>{e.amount}</p>
                                </div>
                            ))
                        }
                    </section>
                </>
            }
        </main>
    )
}