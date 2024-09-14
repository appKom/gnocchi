import { useEffect } from "react";
import Navbar from "../universal/Navbar";
import { useAuth0 } from "@auth0/auth0-react";

interface checkUserResponse {
    success: boolean;
    isadmin: boolean;
}

const Authcallback = () => {

    const BACKEND_URI = import.meta.env.VITE_BACKEND_URI as string;

    const auth = useAuth0();
    const { isAuthenticated, user, getAccessTokenSilently } = auth;

    const storeUser = async () => {

        try {
            if (isAuthenticated && user) {
                const res: Response = await fetch(`${BACKEND_URI}/api/auth/check`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${await getAccessTokenSilently()}`
                    }
                });

                /* Temporary solution */
                if (!res.ok) {
                    throw new Error("Failed to fetch user");
                } 
                const data: checkUserResponse = await res.json();
                if (!data.success) {
                    throw new Error("Failed to fetch user");
                }
                /* ----- */

                localStorage.setItem("onlineauth0login", JSON.stringify(data));
                localStorage.setItem("onlineauth0user", JSON.stringify(user));
                window.location.href = "/";

            }
        }
        catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        storeUser();
    }, [isAuthenticated, user]);

    return <div>
        <Navbar />
        Vennligst vent...
    </div>;
}

export default Authcallback;