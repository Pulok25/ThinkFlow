import { Navigate } from "react-router";
import { useAuth } from "../Auth/AuthContext";

export default function PrivateRoute({children}) {
    const {user, loading} = useAuth()
    
    console.log("user:", user, "loading:", loading)

    if(loading){
        return(
            <div className="min-h-screen flex items-center justify-center">
               <span className="loading loading-spinner loading-lg text-[#6f7bf7]"/>
            </div>
        )
    }
    return user ? children : <Navigate to="/login" />
}