import { ThemeProvider } from "@/components/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/route";
import { clarity } from "react-microsoft-clarity";

const key = import.meta.env.VITE_MS_CLARITY_KEY;

function App() {
  clarity.init(key);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
