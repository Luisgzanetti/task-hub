import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "../screens/home/HomePage";
import LoginPage from "../screens/login/LoginPage";

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
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
}