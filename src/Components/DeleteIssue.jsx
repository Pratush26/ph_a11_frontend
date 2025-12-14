import Swal from "sweetalert2";
import { useAxios } from "../Hooks/UseAxios"
import { showToast } from "../Utils/ShowToast";

export default function DeleteIssueButton({title, id}) {
    const axis = useAxios()
    const handleDelete = () => {
        Swal.fire({
            title: `Are you sure? you want to Delete this issue-`,
            text:  title,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                axis.put(`/issue`, { id }).then(res => {
                    showToast({ type: "success", message: res?.data.message || "Successfully Deleted issue" })
                }).catch(err => {
                    showToast({ type: "error", message: err?.message || err.data.response.data?.message || "Failed to Delete this issue" })
                    console.error(err)
                })
            }
        });
    }
    return (
        <button onClick={handleDelete} className="btn bg-rose-600 trns rounded-full hover:scale-103 hover:shadow-md/20 text-white font-bold text-sm">Delete</button>
    )
}