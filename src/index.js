import { createRoot } from 'react-dom/client';
import React from 'react';

import App from './App';
import { BrowserRouter } from "react-router-dom"; // Используем BrowserRouter вместо RouterProvider

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter> {/* Заменяем RouterProvider на BrowserRouter */}
    <App/>
  </BrowserRouter>
);
