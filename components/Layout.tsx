import React from "react";
import SideBar from "@/components/management/Sidebar";
import Header from "@/components/management/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <SideBar />
      <div className="flex-1 flex-col">
        <Header />
        <main className="flex-1 min-h-[90%] bg-slate-100 rounded-md">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
