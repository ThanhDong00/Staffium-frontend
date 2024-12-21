import React from "react";
import SideBar from "@/components/management/Sidebar";
import AppSidebar from "./AppSidebar/AppSidebar";
import Header from "@/components/management/Header";
import { SidebarProvider } from "./ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-1">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="min-h-[90%] bg-slate-100 rounded-md flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
