"use client";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-600">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">

          <p className="text-sm">&copy; 2025 Expense Tracker. All rights reserved.</p>

  
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="hover:text-indigo-600">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-indigo-600">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-indigo-600">
              <FaXTwitter size={20} />
            </a>
            <a href="#" className="hover:text-indigo-600">
              <FaGithub size={20} />
            </a>
            <a href="#" className="hover:text-indigo-600">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
