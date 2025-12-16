import Swal from "sweetalert2";
import { useAxios } from "../Hooks/UseAxios"
import { showToast } from "../Utils/ShowToast";

export default function SubscribeButton({premium}) {
    const axis = useAxios()
    const handleSubscribe = async () => {
            try {
                Swal.fire({
                    title: `Do you want to explore our Premium Subscriptions?`,
                    text: "1000৳ payment required for Premium subscription!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Subscribe now!",
                    cancelButtonText: "Cancel"
                }).then((result) => {
                    if (result.isConfirmed) {
                        axis.post("/premium-checkout-session").then(res => {
                            window.location.href = res.data.url
                        }).catch(err => {
                            showToast({ type: "error", message: err?.message || err || "Payment failed" })
                            console.error(err)
                        })
                    }
                });
            } catch (error) {
                console.error(error)
                showToast({ type: "error", message: error?.message || "Payment failed" })
            }
        }
    return (
        <button onClick={handleSubscribe} disabled={premium} className="btn btn-primary trns rounded-md">Subscribe</button>
    )
}