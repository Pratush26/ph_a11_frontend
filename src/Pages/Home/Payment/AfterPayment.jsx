import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { showToast } from "../../../Utils/ShowToast";
import Lottie from "lottie-react";
import fireworks from '../../../assets/Fireworks.json'
import failed from '../../../assets/payment_unsuccessful.json'

export default function AfterPayment() {
    const [paymentData, setPaymentData] = useState({})
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id");
    const type = searchParams.get("type")
    useEffect(() => {
        if (!sessionId) return;
        if (type === "boost") {
            axios.patch(`${import.meta.env.VITE_SERVER}/update-paymentStatus?type=${type}`, { session_id: sessionId })
                .then(res => setPaymentData(res.data))
                .catch(err => {
                    showToast({ type: "error", message: err.message || "Some error occur!" })
                    console.error(err)
                });
        }
        else if (type === "subscription") {
            axios.patch(`${import.meta.env.VITE_SERVER}/update-paymentStatus?type=${type}`, { session_id: sessionId })
                .then(res => setPaymentData(res.data))
                .catch(err => {
                    showToast({ type: "error", message: err.message || "Some error occur!" })
                    console.error(err)
                });
        }
    }, [sessionId, type]);

    if (searchParams.get("success") === "false") {
        return (
            <main className="w-full">
                <h1 className="text-4xl text-center text-secondary font-bold m-10">Payment Unsuccessful!</h1>
                <div className="w-5/6 max-w-xs mx-auto">
                    <Lottie animationData={failed} />
                </div>
            </main>
        )
    }
    return (
        <main className="grid grid-cols-3 w-full min-h-[70vh] text-center mx-4 my-8">
            <Lottie animationData={fireworks} />
            <section className="flex flex-col items-center justify-center gap-3">
                <h1 className="text-3xl text-secondary font-bold">Payment Successful!</h1>
                {paymentData?.issueId && <p>Your issue's tracking Id: {paymentData?.issueId}</p>}
                <p>You successfully paid <span className="uppercase">{paymentData?.currency || "="}</span> {paymentData?.cost || 0}</p>
                <div className="flex items-center justify-center">
                <Link to='/' className="btn btn-primary rounded-lg trnsition shadow-md">Back to home</Link>
                </div>
            </section>
            <Lottie animationData={fireworks} />
        </main>
    )
}