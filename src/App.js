import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/home';
import Details from './pages/details';
import Login from './pages/login';
import TierList from './pages/tierlist';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:username" element={<Home />} />
          <Route path="/details/:title/:name" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tier-list" element={<TierList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;