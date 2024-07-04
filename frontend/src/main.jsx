import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactApp from './ContactApp.jsx';
import './index.css';
import './ContactApp.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
