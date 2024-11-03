import ProfileCard from "../components/profile/ProfileCard";
import Tabs from "../components/profile/Tabs";
import ItemList from "../components/profile/ItemList";
import Navbar from "../components/universal/Navbar";
import { useAuth0 } from "@auth0/auth0-react";

const FaqPage = () => {
  const auth = useAuth0();
  const { loginWithRedirect } = auth;

  return (
    <div className="flex min-h-screen">
      <ProfileCard />
      <div className="ml-5 mr-5 rounded-xl flex-grow p-8 bg-[#669782] h-full">
        <Tabs />
        <ItemList />
      </div>
    </div>
  );
};

export default FaqPage;
