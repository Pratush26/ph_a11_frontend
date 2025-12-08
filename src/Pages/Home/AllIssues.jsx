import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Loader from "../../Shared/Loader"
import { Link } from "react-router"
import Error from "../../Shared/Error"
import { useState } from "react"

export default function AllIssuesPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const { data: AllIssues, isLoading: issueLoading, error: dataErr } = useQuery({
        queryKey: ['issues', 'all'],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/issues`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
    if (dataErr) return <Error msg={dataErr.message} />;
    return (
      <main className="w-full my-10">
        <section className="min-h-[80vh] relative overflow-hidden w-11/12 mx-auto">
                <h3 className='text-center font-semibold text-3xl'>All Issues</h3>
                <p className='text-center my-2 text-sm'>Stay informed about current problems being addressed in your city. These are the latest issues reported by citizens like you.</p>
                <article className='grid grid-cols-3 gap-6 w-11/12 mx-auto my-10'>
                    {
                        issueLoading ?
                            <div className='min-h-[90vh] w-fit mx-auto col-span-3'>
                                <Loader />
                            </div>
                            :
                            AllIssues?.map(e => (
                                <div key={e._id} className='shadow-md/30 rounded-xl p-4 flex flex-col justify-between gap-4 text-sm'>
                                    <div className='flex items-center justify-between w-full gap-3'>
                                        <h6 className='text-2xl font-semibold'>{e.title}</h6>
                                        <p>{new Date(e.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <img src={e.photo} loading='lazy' alt="issue photo" className='w-full rounded-xl aspect-square object-cover' />
                                    <p className='line-clamp-2'>{e.description}</p>
                                    <Link to={`/issue-details/${e._id}`} className='hover:underline italic'>View Details</Link>
                                </div>
                            ))
                    }
                </article>
            </section>
      </main>  
    )
}