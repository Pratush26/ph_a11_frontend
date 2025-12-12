import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router";

export default function Card({ e }) {
    return (
        <div className='shadow-md/30 rounded-xl p-4 flex flex-col justify-between gap-2 text-sm'>
            <h6 className='text-lg font-bold'>{e.title}</h6>
            <div className='flex items-center justify-between w-full gap-2 font-medium text-xs'>
                <span className="px-4 py-1 rounded-full bg-gray-300 font-medium">{e?.category}</span>
                <span
                    className={`px-3 py-1 rounded-full text-white
                            ${e.status === "pending" ? "bg-amber-500" : e.status === "working" ? "bg-violet-500" : e.status === "in-progress" ? "bg-blue-500" : e.status === "resolved" ? "bg-emerald-500" : e.status === "closed" ? "bg-gray-500" : "bg-rose-500"}
                            `}
                >
                    {e?.status}
                </span>
            </div>
            <img src={e.photo} loading='lazy' alt="issue photo" className='w-full rounded-xl aspect-square object-cover' />
            <div className='flex items-center justify-between w-full gap-2 font-medium text-xs'>
                <p>Priority: <span className={`${e.priority === "low" ? "bg-gray-500" : "bg-blue-500"} rounded-full text-white py-1 px-3`}>
                    {e?.priority}
                </span>
                </p>
                <span className="flex items-start text-base gap-1">
                    <p>{e?.voted.length || 0}</p>
                    <AiOutlineLike className="text-xl cursor-pointer" />
                </span>
            </div>
            <p className="line-clamp-1">Address: <span className="font-medium">{e?.location}</span></p>
            <p className='line-clamp-2'>{e.description}</p>
            <Link to={`/issue-details/${e._id}`} className='hover:underline italic'>View Details</Link>
        </div>
    )
}