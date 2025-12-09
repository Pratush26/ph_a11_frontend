import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "react-router"
import Loader from "../../Shared/Loader"
import Error from "../../Shared/Error"

export default function IssueDetails() {
    const { id } = useParams()
    const { data: issue, isLoading: issueLoading, error: dataErr } = useQuery({
        queryKey: ['issue', id],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/issue/${id}`).then(res => res.data),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    })
    if (issueLoading) {
        return (
            <div className='min-h-[90vh] w-fit mx-auto flex items-center justify-center col-span-3'>
                <Loader />
            </div>
        )
    }
    if (dataErr) return <Error msg={dataErr.message} />;
    return (
        <main className="w-full my-10">
            <section className="grid grid-cols-2 w-5/6 mx-auto gap-6">
                <img src={issue?.photo} alt="issue photo" className="w-11/12 h-auto rounded-xl object-cover" />
                <article>
                    <h1 className="text-3xl font-bold">{issue?.title}</h1>
                    <p>{issue?.description}</p>
                </article>
            </section>
        </main>
    )
}