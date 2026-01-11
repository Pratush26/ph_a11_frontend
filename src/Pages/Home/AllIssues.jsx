import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Loader from "../../Shared/Loader"
import Error from "../../Shared/Error"
import { useEffect, useState } from "react"
import Card from "../../Components/Card"

export default function AllIssuesPage() {
    const [filters, setFilters] = useState({ page: 1, limit: 12, priority: "", status: "", category: "", search: "" });
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters(f => ({
                ...f,
                search: searchInput,
                page: 1
            }));
        }, 400);

        return () => clearTimeout(timer);
    }, [searchInput]);

    const buildQueryString = (filters) => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        return params.toString();
    };

    const { data: AllIssues, isLoading: issueLoading, isFetching, error: dataErr } = useQuery({
        queryKey: ['issues', 'all', filters],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/issues?${buildQueryString(filters)}`).then(res => res.data ?? []),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    })
    const { data: totalPages } = useQuery({
        queryKey: ['totalissues', filters],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/totalIssues?${buildQueryString(filters)}`).then(res => res.data),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    })
    const { data: categoryList } = useQuery({
        queryKey: ['categoryList'],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/categories`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
    if (dataErr) return <Error msg={dataErr.message} />;
    return (
        <main className="min-h-[80vh] w-5/6 mx-auto my-10">
            <h3 className='text-center font-semibold text-3xl'>All Issues</h3>
            <p className='text-center my-2 text-sm'>Stay informed about current problems being addressed in your city. These are the latest issues reported by citizens like you.</p>
            <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full my-8">
                <select onChange={(e) => setFilters(f => ({ ...f, priority: e.target.value, page: 1 }))} >
                    <option value="">All Priority</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                </select>
                <select onChange={(e) => setFilters(f => ({ ...f, status: e.target.value, page: 1 }))} >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="working">Working</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                </select>
                <select onChange={(e) => setFilters(f => ({ ...f, category: e.target.value, page: 1 }))} >
                    <option value="">All Category</option>
                    {
                        categoryList?.map((e, i) => <option key={i} value={e.name} className="capitalize">{e.name}</option>)
                    }
                </select>
                <input type="text" placeholder="Search issue" onChange={(e) => setSearchInput(e.target.value)} />
            </form>
            <article className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full my-10'>
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
                    disabled={filters.page === 1}
                    onClick={() => setFilters(f => ({ ...f, page: f.page - 1 }))}
                    className="btn btn-primary rounded-md"
                >
                    ←
                </button>

                {/* Page Numbers */}

                {[...Array(totalPages || 0)].map((_, i) => {
                    const page = i + 1;
                    return (
                        <button
                            key={i}
                            onClick={() => setFilters(f => ({ ...f, page }))}
                            className={`btn rounded-md trns ${page === filters.page ? "btn-primary" : "btn-out text-blue-700"}`}
                        >
                            {page}
                        </button>
                    )
                })}

                {/* Next */}
                <button
                    disabled={filters.page >= totalPages}
                    onClick={() => setFilters(f => ({ ...f, page: f.page + 1 }))}
                    className="btn btn-primary rounded-md"
                >
                    →
                </button>
            </div>
        </main>
    )
}