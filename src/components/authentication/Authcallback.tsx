import { useEffect } from "react";
import Navbar from "../universal/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../universal/Spinner";
import { useNavigate } from "react-router-dom";
import  useAutobankStore from "../../store/autobankstore";
import { USER_STORAGE_KEY } from "../../utils/constants";

export interface checkUserResponse {
  success: boolean;
  isadmin: boolean;
  issuperadmin: boolean;
  expiresat: string;
  fullname: string;
}

const Authcallback = () => {
  const BACKEND_URI = import.meta.env.VITE_BACKEND_URI as string;
  const { setUserInfo } = useAutobankStore();

  const auth = useAuth0();
  const { isAuthenticated, user, getAccessTokenSilently } = auth;
  const navigate = useNavigate();

  const storeUser = async () => {
    try {
      if (isAuthenticated && user) {
        const res: Response = await fetch(`${BACKEND_URI}/api/auth/setuser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
          credentials: "include",
        });

        /* Temporary solution */
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        } else {

        const res2: Response = await fetch(`${BACKEND_URI}/api/auth/getuser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        /* Temporary solution */
        if (!res2.ok) {
          throw new Error("Failed to fetch user");
        }
        const data: checkUserResponse = await res2.json();
        if (!data.success) {
          throw new Error("Failed to fetch user");
        }
        /* ----- */

        data.fullname = user.name || "";

        setUserInfo(data);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));

        navigate("/");
      }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    storeUser();
  }, [isAuthenticated, user]);
  return (
    <div>
      <div className="mt-[100px] font-bold text-xl text-white">
        <Spinner size={4} color="green" />
        <p className="mt-[20px] text-green">Vennligst vent</p>
      </div>
    </div>
  );
};

export default Authcallback;
