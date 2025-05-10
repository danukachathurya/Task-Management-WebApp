import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Task Central. All rights
              reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-sm hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
