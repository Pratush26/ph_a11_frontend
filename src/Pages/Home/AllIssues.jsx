import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Loader from "../../Shared/Loader"
import { Link } from "react-router"
import Error from "../../Shared/Error"
import { useState } from "react"

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
                        <div className='min-h-[90vh] w-fit mx-auto flex items-center justify-center col-span-3'>
                            <Loader />
                        </div>
                        :
                        AllIssues?.map(e => (
                            <div key={e._id} className='shadow-md/30 rounded-xl p-4 flex flex-col justify-between gap-4 text-sm'>
                                <div className='flex items-center justify-between w-full gap-3'>
                                    <h6 className='text-lg font-bold'>{e.title}</h6>
                                    <p>{new Date(e.createdAt).toLocaleDateString()}</p>
                                </div>
                                <img src={e.photo} loading='lazy' alt="issue photo" className='w-full rounded-xl aspect-square object-cover' />
                                <p className='line-clamp-2'>{e.description}</p>
                                <Link to={`/issue-details/${e._id}`} className='hover:underline italic'>View Details</Link>
                            </div>
                        ))
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