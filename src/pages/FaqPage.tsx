import { useAuth } from "react-oidc-context";
import Navbar from "../components/universal/Navbar";

const FaqPage = () => {
  const auth = useAuth();
  const { signinRedirect } = auth;

  return (
    <div>
      <h2 className="mt-[100px] font-bold text-xl text-white">
        Vennligst{" "}
        <span
          className="cursor-pointer text-blue-200 underline"
          onClick={() => signinRedirect()}
        >
          logg inn
        </span>
      </h2>
    </div>
  );
};

export default FaqPage;
