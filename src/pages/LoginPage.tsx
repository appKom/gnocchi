import Navbar from "../components/universal/Navbar";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {

    const auth = useAuth0();
    const { loginWithRedirect } = auth;

    return (
        <div>
            <Navbar />
            Vennligst <span className="cursor-pointer text-blue-600" onClick={() => loginWithRedirect()}>logg inn</span>
        </div>
    );
};

export default LoginPage;