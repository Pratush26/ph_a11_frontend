import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAxios } from "../Hooks/UseAxios"
import { RxCross2 } from "react-icons/rx"
import Loader from "../Shared/Loader"
import { showToast } from "../Utils/ShowToast"

export default function StaffListModal({ setIsModalOpened, issueId }) {
    const axis = useAxios()
    const queryClient = useQueryClient()
    const { data: staffsData, isLoading: staffLoading } = useQuery({
        queryKey: ['staffs'],
        queryFn: () => axis('/users?role=staff').then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
    const createIssueMutation = useMutation({
        mutationFn: async (data) => {
            console.log(data)
            return axis.patch("/assign-issue", {
                staffId: data.id,
                issueId
            })
        },

        onSuccess: (res) => {
            showToast({ type: "success", msg: res.data.message })
            queryClient.invalidateQueries({ queryKey: ["staffs"] })
        },

        onError: (err) => {
            showToast({
                type: "error",
                msg: err.response?.data?.message || "Something went wrong!"
            })
        }
    })
    return (
        <section className="absolute bg-white z-90 right-1/2 top-0 translate-x-1/2 flex flex-col items-center gap-3 p-10 shadow-md/40 rounded-2xl w-1/4">
            <div className="w-full flex items-center justify-between gap-2">
                <h4 className="text-lg font-semibold">Choose staff for assinging</h4>
                <button onClick={() => setIsModalOpened(false)} type="button" className="cursor-pointer">
                    <RxCross2 />
                </button>
            </div>
            {
                staffLoading ?
                    <Loader />
                    :
                    staffsData.map(e => (
                        <button onClick={() => createIssueMutation.mutate({id: e._id})} className="btn btn-out trns w-full rounded-full flex justify-between">
                            <p>{e.name}</p>
                            <p>{e.assignedCount}</p>
                        </button>
                    ))
            }
        </section>
    )
}