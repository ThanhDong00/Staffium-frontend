import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto py-8 bg-slate-100">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          <div className="space-y-2">
            <Link
              href="#"
              className="block text-sm text-gray-600 hover:text-foreground "
            >
              Figma
            </Link>
            <Link
              href="#"
              className="block text-sm text-gray-600 hover:text-foreground "
            >
              Client source
            </Link>
            <Link
              href="#"
              className="block text-sm text-gray-600 hover:text-foreground "
            >
              Server source
            </Link>
          </div>

          <div className="text-sm text-gray-600">
            © Copyright Khải & Đông 2024
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
