import Swal from "sweetalert2";
import { showToast } from "../Utils/ShowToast";
import { useAxios } from "../Hooks/UseAxios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const statusOrder = ["pending", "in-progress", "working", "resolved", "closed"];
export default function AssignedRow({ e, i }) {
    const [desiredStatus, setDesiredStatus] = useState(null)
    const axis = useAxios()
    const queryClient = useQueryClient()
    const createIssueMutation = useMutation({
        mutationFn: async () => {
            return axis.patch("/issue-status", {
                issueId: e._id,
                status: desiredStatus
            });
        },
        onSuccess: (res) => {
            showToast({ type: "success", msg: res.data.message })
            queryClient.invalidateQueries({ queryKey: ["assigned"] })
            queryClient.invalidateQueries({ queryKey: ["issues"] })
            queryClient.invalidateQueries({ queryKey: ["analytics"] })
        },

        onError: (err) => {
            showToast({
                type: "error",
                msg: err.response?.data?.message || "Something went wrong!"
            })
        }
    });
    const handleUpdate = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You can't revert it later!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) createIssueMutation.mutate()
        });
    }
    return (
        <tr className="border border-gray-300 bg-white">
            <td className="hidden sm:table-cell">{i + 1}</td>
            <td>
                <div className="flex items-center text-start gap-2">
                    <img src={e.photo} alt="staff photo" className="h-20 w-auto rounded-lg hidden md:block" />
                    <span>
                        <p>{e.title}</p>
                        <p className="text-xs">{e.location}</p>
                    </span>
                </div>
            </td>
            <td className="hidden lg:table-cell">{new Date(e.createdAt).toLocaleString()}</td>
            <td>
                <select onChange={val => setDesiredStatus(val.target.value)} defaultValue={e.status} name="issueStatus" id="issueStatus" >
                    {statusOrder.map((s) => (
                        <option
                            key={s}
                            value={s}
                            className="capitalize"
                            disabled={statusOrder.indexOf(s) < statusOrder.indexOf(e.status)}
                        >
                            {s}
                        </option>
                    ))}
                </select>
            </td>
            <td className="hidden md:table-cell">
                <span className={`${e.priority === "low" ? "bg-gray-500" : "bg-blue-500"} rounded-full text-white py-0.5 px-3`}>
                    {e.priority}
                </span>
            </td>
            <td>
                <div className="flex gap-2 justify-center">
                    <button onClick={handleUpdate} className={`btn-primary btn trns hover:scale-103 hover:shadow-md/30 rounded-full`}>Update Status</button>
                </div>
            </td>
        </tr>
    )
}