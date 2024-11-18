import React, { useLayoutEffect } from 'react'
import AppRoutes from './routing/AppRoutes'
import { ToastContainer } from 'react-toastify'
import { IS_PROD } from './config/app.config'
import WebApp from '@twa-dev/sdk'

const App = () => {
    useLayoutEffect(() => {
        WebApp.ready();
        WebApp.expand();
        
        if (IS_PROD) {
            document.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            });
        }
    }, [IS_PROD]);

    return (
        <React.StrictMode>
            <AppRoutes />
            <ToastContainer />
        </React.StrictMode>
    );
};

export default App;