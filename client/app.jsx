import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './src/pages/Welcome';
import DoctorPage from './src/pages/Doctor';
import HealthRecordsPage from './src/pages/HealthRecords';
import ChatBotPage from './src/pages/ChatBot';
import NinjaXPage from './src/pages/NinjaX';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Navigate to="/doctors" replace />} />
        <Route path="/doctors" element={<DoctorPage />} />
        <Route path="/health-records" element={<HealthRecordsPage />} />
        <Route path="/ai-assistant" element={<ChatBotPage />} />
        <Route path="/lab-tests" element={<Navigate to="/health-records" replace />} />
        <Route path="/ninjax" element={<NinjaXPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;