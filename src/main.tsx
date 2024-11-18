// Add before using library
// require("buffer");

import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import WebApp from '@twa-dev/sdk';
import App from './App.tsx';
import colors from './config/colors.ts';

WebApp.setBackgroundColor(colors.background[1] as `#${string}`);
WebApp.setHeaderColor(colors.background[1] as `#${string}`);

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
