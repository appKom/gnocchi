import React from "react";
import Navbar from "./components/universal/Navbar";
import "./App.css";
import FrontPage from "./pages/FrontPage";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <header className="App-header">
        <FrontPage/>
      </header>
    </div>
  );
}

export default App;
