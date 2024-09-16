import React from "react";
import Navbar from "./components/universal/Navbar";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/universal/Home";
import Authcallback from "./components/authentication/Authcallback";
import LoginPage from "./components/pages/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ReceiptPage from "./components/pages/ReceiptPage";



function App() {

  const { isAuthenticated } = useAuth0();
  const queryClient = new QueryClient()

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
      <div className="App bg-[#2e6e53]">
        {isAuthenticated ?
          <Routes>
            <Route path="/" element={<Home />} /> :
            <Route path="/authentication/callback" element={<Authcallback />} />
            <Route path="/kvittering" element={<ReceiptPage />} />
          </Routes>
          :
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/authentication/callback" element={<Authcallback />} />
          </Routes>
        }
      </div>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
