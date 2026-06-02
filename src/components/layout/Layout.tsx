import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-purple-900 text-white text-base sm:text-lg">
      <Navbar />
      <div className="flex flex-col md:flex-row md:h-[calc(100vh_-_4rem)]">
        <Sidebar className="w-full md:w-64 flex-shrink-0" />
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
