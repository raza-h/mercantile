import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "antd/dist/reset.css";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import "./styles/antd.theme.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#7A42FF',
        }
      }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
