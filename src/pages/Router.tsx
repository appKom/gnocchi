
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import ApplicationPage from './ApplicationPage';
import Authcallback from '../components/authentication/Authcallback';
import FaqPage from './FaqPage';
import FrontPage from './FrontPage';
import ReceiptPage from './ReceiptPage';
import ProfilePage from './ProfilePage';
import AdminMainPage from './admin/AdminMainPage';
import AdminReceiptPage from './admin/AdminReceiptPage';
import AdminEconomicRequestPage from './admin/AdminEconomicRequestPage';
import AdminReviewReceiptPage from './admin/AdminReviewReceiptPage';
import DetailedReceiptPage from './DetailedReceiptPage';

import  useAutobankStore  from '../store/autobankstore';





interface ABRoute {
    key: string;
    element: JSX.Element;
    path: string;
    permissions: string;
}

const Router = () => {

    const { userInfo } = useAutobankStore();

    const isAdmin = (): Boolean => {
        return userInfo != null && userInfo.isadmin;
      };
    
    const isAuthenticated = (): Boolean => {
        return userInfo != null;
    }

    const routes: ABRoute[] = [
        { key: "unautenticated-front", path: "/*", element: <FrontPage />, permissions: "unauthenticated" },
        { key: "unautenticated-faq", path: "/faq", element: <FaqPage />, permissions: "unauthenticated" },
        { key: "auth-callback", path: "/authentication/callback", element: <Authcallback />, permissions: "unauthenticated" },

        { key: "authenticated-receipt", path: "/kvittering", element: <ReceiptPage />, permissions: "authenticated" },
        { key: "authenticated-profile", path: "/minside", element: <ProfilePage />, permissions: "authenticated" },
        { key: "authenticated-application", path: "/soknad", element: <ApplicationPage />, permissions: "authenticated" },
        { key: "user-review-receipt", path: "/minside/:receiptid", element: <DetailedReceiptPage />, permissions: "authenticated" },
        
        { key: "admin-main", path: "/admin/", element: <AdminMainPage />, permissions: "admin" },
        { key: "admin-receipt-page", path: "/admin/kvittering", element: <AdminReceiptPage />, permissions: "admin" },
        { key: "admin-economic-request", path: "/admin/soknad", element: <AdminEconomicRequestPage />, permissions: "admin" },
        { key: "admin-review-receipt", path: "/admin/kvittering/:receiptid", element: <AdminReviewReceiptPage />, permissions: "admin" },
    ];


    const permissionlevels = ["unauthenticated", "authenticated", "admin"];
    const userpermissions = isAdmin() ? "admin" : isAuthenticated() ? "authenticated" : "unauthenticated";

    return (
    <BrowserRouter> 
        <Routes>
            {routes.filter(x => permissionlevels.indexOf(x.permissions) <= permissionlevels.indexOf(userpermissions)).map(route => {
                return (
                    <Route key={route.key} path={route.path} element={route.element} />
                )
            })}
        </Routes>
    </BrowserRouter>
    )
}

export default Router;