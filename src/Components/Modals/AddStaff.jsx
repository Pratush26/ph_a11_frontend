import { useForm } from "react-hook-form"
import '../../Utils/form.css'
import axios from "axios"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAxios } from "../../Hooks/UseAxios"
import { showToast } from "../../Utils/ShowToast"

export default function AddStaffForm({ setIsModalOpened }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [isVisible, setIsVisible] = useState(false)
    const axis = useAxios()
    const queryClient = useQueryClient()
    const createIssueMutation = useMutation({
        mutationFn: async (data) => {
            const formData = new FormData();
            formData.append("file", data.image[0]);
            formData.append("upload_preset", import.meta.env.VITE_Cloudinary_Upload_Preset);
            formData.append("folder", "user_images");

            const ImgRes = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_Cloudinary_CloudName}/image/upload`, formData);
            if (!ImgRes?.data?.secure_url) throw new Error("Image upload failed");

            return axis.post("/add-staff", {
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                role: data.role,
                nid: data.nid,
                address: data.address,
                photo: ImgRes.data.secure_url,
            });
        },
        onSuccess: (res) => {
            showToast({ type: "success", msg: res.data.message })
            reset()
            queryClient.invalidateQueries({ queryKey: ["staffs"] })
        },

        onError: (err) => {
            showToast({ type: "error", msg: err.response?.data?.message || "Something went wrong!" })
        }
    });
    const formSubmit = (data) => createIssueMutation.mutate(data)
    return (
        <form onSubmit={handleSubmit(formSubmit)} className="absolute bg-(--bg) z-90 right-1/2 top-0 translate-x-1/2 flex flex-col items-center gap-3 p-10 shadow-md/40 rounded-2xl w-11/12 sm:w-2/3">
            <div className="w-full flex items-center justify-between gap-2">
                <h4 className="text-xl font-bold">Add Staff</h4>
                <button onClick={() => setIsModalOpened(false)} type="button" className="cursor-pointer">
                    <RxCross2 />
                </button>
            </div>
            <fieldset className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="w-full">
                    {errors.name ? <p className="text-sm text-rose-600">{errors.name.message}</p> : <label htmlFor="name">Name :</label>}
                    <input type="text" {...register("name", { required: "name is required" })} placeholder="Enter name" id="name" />
                </div>
                <div className="w-full">
                    {errors.email ? <p className="text-sm text-rose-600">{errors.email.message}</p> : <label htmlFor="email">Email :</label>}
                    <input type="email" {...register("email", { required: "email is required" })} placeholder="Enter email" id="email" />
                </div>
                <div className="w-full">
                    {errors.phone ? <p className="text-sm text-rose-600">{errors.phone.message}</p> : <label htmlFor="phone">Phone Number :</label>}
                    <input type="tel" {...register("phone", { required: "phone is required" })} placeholder="Enter phone number" id="phone" />
                </div>
                <div className="w-full">
                    {errors.image ? <p className="text-sm text-rose-600">{errors.image.message}</p> : <label htmlFor="image">Image :</label>}
                    <input type="file" {...register("image", { required: "image is required" })} id="image" />
                </div>
                <div className="w-full">
                    {errors.nid ? <p className="text-sm text-rose-600">{errors.nid.message}</p> : <label htmlFor="nid">NID :</label>}
                    <input type="text" {...register("nid", { required: "NID is required" })} placeholder="Enter NID No." id="nid" />
                </div>
                <div className="w-full relative">
                    {errors.password ? <p className="text-sm text-rose-600">{errors.password.message}</p> : <label htmlFor="password">Password :</label>}
                    <input type={`${isVisible ? "text" : "password"}`} {...register("password", { required: "password is required" })} placeholder="Enter password" id="password" />
                    <button onClick={() => setIsVisible(!isVisible)} type="button" className="absolute right-2 bottom-1 cursor-pointer -translate-y-1/2" >{isVisible ? <FaEyeSlash /> : <FaEye />}</button>
                </div>
            </fieldset>
            <div className="w-full">
                {errors.address ? <p className="text-sm text-rose-600">{errors.address.message}</p> : <label htmlFor="address">Address :</label>}
                <input type="text" {...register("address", { required: "address is required" })} placeholder="Enter address" id="address" />
            </div>
            <button type="submit" disabled={createIssueMutation.isPending} className="btn btn-primary trns rounded-sm shadow-md/60 ">{createIssueMutation.isPending ? "Adding..." : "Add"}</button>
        </form>
    )
}