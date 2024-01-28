import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@styles/global.css";
import { AuthProvider } from "@context/authContext.tsx";
import { MantineProvider } from "@mantine/core";
import { theme } from "@styles/theme.ts";
import { CampaignProvider } from "@context/campaignContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <CampaignProvider>
          <App />
        </CampaignProvider>
      </MantineProvider>
    </AuthProvider>
  </React.StrictMode>
);
