import { useForm } from "react-hook-form"
import '../Utils/form.css'
import { showToast } from "../Utils/ShowToast"
import { AuthContext } from "../Context/AuthContext"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"
import { useAxios } from "../Hooks/UseAxios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import Loader from "../Shared/Loader"

export default function UpdateIssueImage({ setModalOpened, issue }) {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const axis = useAxios()
    const queryClient = useQueryClient()

    const createIssueMutation = useMutation({
        mutationFn: async (data) => {
            const formData = new FormData()
            formData.append("file", data.image[0])
            formData.append("upload_preset", import.meta.env.VITE_Cloudinary_Upload_Preset)
            formData.append("folder", "issue_images")

            const imgRes = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_Cloudinary_CloudName}/image/upload`, formData)

            if (!imgRes?.data?.secure_url) throw new Error("Image upload failed")
            return axis.patch("/issue-photo", {
                issueId: issue._id,
                photo: imgRes?.data?.secure_url
            });
        },
        onSuccess: (res) => {
            showToast({ type: "success", msg: res.data.message })
            queryClient.invalidateQueries({ queryKey: ["issues"] })
            queryClient.invalidateQueries({ queryKey: ["issue"] })
        },

        onError: (err) => {
            showToast({
                type: "error",
                msg: err.response?.data?.message || "Something went wrong!"
            })
        }
    });
    const formSubmit = (data) => createIssueMutation.mutate(data)
    return (
        <form onSubmit={handleSubmit(formSubmit)} className="absolute bg-white z-90 right-1/2 top-0 translate-x-1/2 flex flex-col items-center gap-3 p-10 shadow-md/40 rounded-2xl w-3/4">
            <div className="w-full flex items-center justify-between gap-2">
                <h4 className="text-xl font-bold">Update Issue Image</h4>
                <button onClick={() => setModalOpened(false)} type="button" className="cursor-pointer">
                    <RxCross2 />
                </button>
            </div>
            <div className="w-full">
                    {errors.image ? <p className="text-sm text-rose-600">{errors.image.message}</p> : <label htmlFor="image">Image :</label>}
                    <input type="file" {...register("image", { required: "image is required" })} id="image" />
                </div>
            <button type="submit" disabled={createIssueMutation.isPending} className="btn btn-primary trns rounded-sm shadow-md/60 ">{createIssueMutation.isPending ? "Updating..." : "Update"}</button>
        </form>
    )
}