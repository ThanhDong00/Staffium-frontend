import React from "react";
import SideBar from "@/components/management/Sidebar";
import AppSidebar from "./AppSidebar/AppSidebar";
import Header from "@/components/management/Header";
import { SidebarProvider } from "./ui/sidebar";
import PersonalSidebar from "./AppSidebar/PersonalSidebar";

interface LayoutProps {
  children: React.ReactNode;
  trigger: Function
}
const PersonalLayout: React.FC<LayoutProps> = ({ children, trigger }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-1">
        <PersonalSidebar trigger={trigger} />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="grow bg-slate-100 rounded-md">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PersonalLayout;
