import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './src/pages/Welcome';
import DoctorPage from './src/pages/Doctor';
import LabTestsPage from './src/pages/Lab Tests';
import NinjaXPage from './src/pages/NinjaX';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Navigate to="/doctors" replace />} />
        <Route path="/doctors" element={<DoctorPage />} />
        <Route path="/lab-tests" element={<LabTestsPage />} />
        <Route path="/ninjax" element={<NinjaXPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;