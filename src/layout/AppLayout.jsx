import StarBackground from "../components/StarBackground";
import "../App.css";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background">
        <StarBackground />
      </div>
      <div className="px-2">
        <Header />
      </div>

      <main className="min-h-screen container max-w-none px-10 sm:px-10 lg:px-28">
        <Outlet />
      </main>
      <div className="flex justify-center w-full py-10">
        Made by Aditya Shenoy K
      </div>
    </div>
  );
};

export default AppLayout;
