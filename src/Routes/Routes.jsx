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
import ManageUsersPage from "../Pages/Dashboard/admin/ManageUsers";
import ReportIssue from "../Pages/Dashboard/citizen/ReportIssue";
import MyIssuePage from "../Pages/Dashboard/citizen/MyIssues";
import AllIssuesPage from "../Pages/Home/AllIssues";
import IssueDetails from "../Pages/Home/IssueDetails";
import AfterPayment from "../Pages/Home/Payment/AfterPayment";
import AssignIssues from "../Pages/Dashboard/admin/AssignIssues";
import TransactionsPage from "../Pages/Dashboard/admin/Transactions";
import LoadingUi from "../Layouts/LoadingUi";
import TermsCondition from "../Pages/Home/Terms";
import ContactPage from "../Pages/Home/Contact";
import Profile from "../Pages/Dashboard/Profile";
import AboutUsPage from "../Pages/Home/About";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        hydrateFallbackElement: <LoadingUi />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: "all-issues",
                Component: AllIssuesPage
            },
            {
                path: "issue-details/:id",
                Component: IssueDetails
            },
            {
                path: "register",
                Component: RegisterPage
            },
            {
                path: "login",
                Component: LoginPage
            },
            {
                path: "after-payment",
                Component: AfterPayment
            },
            {
                path: "contact",
                Component: ContactPage
            },
            {
                path: "about",
                Component: AboutUsPage
            },
            {
                path: "terms",
                Component: TermsCondition
            },
        ]
    },
    {
        path: '/',
        // hydrateFallbackElement: <LoadingUi />,
        // errorElement: <ErrorPage />,
        Component: DashboardLayout,
        children: [
            {
                path: "dashboard",
                Component: Dashboard
            },
            {
                path: "profile",
                Component: Profile
            },
            {
                path: "manage-staffs",
                Component: ManageStaffsPage
            },
            {
                path: "manage-users",
                Component: ManageUsersPage
            },
            {
                path: "assign-issues",
                Component: AssignIssues
            },
            {
                path: "transactions",
                Component: TransactionsPage
            },
            {
                path: "report-issue",
                Component: ReportIssue
            },
            {
                path: "my-issues",
                Component: MyIssuePage
            },
        ]
    },
    {
        path: '*',
        Component: NotfoundPage
    }
])