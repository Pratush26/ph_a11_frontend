import { useForm } from "react-hook-form"
import Img from '../../../assets/auth.png'
import '../../../Utils/form.css'
import { Link } from "react-router"
import axios from "axios"
import { showToast } from "../../../Utils/ShowToast"

export default function RegisterPage() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
    const formSubmit = async (data) => {
        try {
      const formData = new FormData();
      formData.append("file", data.photo[0]);  //  photo file
      formData.append("upload_preset", `${import.meta.env.VITE_Cloudinary_Upload_Preset}`);   //  previously created upload preset
      formData.append("folder", "user_images");   //  folder name in cloudinary

      const ImgRes = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_Cloudinary_CloudName}/image/upload`, formData);
      if (!ImgRes?.data?.secure_url) {
        // toast.error("Image upload failed");
        return;
      }

    //   const res = await createUser({ ...data, photo: ImgRes?.data?.secure_url });
    //   if (res.success) {
    //     toast.success(res.message || "Successfully registered");
    //     reset()
    //   } else {
    //     toast.error(res.message || "Something went wrong");
    //   }
    } catch (err) {
      showToast({ type: "error", msg: "Something went wrong!" });
      console.error(err);
    }
    }
    return (
        <div className="grid grid-cols-2 items-center-safe justify-items-center-safe gap-6 m-6 w-11/12 mx-auto">
            <aside className="flex flex-col gap-4 items-center">
                <img src={Img} alt="image" className="w-full h-auto max-w-2xs" />
                <h2 className="text-xl font-semibold">Register at InfraCare Today!</h2>
            </aside>
            <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col items-center gap-3 p-8 pt-12 shadow-md/40 rounded-2xl w-3/4">
                <div className="w-full">
                    {errors.name ? <p className="text-sm text-rose-600">{errors.name.message}</p> : <label htmlFor="name">Name :</label>}
                    <input type="text" {...register("name", { required: "name is required" })} placeholder="Enter your name" id="name" />
                </div>
                <div className="w-full">
                    {errors.email ? <p className="text-sm text-rose-600">{errors.email.message}</p> : <label htmlFor="email">Email :</label>}
                    <input type="email" {...register("email", { required: "email is required" })} placeholder="Enter your email" id="email" />
                </div>
                <div className="w-full">
                    {errors.image ? <p className="text-sm text-rose-600">{errors.image.message}</p> : <label htmlFor="image">Image :</label>}
                    <input type="file" {...register("image", { required: "image is required" })} id="image" />
                </div>
                <div className="w-full">
                    {errors.password ? <p className="text-sm text-rose-600">{errors.password.message}</p> : <label htmlFor="password">Password :</label>}
                    <input type={`password`} {...register("password", { required: "password is required" })} placeholder="Enter password" id="password" />
                </div>
                <div className="w-full text-sm">
                <p>Do you already have an account? <Link to='/login' className="text-blue-500 trns hover:text-blue-700 font-semibold">Login</Link></p>
                </div>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary trns rounded-sm shadow-md/60 disabled:bg-gray-500">{isSubmitting ? "Registering..." : "Register"}</button>
            </form>
        </div>
    )
}