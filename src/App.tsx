import React from "react";
import Navbar from "./components/universal/Navbar";
import "./App.css";
import FrontPage from "./pages/FrontPage";
import { useAuth0 } from "@auth0/auth0-react";
import Router from "./pages/Router";

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
