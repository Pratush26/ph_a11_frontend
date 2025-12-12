import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Loader from "../../Shared/Loader"
import { Link } from "react-router"
import Error from "../../Shared/Error"
import { useState } from "react"
import Card from "../../Components/Card"

export default function AllIssuesPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 12;
    const { data: AllIssues, isLoading: issueLoading, isFetching, error: dataErr } = useQuery({
        queryKey: ['issues', 'all', currentPage],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/issues?limit=${limit}&page=${currentPage}`).then(res => res.data),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    })
    const { data: totalPages } = useQuery({
        queryKey: ['totalissues'],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/totalIssues?limit=${limit}`).then(res => res.data),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    })
    if (dataErr) return <Error msg={dataErr.message} />;
    return (
        <main className="min-h-[80vh] w-11/12 mx-auto my-10">
            <h3 className='text-center font-semibold text-3xl'>All Issues</h3>
            <p className='text-center my-2 text-sm'>Stay informed about current problems being addressed in your city. These are the latest issues reported by citizens like you.</p>
            <article className='grid grid-cols-4 gap-6 w-11/12 mx-auto my-10'>
                {
                    (isFetching || issueLoading) ?
                        <div className='min-h-[90vh] w-fit mx-auto flex items-center justify-center col-span-4'>
                            <Loader />
                        </div>
                        :
                        AllIssues?.map(e => <Card key={e._id} e={e} />)
                }
            </article>
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
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="btn btn-primary rounded-md"
                >
                    →
                </button>
            </div>
        </main>
    )
}