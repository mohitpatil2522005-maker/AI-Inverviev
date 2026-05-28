import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-purple-900 text-white">
      <Navbar />
      <div className="flex flex-col md:flex-row md:h-[calc(100vh_-_3rem)]">
        <Sidebar className="w-64 md:w-64" />
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
