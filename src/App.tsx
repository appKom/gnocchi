import React from 'react';
import Navbar from "./components/universal/Navbar";
import "./App.css";
import ReceiptRegular from './components/pages/Reciept_regular';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <header className="App-header">
              <p>Autobank</p>
            </header>
          } />
          <Route path="/kvittering" element={<ReceiptRegular />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
