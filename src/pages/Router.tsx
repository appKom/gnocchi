import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ApplicationPage from './ApplicationPage';
import Authcallback from '../pages/Authcallback';
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

const ADMIN = "admin";
const AUTHENTICATED = "authenticated";
const UNAUTHENTICATED = "unauthenticated";


const Router = () => {

 
    const { userInfo } = useAutobankStore();

    const isAdmin = (): Boolean => {
        return userInfo != null && userInfo.isadmin;
      };
    
    const isAuthenticated = (): Boolean => {
        return userInfo != null;
    }

    const routes: ABRoute[] = [
        { key: "unautenticated-front", path: "/*", element: <FrontPage />, permissions: UNAUTHENTICATED },
        { key: "unautenticated-faq", path: "/faq", element: <FaqPage />, permissions: UNAUTHENTICATED },
        { key: "auth-callback", path: "/authentication/callback", element: <Authcallback />, permissions: UNAUTHENTICATED },

        { key: "authenticated-receipt", path: "/kvittering", element: <ReceiptPage />, permissions: AUTHENTICATED },
        { key: "authenticated-profile", path: "/minside", element: <ProfilePage />, permissions: AUTHENTICATED },
        { key: "authenticated-application", path: "/soknad", element: <ApplicationPage />, permissions: AUTHENTICATED },
        { key: "user-review-receipt", path: "/minside/:receiptid", element: <DetailedReceiptPage />, permissions: AUTHENTICATED },
        
        { key: "admin-main", path: "/admin/", element: <AdminMainPage />, permissions: ADMIN },
        { key: "admin-receipt-page", path: "/admin/kvittering", element: <AdminReceiptPage />, permissions: ADMIN },
        { key: "admin-economic-request", path: "/admin/soknad", element: <AdminEconomicRequestPage />, permissions: ADMIN },
        { key: "admin-review-receipt", path: "/admin/kvittering/:receiptid", element: <AdminReviewReceiptPage />, permissions: ADMIN },
    ];

    const userpermissions = isAdmin() ? ADMIN : isAuthenticated() ? AUTHENTICATED : UNAUTHENTICATED;

    return (
    <BrowserRouter> 
        <Routes>
            {routes.filter(x => (userpermissions == ADMIN) ? true : (userpermissions == AUTHENTICATED) ? [UNAUTHENTICATED, AUTHENTICATED].includes(x.permissions) : x.permissions == UNAUTHENTICATED).map(route => {
                return (
                    <Route key={route.key} path={route.path} element={route.element} />
                )
            })}
        </Routes>
    </BrowserRouter>
    )
}

export default Router;