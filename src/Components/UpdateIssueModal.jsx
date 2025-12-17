import { useForm } from "react-hook-form"
import '../Utils/form.css'
import { showToast } from "../Utils/ShowToast"
import { AuthContext } from "../Context/AuthContext"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"
import { useAxios } from "../Hooks/UseAxios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import Loader from "../Shared/Loader"

export default function UpdateIssueModal({ setIsModalOpened, issue }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title:issue.title,
            category:issue.category,
            location:issue.location,
            description:issue.description
        }
    })
    const axis = useAxios()
    const queryClient = useQueryClient()
    const { data: categoryList, isLoading } = useQuery({
        queryKey: ['categoryList'],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/categories`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
    const createIssueMutation = useMutation({
        mutationFn: async (data) => {
            return axis.patch("/issue", {
                issueId: issue._id,
                title: data.title,
                category: data.category,
                description: data.description,
                location: data.location
            });
        },
        onSuccess: (res) => {
            showToast({ type: "success", msg: res.data.message })
            queryClient.invalidateQueries({ queryKey: ["issues"] })
            queryClient.invalidateQueries({ queryKey: ["issue"] })
            queryClient.invalidateQueries({ queryKey: ["categoryList"] })
        },

        onError: (err) => {
            showToast({
                type: "error",
                msg: err.response?.data?.message || "Something went wrong!"
            })
        }
    });
    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full min-h-[50vh]">
                <Loader />
            </div>
        )
    }
    const formSubmit = (data) => createIssueMutation.mutate(data)
    return (
        <form onSubmit={handleSubmit(formSubmit)} className="absolute bg-white z-90 right-1/2 top-0 translate-x-1/2 flex flex-col items-center gap-3 p-10 shadow-md/40 rounded-2xl w-11/12 md:w-3/4">
            <div className="w-full flex items-center justify-between gap-2">
                <h4 className="text-xl font-bold">Update Issue Details</h4>
                <button onClick={() => setIsModalOpened(false)} type="button" className="cursor-pointer">
                    <RxCross2 />
                </button>
            </div>
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                    {errors.title ? <p className="text-sm text-rose-600">{errors.title.message}</p> : <label htmlFor="title">Title :</label>}
                    <input type="text" {...register("title", { required: "title is required" })} placeholder="Enter report title" id="title" />
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
                    {errors.location ? <p className="text-sm text-rose-600">{errors.location.message}</p> : <label htmlFor="location">Location :</label>}
                    <input type="text" {...register("location", { required: "location is required" })} placeholder="Enter location" id="location" />
                </div>
                <div className="w-full md:col-span-2">
                    {errors.description ? <p className="text-sm text-rose-600">{errors.description.message}</p> : <label htmlFor="description">Description :</label>}
                    <textarea {...register("description", { required: "description is required" })} placeholder="Enter description" id="description" />
                </div>
            </fieldset>
            <button type="submit" disabled={createIssueMutation.isPending} className="btn btn-primary trns rounded-sm shadow-md/60 ">{createIssueMutation.isPending ? "Updating..." : "Update"}</button>
        </form>
    )
}