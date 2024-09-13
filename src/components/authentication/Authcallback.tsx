import { useEffect } from "react";
import Navbar from "../universal/Navbar";
import { useAuth0 } from "@auth0/auth0-react";

const Authcallback = () => {

    const auth = useAuth0();
    const { isAuthenticated, user, getAccessTokenSilently } = auth;

    const storeUser = async () => {

        try {
            if (isAuthenticated && user) {
                const token = await getAccessTokenSilently();
                localStorage.setItem("onlineauth0token", token);
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