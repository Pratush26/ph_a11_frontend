import Swal from "sweetalert2";
import { useAxios } from "../Hooks/UseAxios"
import { showToast } from "../Utils/ShowToast";

export default function BoostPriorityButton({title, id}) {
    const axis = useAxios()
    const handleBoost = () => {
        Swal.fire({
            title: `Do you want to boost "${title}" issue?`,
            text: "You can boost this issue by paying 100৳!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Pay now!",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                axis.post(`/checkout-session`, { id, price: 100 }).then(res => {
                    window.location.href = res.data.url
                }).catch(err => {
                    showToast({ type: "error", message: err?.message || err || "Payment failed" })
                    console.error(err)
                })
            }
        });
    }
    return (
        <button onClick={handleBoost} className={`btn-primary btn trns hover:scale-103 hover:shadow-md/30 rounded-full`}>Boost</button>
    )
}