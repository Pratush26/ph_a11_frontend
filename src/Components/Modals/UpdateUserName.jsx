import { useContext, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { showToast } from "../../Utils/ShowToast";
import { AuthContext } from "../../Context/AuthContext";
import { useAxios } from "../../Hooks/UseAxios";

export default function UpdateUserName() {
    const { userInfo, updateUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
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
            await updateUser(data.name, userInfo?.photoURL);
            const res = await axis.patch("/userInfo", {
                email: userInfo?.email,
                name: data.name,
                phone: data.phone,
                address: data.address
            })
            if (res.data.success) showToast({ type: "success", msg: "Successfully Updated your profile details!" });
            else showToast({ type: "error", msg: res.data.response.data.message || "Something went wrong!" });
        } catch (error) {
            showToast({ type: "error", msg: error.data.response.data.message || "Something went wrong!" });
            console.error(error)
        }
    }
    return (
        <div className="relative">
            <button onClick={() => setIsModalOpened(!isModalOpened)} className="btn btn-primary trns flex items-center gap-2 rounded-md"><FiEdit3 /> Edit Profile Info</button>
            {
                isModalOpened
                &&
                <form onSubmit={handleSubmit(handleUpdate)} className="absolute bg-white z-90 right-1/2 top-0 translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 p-10 shadow-md/40 rounded-2xl min-w-xs">
                    <div className="w-full flex items-center justify-between gap-2">
                        <h4 className="text-xl font-bold">Update Profile Info</h4>
                        <button onClick={() => setIsModalOpened(false)} type="button" className="cursor-pointer">
                            <RxCross2 />
                        </button>
                    </div>
                    <div className="w-full">
                        {errors.name ? <p className="text-sm text-rose-600">{errors.name.message}</p> : <label htmlFor="name">Name :</label>}
                        <input type="text" {...register("name", { required: "name is required" })} placeholder="Enter name" id="name" />
                    </div>
                    <div className="w-full">
                        {errors.phone ? <p className="text-sm text-rose-600">{errors.phone.message}</p> : <label htmlFor="phone">Phone Number :</label>}
                        <input type="tel" {...register("phone", { required: "phone is required" })} placeholder="Enter phone number" id="phone" />
                    </div>
                    <div className="w-full">
                        {errors.address ? <p className="text-sm text-rose-600">{errors.address.message}</p> : <label htmlFor="address">Address :</label>}
                        <input type="text" {...register("address", { required: "address is required" })} placeholder="Enter address" id="address" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary trns rounded-sm shadow-md/60 ">{isSubmitting ? "Updating..." : "Update"}</button>
                </form>
            }
        </div>
    )
}