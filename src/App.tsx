import React from "react";
import Navbar from "./components/universal/Navbar";
import "./App.css";
import FrontPage from "./pages/FrontPage";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authcallback from "./components/authentication/Authcallback";
import ReceiptPage from "./pages/ReceiptPage";
import AdminMainPage from "./pages/admin/AdminMainPage";
import AdminReceiptPage from "./pages/admin/AdminReceiptPage";
import AdminEconomicRequestPage from "./pages/admin/AdminEconomicRequestPage";
import ApplicationPage from "./pages/ApplicationPage";
import Footer from "./components/universal/Footer";
import FaqPage from "./pages/FaqPage";
import AdminReviewReceiptPage from "./pages/admin/AdminReviewReceiptPage";
import { USER_STORAGE_KEY } from "./utils/constants";
import { logoutUser } from "./utils/userutils";
import useAutobankStore from "./store/autobankstore";

function App() {

  const { setUserInfo, userInfo } = useAutobankStore();

  const isAdmin = (): Boolean => {
    return userInfo != null && userInfo.isadmin;
  };

  const isAuthenticated = (): Boolean => {
    return userInfo != null;
  }
  console.log(userInfo);
  if (userInfo != null) {
    console.log("Checking token expiration");
  
  console.log(userInfo.expiresat);
  console.log(new Date(userInfo.expiresat).getTime() * 1000);
  console.log(Date.now());
  
    if (Date.now() >= new Date(userInfo.expiresat).getTime()) {
      console.log("Token expired");
      setUserInfo(null);
      logoutUser();
    }
  }

  const routes = {
    unautenticated: [
      <Route key="unautenticated-front" path="/*" element={<FrontPage />} />,
      <Route key="unautenticated-faq" path="/faq" element={<FaqPage />} />,
      <Route
        key="auth-callback"
        path="/authentication/callback"
        element={<Authcallback />}
      />,
    ],
    authenticated: [
      <Route key="authenticated-front" path="/" element={<FrontPage />} />,
      <Route
        key="authenticated-receipt"
        path="/kvittering"
        element={<ReceiptPage />}
      />,
      <Route
        key="authenticated-application"
        path="/soknad"
        element={<ApplicationPage />}
      />,
      <Route key="authenticated-faq" path="/faq" element={<FaqPage />} />,
      <Route
        key="auth-callback"
        path="/authentication/callback"
        element={<Authcallback />}
      />,
    ],
    admin: [
      <Route key="admin-front" path="/" element={<FrontPage />} />,
      <Route
        key="admin-receipt"
        path="/kvittering"
        element={<ReceiptPage />}
      />,
      <Route
        key="admin-application"
        path="/soknad"
        element={<ApplicationPage />}
      />,
      <Route key="admin-faq" path="/faq" element={<FaqPage />} />,
      <Route key="admin-main" path="/admin/" element={<AdminMainPage />} />,
      <Route
        key="admin-receipt-page"
        path="/admin/kvittering"
        element={<AdminReceiptPage />}
      />,
      <Route
        key="admin-economic-request"
        path="/admin/soknad"
        element={<AdminEconomicRequestPage />}
      />,
      <Route
        key="admin-review-receipt"
        path="/admin/kvittering/:receiptid"
        element={<AdminReviewReceiptPage />}
      />,
      <Route
        key="auth-callback"
        path="/authentication/callback"
        element={<Authcallback />}
      />,
    ],
  };

  return (
    <Router>
      <div className="App bg-[#2e6e53]">
        <Navbar />
        <Routes>
          {isAdmin()
            ? routes.admin
            : isAuthenticated()
              ? routes.authenticated
              : routes.unautenticated}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
