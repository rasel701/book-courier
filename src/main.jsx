import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import router from "./routes/Routes.jsx";
import AuthContext from "./ContextAPI/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "./ContextAPI/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthContext>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthContext>
    </ThemeProvider>
  </StrictMode>
);
