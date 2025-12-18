import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useAxios } from "../Hooks/UseAxios";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { showToast } from "../Utils/ShowToast";
import axios from "axios";
import { MdEdit } from "react-icons/md";

export default function UpdateProfilePic() {
    const { userInfo, updateUser } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: userInfo?.name,
            phone: userInfo?.phone,
            address: userInfo?.address
        }
    })
    const axis = useAxios()
    const [isModalOpened, setIsModalOpened] = useState(false)
    const handleUpdate = async (data) => {
        try {
            const formData = new FormData();
            formData.append("file", data.image[0]);
            formData.append("upload_preset", import.meta.env.VITE_Cloudinary_Upload_Preset);
            formData.append("folder", "user_images");

            const ImgRes = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_Cloudinary_CloudName}/image/upload`, formData);
            if (!ImgRes?.data?.secure_url) throw new Error("Image upload failed");

            await updateUser(data.name, ImgRes.data.secure_url);
            const res = await axis.patch("/userImg", { photo: ImgRes?.data?.secure_url})
            if (res.data.success) {
                showToast({ type: "success", msg: "Successfully Updated your profile picture!" });
                reset()
            } else showToast({ type: "error", msg: res.data.response.data.message || "Something went wrong!" });
        } catch (error) {
            showToast({ type: "error", msg: error.data.response.data.message || "Something went wrong!" });
            console.error(error)
        }
    }
    return (
        <div className="relative">
            <button onClick={() => setIsModalOpened(!isModalOpened)} title="update profile picture" className="trns hover:scale-110 cursor-pointer"><MdEdit className="text-3xl -mr-2" /></button>
            {
                isModalOpened
                &&
                <form onSubmit={handleSubmit(handleUpdate)} className="absolute bg-white z-90 right-1/2 top-0 translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 p-10 shadow-md/40 rounded-2xl min-w-xs">
                    <div className="w-full flex items-center justify-between gap-2">
                        <h4 className="text-lg font-bold">Update Profile Picture</h4>
                        <button onClick={() => setIsModalOpened(false)} type="button" className="cursor-pointer">
                            <RxCross2 />
                        </button>
                    </div>
                    <div className="w-full">
                        {errors.image ? <p className="text-sm text-rose-600">{errors.image.message}</p> : <label htmlFor="image">Image :</label>}
                        <input type="file" {...register("image", { required: "image is required" })} id="image" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary trns rounded-sm shadow-md/60 ">{isSubmitting ? "Updating..." : "Update"}</button>
                </form>
            }
        </div>
    )
}