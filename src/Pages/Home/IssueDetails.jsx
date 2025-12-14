import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import Loader from "../../Shared/Loader"
import Error from "../../Shared/Error"
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IoCheckmarkDoneCircle, IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useAxios } from "../../Hooks/UseAxios"
import { useContext, useState } from "react";
import { UserContext } from "../../Context/AuthContext";
import UpdateIssueModal from "../../Components/UpdateIssueModal";
import BoostPriorityButton from "../../Components/BoostPriorityButton";
import DeleteIssueButton from "../../Components/DeleteIssue";
import UpdateIssueImage from "../../Components/IssueImgModal";

export default function IssueDetails() {
    const { user } = useContext(UserContext)
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [modalOpened, setModalOpened] = useState(false)
    const { id } = useParams()
    const axis = useAxios()
    const { data: e, isLoading: issueLoading, error: dataErr } = useQuery({
        queryKey: ['issue', id],
        queryFn: () => axis(`/issue/${id}`).then(res => res.data),
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
        <main className="w-full my-10 relative">
            {isModalOpened && <UpdateIssueModal setIsModalOpened={setIsModalOpened} issue={e} />}
            {modalOpened && <UpdateIssueImage setModalOpened={setModalOpened} issue={e} />}
            <section className="grid grid-cols-2 items-center-safe justify-items-center-safe w-5/6 mx-auto gap-6 text-sm">
                <img src={e?.photo} alt="issue photo" className="w-11/12 h-auto rounded-xl object-cover" />
                <article>
                    <h1 className="text-3xl font-bold">{e?.title}</h1>
                    <div className="flex items-center justify-between gap-4 my-5">
                        <span
                            className={`px-4 py-1.5 rounded-full text-white font-medium
                            ${e.status === "pending" ? "bg-amber-500" : e.status === "working" ? "bg-violet-500" : e.status === "in-progress" ? "bg-blue-500" : e.status === "resolved" ? "bg-emerald-500" : e.status === "closed" ? "bg-gray-500" : "bg-rose-500"}
                            `}
                        >
                            {e?.status}
                        </span>
                        <span className="flex items-start text-base gap-2">
                            <p>{e?.totalVoted || 0}</p>
                            {
                                e?.isVoted ?
                                    <AiFillLike className="text-xl cursor-pointer" />
                                    :
                                    <AiOutlineLike className="text-xl cursor-pointer" />
                            }
                        </span>
                    </div>
                    {
                        user?.email === e?.user?.email
                        &&
                        <div className="flex items-center justify-end gap-2 my-5">
                            {e?.priority === "low" && <BoostPriorityButton title={e.title} id={e._id} />}
                            {
                                e?.status === "pending"
                                &&
                                <button onClick={() => setModalOpened(true)} className="btn btn-out trns rounded-full">Update Image</button>
                            }
                            {
                                e?.status === "pending"
                                &&
                                <button onClick={() => setIsModalOpened(true)} className="btn btn-out trns rounded-full">Edit</button>
                            }
                            <DeleteIssueButton title={e.title} id={e._id} />
                        </div>
                    }
                    <div className="flex items-center justify-between gap-4">
                        <h4 className="text-base my-2 font-semibold">Sumitted By: </h4>
                        <p>{new Date(e?.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={e?.user?.image} alt="issue submitter image" className="h-8 aspect-square object-cover rounded-full" />
                        <span>
                            <p className="font-semibold text-base">{e?.user?.name}</p>
                            <p className="text-xs">{e?.user?.email}</p>
                        </span>
                    </div>
                    <hr className="border-gray-400 my-5" />
                    <p>{e?.description}</p>
                    <p className="mt-3">Address: <span className="font-medium">{e?.location}</span></p>
                    <div className="flex items-center justify-between gap-4 my-6">
                        <p>Category: <span className="px-4 py-2 rounded-full bg-gray-300 font-medium">{e?.category}</span></p>
                        <p>Priority: <span className={`${e.priority === "low" ? "bg-gray-500" : "bg-blue-500"} rounded-full text-white py-1 px-3`}>
                            {e?.priority}
                        </span>
                        </p>
                    </div>
                    <hr className="border-gray-400" />
                    <h4 className="text-base mt-4 font-semibold">Assigned: </h4>
                    <div className="flex items-center gap-2">
                        <img src={e?.assigned?.image} alt="issue submitter image" className="h-8 aspect-square object-cover rounded-full" />
                        <span>
                            <p className="font-semibold text-base">{e?.assigned?.name}</p>
                            <p className="text-xs">{e?.assigned?.email}</p>
                        </span>
                    </div>
                </article>
            </section>
            <section className="flex flex-col items-center mt-10 w-3/4 mx-auto space-y-3">
                <h4 className="text-3xl font-bold">Timelines</h4>
                {
                    e?.state?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((s, i) => (
                        <div key={i} className="grid grid-cols-[40%_20%_40%] w-full items-center-safe justify-items-center-safe">
                            <p className="justify-self-end">{s.title}</p>
                            <span className="text-4xl">
                                {
                                    s.completed ?
                                        <IoCheckmarkDoneCircle className="text-blue-600" />
                                        :
                                        <IoCheckmarkDoneCircleOutline />
                                }
                            </span>
                            <span className="justify-self-start space-y-1 text-sm">
                                <p>{s.description}</p>
                                <p>{new Date(s.createdAt).toLocaleString()}</p>
                            </span>
                        </div>
                    ))
                }
            </section>
        </main>
    )
}