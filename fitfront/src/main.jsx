import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {App } from './components/App'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';






// Create root
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
