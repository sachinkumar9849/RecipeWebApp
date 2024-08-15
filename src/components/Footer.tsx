import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
        </p>
        <div className="mt-2">
          <a href="#" className="text-gray-400 hover:text-gray-300 mx-2">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 mx-2">
            Terms of Service
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 mx-2">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
