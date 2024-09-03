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
      <main className="min-h-screen container max-w-none px-20 sm:px-10 lg:px-28">
        <Header />
        <Outlet />
      </main>
      <div className="p-5 text-center bg-black mt-5">
        Made by Aditya Shenoy K
      </div>
    </div>
  );
};

export default AppLayout;
