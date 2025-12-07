import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import HomePage from "../Pages/Home/Home";
import RegisterPage from "../Pages/Home/Forms/Register";
import LoginPage from "../Pages/Home/Forms/Login";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ErrorPage from "../Layouts/ErrorPage";
import NotfoundPage from "../Layouts/Notfound";
import ManageStaffsPage from "../Pages/Dashboard/admin/ManageStaffs";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: "register",
                Component: RegisterPage
            },
            {
                path: "login",
                Component: LoginPage
            },
        ]
    },
    {
        path: '/',
        Component: DashboardLayout,
        children: [
            {
                path: "dashboard",
                Component: Dashboard
            },
            {
                path: "manage-staffs",
                Component: ManageStaffsPage
            },
        ]
    },
    {
        path: '*',
        Component: NotfoundPage
    }
])