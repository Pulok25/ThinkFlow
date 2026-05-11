import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/HomePage/Home";
import Login from "../pages/LoginPage/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/RegisterPage/Register";


const router = createBrowserRouter([
    {
        path: '',
        element:<MainLayout/>,
        children: [{
            path: "",
            element: <Home/>,
        },
        
    ]
    },
    {
        path: '/',
        element:<AuthLayout/>,
        children: [{
            path: '/login',
            element: <Login/>,
        },
        {
            path: '/register',
            element: <Register/>,
        }
    ]
    }
])

export default router;