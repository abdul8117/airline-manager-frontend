import React from "react";
import ReactDOM from "react-dom/client";

import SignInPage from "./pages/SignInPage.jsx";
import Home from "./pages/Home.jsx";
import BuyAirplanes from "./pages/BuyAirplanes.jsx";
import Fleet from "./pages/Fleet.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import AuthProvider from "./components/auth/AuthProvider.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SignInPage showRegisterForm={false} />,
    },
    {
        path: "/login",
        element: <SignInPage showRegisterForm={false} />,
    },
    {
        path: "/register",
        element: <SignInPage showRegisterForm={true} />,
    },
    {
        path: "/home",
        element: <ProtectedRoute />,
        children: [
            {
                path: "",
                element: <Home />,
            },
        ],
    },
    {
        path: "/buy-airplanes",
        element: <ProtectedRoute />,
        children: [
            {
                path: "",
                element: <BuyAirplanes />,
            },
        ],
    },
    {
        path: "/fleet",
        element: <ProtectedRoute />,
        children: [
            {
                path: "",
                element: <Fleet />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>,
);
