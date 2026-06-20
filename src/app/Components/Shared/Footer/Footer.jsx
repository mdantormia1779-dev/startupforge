import React from "react";
import { Globe, Mail, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0d0f17] text-white py-16 px-6 md:px-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">StartupForge</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            The elite workspace for the next generation of visionary founders
            and high-velocity builders.
          </p>
          <div className="flex gap-4 pt-2">
            <Globe
              className="text-gray-500 hover:text-white cursor-pointer"
              size={20}
            />
            <Mail
              className="text-gray-500 hover:text-white cursor-pointer"
              size={20}
            />
          </div>
        </div>

        {/* Platform Links */}
        <div>
          <h3 className="font-semibold mb-4">Platform</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Discover
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Collaborate
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Funding
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Hiring
              </a>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Manifesto
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms
              </a>
            </li>
          </ul>
        </div>

        {/* Stay Updated */}
        <div className="space-y-4">
          <h3 className="font-semibold">Stay Updated</h3>
          <p className="text-gray-400 text-sm">
            Curated insights delivered weekly.
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-[#161922] border border-gray-700 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-gray-500"
            />
            <button className="absolute right-2 top-2 text-[#8b5cf6]">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2024 StartupForge. All rights reserved.</p>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          System Operational
        </div>
      </div>
    </footer>
  );
};

export default Footer;
