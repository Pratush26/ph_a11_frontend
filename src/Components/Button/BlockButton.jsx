import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../../Hooks/UseAxios";
import { showToast } from "../../Utils/ShowToast";

export default function BlockButton({email, current}) {
    const axis = useAxios()
        const queryClient = useQueryClient()
    const createIssueMutation = useMutation({
        mutationFn: async () => {
            return axis.patch("/block", { email, blocked : !current});
        },
        onSuccess: (res) => {
            showToast({ type: "success", msg: res.data.message })
            queryClient.invalidateQueries({ queryKey: ["staffs"] })
            queryClient.invalidateQueries({ queryKey: ["citizens"] })
        },

        onError: (err) => {
            showToast({type: "error", msg: err.response?.data?.message || "Something went wrong!"})
        }
    });
    return (
        <button onClick={() => createIssueMutation.mutate()} className={`${current ? 'btn-primary' : 'bg-rose-500'} btn trns text-white font-bold hover:scale-103 hover:shadow-md/30 rounded-full`}>{current ? "Unblock" : "Block"}</button>
    )
}