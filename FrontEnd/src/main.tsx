import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ContactList from "./pages/ContactList.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContactList />
  </StrictMode>
);
