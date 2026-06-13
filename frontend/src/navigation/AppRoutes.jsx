import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "../screens/home/HomePage";
import LoginPage from "../screens/login/LoginPage";
import EditTask from "../screens/EditTask/EditTask";

export default function AppRoutes() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <LoginPage />
        },
        {
            path: '/home',
            element: <HomePage />
        },
        {
            path: '/login',
            element: <LoginPage />
        },
        {
            path: '/edit/:id',
            element: <EditTask taskId={id} />
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
}