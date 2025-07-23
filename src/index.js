import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://bmsso.duckdns.org/',
  realm: 'bitlabs',
  clientId: 'telentStream',
});

// // Function to load the Tidio script
// function loadTidioScript() {
//   const script = document.createElement('script');
//   script.src = "//code.tidio.co/wpu5hre78erukppaxms2pcge39ckekpy.js";
//   script.async = true;
//   document.body.appendChild(script);
// }

// Load the Tidio script when the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', loadTidioScript);

keycloak
  .init({
    onLoad: "login-required",
    checkLoginIframe: false,
    responseMode: "query",
    redirectUri: window.location.origin + "/dashboard",
  })
  .then((authenticated) => {
    if (authenticated) {
      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(
        <React.StrictMode>
          <GoogleOAuthProvider clientId="33884279909-pupqt6eev817ebnudqfgar1ei8bqtbck.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>
        </React.StrictMode>
      );

      reportWebVitals();
    } else {
      window.location.reload();
    }
  })
  .catch((error) => {
    console.error("Keycloak initialization failed:", error);
    window.location.reload();
  });
