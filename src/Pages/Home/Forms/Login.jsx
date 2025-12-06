import { useForm } from "react-hook-form"
import Img from '../../../assets/auth.png'
import '../../../Utils/form.css'
import { Link, useLocation, useNavigate } from "react-router"
import { useContext } from "react"
import { AuthContext } from "../../../Context/AuthContext"
import { showToast } from "../../../Utils/ShowToast"
import { FcGoogle } from "react-icons/fc"

export default function LoginPage() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
    const { user, sigInUser, googleSignIn } = useContext(AuthContext)
    const { state } = useLocation()
    const navigate = useNavigate()
    if (user) navigate(state || "/")

    const formSubmit = async (data) => {
        try {
            const res = await sigInUser(data.email, data.password);

            if (res) {
                showToast({ type: "success", msg: `Welcome Back, ${res.user?.displayName}` });
                reset()
            }
            else showToast({ type: "error", msg: "Something went wrong!" });
        } catch (err) {
            showToast({ type: "error", msg: `${err.message} || "login failed"` });
            console.error(err);
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const res = await googleSignIn();

            if (res) {
                showToast({ type: "success", msg: `Welcome Back, ${res.user?.displayName}` });
                reset()
            }
            else showToast({ type: "error", msg: "Something went wrong!" });
        } catch (err) {
            showToast({ type: "error", msg: `${err.message} || "Google login failed"` });
            console.error(err);
        }
    }
    
    return (
        <div className="grid grid-cols-2 items-center-safe justify-items-center-safe gap-6 m-6 w-11/12 mx-auto">
            <aside className="flex flex-col gap-4 items-center">
                <img src={Img} alt="image" className="w-full h-auto max-w-2xs" />
                <h2 className="text-xl font-semibold">Welcome back to InfraCare</h2>
            </aside>
            <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col items-center gap-3 p-8 pt-12 shadow-md/40 rounded-2xl w-3/4">
                <div className="w-full">
                    {errors.email ? <p className="text-sm text-rose-600">{errors.email.message}</p> : <label htmlFor="email">Email :</label>}
                    <input type="email" {...register("email", { required: "email is required" })} placeholder="Enter your email" id="email" />
                </div>
                <div className="w-full">
                    {errors.password ? <p className="text-sm text-rose-600">{errors.password.message}</p> : <label htmlFor="password">Password :</label>}
                    <input type={`password`} {...register("password", { required: "password is required", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: "Password must contain at least 8 upper and lowercase characters" } })} placeholder="Enter password" id="password" />
                </div>
                <div className="w-full text-sm">
                    <p>Don't you have an account? <Link to='/register' className="text-blue-500 trns hover:text-blue-700 font-semibold">Register</Link></p>
                </div>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary trns rounded-sm shadow-md/60">{isSubmitting ? "Loging in..." : "Login"}</button>
                <button type="button" onClick={handleGoogleLogin} className="btn btn-out trns flex gap-2 items-center rounded-md"><FcGoogle /> Login in with Google</button>
            </form>
        </div>
    )
}