import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import '../../Utils/table.css'
import { Link } from "react-router"
import { useAxios } from "../../Hooks/UseAxios"
import Error from "../../Shared/Error"
import Loader from "../../Shared/Loader"
import { FaFileInvoice } from "react-icons/fa"

export default function TransactionsPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const axis = useAxios()
    const limit = 12;
    const { data: transactionsData, isLoading, isFetching, error: dataErr } = useQuery({
        queryKey: ['transactions', 'all', currentPage],
        queryFn: () => axis(`/transactions?limit=${limit}&page=${currentPage}`).then(res => res.data),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    })
    const { data: totalPages } = useQuery({
        queryKey: ['totalTransactions'],
        queryFn: () => axis(`/totalTransactions?limit=${limit}`).then(res => res.data),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    })
    if (dataErr) return <Error msg={dataErr.message} />;
    return (
        <main className="relative w-11/12 mx-auto min-h-screen">
            <h1 className="text-4xl my-8 font-semibold text-center">Transactions</h1>
            {
                (isFetching || isLoading) ?
                    <div className='min-h-[50vh] w-fit mx-auto flex items-center justify-center col-span-3'>
                        <Loader />
                    </div>
                    :
                    <table className="table-auto text-center text-sm font-medium border-collapse w-full sm:w-11/12 mx-auto overflow-hidden my-6">
                        <thead>
                            <tr>
                                <th className="hidden sm:table-cell">SL no.</th>
                                <th>Transaction ID</th>
                                <th className="hidden sm:table-cell">Date</th>
                                <th>Amount</th>
                                <th className="hidden sm:table-cell">Status</th>
                                <th className="hidden sm:table-cell">
                                    <div className="flex items-center justify-center gap-2">
                                        <FaFileInvoice />Invoice
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {
                                transactionsData?.map((e, i) => (
                                    <tr key={i} className="border border-gray-300 bg-white">
                                        <td className="hidden sm:table-cell">{i + 1}</td>
                                        <td className="text-xs">
                                            <div>
                                                <p>{e.transactionId}</p>
                                                {e.issue && <Link to={`/issue-details/${e.issue}`} className="hover:underline">View Details</Link>}
                                            </div>
                                        </td>
                                        <td className="text-xs hidden sm:table-cell">{new Date(e.createdAt).toLocaleString()}</td>
                                        <td>{e.amount} ৳</td>
                                        <td className="hidden sm:table-cell">
                                            <span className={`${e.status === "complete" ? "bg-blue-500" : "bg-gray-500"} rounded-full text-white py-0.5 px-3`}>
                                                {e.status}
                                            </span>
                                        </td>
                                        <td className="hidden sm:table-cell">
                                            <Link state={[{
                                                transactionId: e.transactionId,
                                                date: e.issue ?? "",
                                                paidBy: e.paidBy,
                                                total: e.amount,
                                            }]} to='/invoice' className="btn btn-out rounded-lg trnsition shadow-md"
                                            >
                                                Download
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
            <div className="flex justify-center gap-2 items-center mt-6">
                {/* Prev */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className="btn btn-primary rounded-md"
                >
                    ←
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1
                    return (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(page)}
                            className={`btn rounded-md trns ${page === currentPage ? "btn-primary" : "btn-out text-blue-700"}`}
                        >
                            {page}
                        </button>
                    )
                })}

                {/* Next */}
                <button
                    disabled={currentPage >= transactionsData?.total}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="btn btn-primary rounded-md"
                >
                    →
                </button>
            </div>
        </main>
    )
}