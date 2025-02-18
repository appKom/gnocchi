import { useEffect, useState } from "react";
import Navbar from "../components/universal/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../components/universal/Spinner";
import { Link, useNavigate } from "react-router-dom";
import useAutobankStore from "../store/autobankstore";
import { checkCookie, setCookie } from "../api/authAPI";
import { set } from "lodash";


export interface checkUserResponse {
  success: boolean;
  isadmin: boolean;
  issuperadmin: boolean;
  expiresat: string;
  fullname: string;
}

const Authcallback = () => {


  const { setUserInfo } = useAutobankStore();
  const auth = useAuth0();
  const { isAuthenticated, user, getAccessTokenSilently } = auth;
  const navigate = useNavigate();
  const [loadingStatus, setLoadingStatus] = useState("Henter informasjon");

  const [redirectNotWorking, setRedirectNotWorking] = useState(false);


  const storeUser = async () => {
    try {
      if (isAuthenticated && user) {
        setLoadingStatus("Lagrer informasjon");
        await setCookie(await getAccessTokenSilently());

        setLoadingStatus("Sjekekr informasjon");
        const data = await checkCookie();

        setLoadingStatus("Gyldig informasjon");
        data.fullname = user.name || "";
        setUserInfo(data);

        setLoadingStatus("Videresender");
        setTimeout(() => {
          setRedirectNotWorking(true);
        }
          , 2000);
        navigate("/");
      }
    } catch (e) {
      setLoadingStatus("Feil oppstod");
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
        {!redirectNotWorking && <p className="mt-[20px] text-sm text-green">{loadingStatus}</p>}
        {redirectNotWorking && <Link className="underline" to="/">Videresend manuelt.</Link>}
      </div>
    </div>
  );
};

export default Authcallback;
