import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import ContactList from "./pages/ContactList.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContactList />
  </StrictMode>
);
