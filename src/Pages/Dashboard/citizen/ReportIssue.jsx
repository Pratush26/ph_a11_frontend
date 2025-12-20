import { useForm } from "react-hook-form"
import '../../../Utils/form.css'
import axios from "axios"
import { useAxios } from "../../../Hooks/UseAxios"
import { showToast } from "../../../Utils/ShowToast"
import Error from "../../../Shared/Error"
import Loader from "../../../Shared/Loader"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export default function ReportIssue() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const axis = useAxios()
    const queryClient = useQueryClient()

    const { data: categoryList, isLoading, error: dataError } = useQuery({
        queryKey: ['categoryList'],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/categories`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })

    const createIssueMutation = useMutation({
        mutationFn: async (data) => {
            const formData = new FormData()
            formData.append("file", data.image[0])
            formData.append("upload_preset", import.meta.env.VITE_Cloudinary_Upload_Preset)
            formData.append("folder", "issue_images")

            const imgRes = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_Cloudinary_CloudName}/image/upload`, formData)

            if (!imgRes?.data?.secure_url) throw new Error("Image upload failed")

            return axis.post("/issue", {
                title: data.title,
                category: data.category,
                description: data.description,
                location: data.location,
                photo: imgRes.data.secure_url,
            })
        },

        onSuccess: (res) => {
            showToast({ type: "success", msg: res.data.message })
            reset()
            queryClient.invalidateQueries({ queryKey: ["issues"] })
            queryClient.invalidateQueries({ queryKey: ["categoryList"] })
            queryClient.invalidateQueries({ queryKey: ["citizens"] })
        },

        onError: (err) => {
            showToast({ type: "error", msg: err.response?.data?.message || "Something went wrong!" })
        }
    })

    if (isLoading) return (
        <div className="flex w-full min-h-[90vh] items-center justify-center">
            <Loader />
        </div>
    )
    if (dataError) return <Error msg={dataError.message} />;

    const formSubmit = (data) => createIssueMutation.mutate(data)

    return (
        <form onSubmit={handleSubmit(formSubmit)} className="bg-white flex flex-col items-center gap-3 p-10 shadow-md/40 rounded-2xl w-11/12 md:w-3/4 mx-auto my-8">
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <legend className="text-center font-bold text-3xl my-4">Add Report</legend>
                <div className="w-full">
                    {errors.title ? <p className="text-sm text-rose-600">{errors.title.message}</p> : <label htmlFor="title">Title :</label>}
                    <input type="text" {...register("title", { required: "title is required" })} placeholder="Enter report title" id="title" />
                </div>
                <div className="w-full">
                    {errors.image ? <p className="text-sm text-rose-600">{errors.image.message}</p> : <label htmlFor="image">Image :</label>}
                    <input type="file" {...register("image", { required: "image is required" })} id="image" />
                </div>
                <div className="w-full">
                    {errors.location ? <p className="text-sm text-rose-600">{errors.location.message}</p> : <label htmlFor="location">Location :</label>}
                    <input type="text" {...register("location", { required: "location is required" })} placeholder="Enter location" id="location" />
                </div>
                <div className="w-full">
                    {errors.category ? <p className="text-sm text-rose-600">{errors.category.message}</p> : <label htmlFor="category">category :</label>}
                    <input type="text" {...register("category", { required: "category is required" })} list="categories" placeholder="Enter category" id="category" />
                    <datalist id="categories">
                        {
                            categoryList?.map(e => <option key={e._id} value={e.name} className="capitalize">{e.name}</option>)
                        }
                    </datalist>
                </div>
                <div className="w-full md:col-span-2">
                    {errors.description ? <p className="text-sm text-rose-600">{errors.description.message}</p> : <label htmlFor="description">Description :</label>}
                    <textarea {...register("description", { required: "description is required" })} placeholder="Enter description" id="description" />
                </div>
            </fieldset>
            <button
                type="submit"
                disabled={createIssueMutation.isPending}
                className="btn btn-primary trns rounded-sm shadow-md/60 ">
                {createIssueMutation.isPending ? "Adding..." : "Add"}
            </button>
        </form>
    )
}