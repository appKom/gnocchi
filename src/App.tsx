import React from "react";
import Navbar from "./components/universal/Navbar";
import "./App.css";
import FrontPage from "./pages/FrontPage";
import { useAuth0 } from "@auth0/auth0-react";
import Router from "./pages/Router";
import Authcallback from "./components/authentication/Authcallback";
import ReceiptPage from "./pages/ReceiptPage";
import AdminMainPage from "./pages/admin/AdminMainPage";
import AdminReceiptPage from "./pages/admin/AdminReceiptPage";
import AdminEconomicRequestPage from "./pages/admin/AdminEconomicRequestPage";
import ApplicationPage from "./pages/ApplicationPage";
import Footer from "./components/universal/Footer";
import FaqPage from "./pages/FaqPage";
import AdminReviewReceiptPage from "./pages/admin/AdminReviewReceiptPage";
import ProfilePage from "./pages/ProfilePage";

import { logoutUser } from "./utils/userutils";
import useAutobankStore from "./store/autobankstore";
import DetailedReceiptPage from "./pages/DetailedReceiptPage";


function App() {


  const { setUserInfo, userInfo } = useAutobankStore();
  const auth = useAuth0();
  const { logout } = auth;

  if (userInfo != null) { 
    if (Date.now() >= new Date(userInfo.expiresat).getTime()) {
      setUserInfo(null);
      logoutUser();
      logout();
    }
  }

  

  return (
   
      <div className="App bg-[#2e6e53]">
        <Navbar />
        <Router/>
             <Footer />
      </div>  


  );
}

export default App;
