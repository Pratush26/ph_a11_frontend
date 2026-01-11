import Swal from "sweetalert2";
import { useAxios } from "../../Hooks/UseAxios";
import { showToast } from "../../Utils/ShowToast";

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
                            if(!res.data?.success) showToast({ type: "error", msg: res.data.response?.data?.message || res.data?.message || "Payment failed" })
                            else window.location.href = res.data.url
                        }).catch(err => {
                            showToast({ type: "error", msg: err.data.response?.data?.message || err?.message || "Payment failed" })
                            console.error(err)
                        })
                    }
                });
            } catch (error) {
                console.error(error)
                showToast({ type: "error", msg: error?.message || "Payment failed" })
            }
        }
    return (
        <button onClick={handleSubscribe} disabled={premium} className="btn btn-primary trns rounded-md">Subscribe</button>
    )
}