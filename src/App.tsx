import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PlayerList } from './components/PlayerList';
import { MatchDetails } from './components/MatchDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayerList />} />
        <Route path="/match/:matchId" element={<MatchDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
