import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import HomePage from "../Pages/Home/Home";
import RegisterPage from "../Pages/Home/Forms/Register";
import LoginPage from "../Pages/Home/Forms/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
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
    }
])