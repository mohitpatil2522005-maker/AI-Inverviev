import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-gray-400">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="space-y-2">
            <span className="text-sm">© 2026 AI Interview SaaS. All rights reserved.</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              GitHub
            </a>
            <a href="#" className="hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
