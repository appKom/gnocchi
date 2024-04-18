import React from "react";
import Navbar from "./components/universal/Navbar";
import "./App.css";
import FrontPage from "./pages/FrontPage";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <FrontPage/>
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
