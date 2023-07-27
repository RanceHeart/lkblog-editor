import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import {CookiesProvider} from "react-cookie";
import {GoogleOAuthProvider} from "@react-oauth/google";




ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
        <CookiesProvider>
            <App/>
        </CookiesProvider>
    </GoogleOAuthProvider>
);
