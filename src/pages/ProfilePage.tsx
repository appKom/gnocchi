import ProfileCard from "../components/profile/ProfileCard";
import Tabs from "../components/profile/Tabs";
import ItemList from "../components/profile/ItemList";
import Navbar from "../components/universal/Navbar";
import { useAuth0 } from "@auth0/auth0-react";

const ProfilePage = () => {
  const auth = useAuth0();
  const { loginWithRedirect } = auth;

  return (
    <div className="flex min-h-screen">
      <div className="hidden sm:block lg:block">
        <ProfileCard />
      </div>
      <div className="flex-grow p-8">
        <Tabs />
        <ItemList />
      </div>
    </div>
  );
};

export default ProfilePage;
