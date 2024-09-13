import React from "react";
import Navbar from "./components/universal/Navbar";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/universal/Home";
import Authcallback from "./components/authentication/Authcallback";



function App() {

  const { isAuthenticated } = useAuth0();

  return (
    <Router>
    <div className="App">
      <Routes>
      
      { isAuthenticated ? 
    
      <Route path="/" element={<Home />}  /> : 
      <Route path="/" element={<Navbar authenticated={false} />} />
      }
      <Route path="/authentication/callback" element={<Authcallback />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
