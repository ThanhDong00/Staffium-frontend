"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LuLayoutGrid,
  LuClock,
  LuFileCheck,
  LuBarChart3,
  LuWrench,
  LuUserPlus,
  LuUsers,
  LuBuilding2,
} from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import NavMain from "./NavMain";
import { usePathname } from "next/navigation";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LuLayoutGrid,
    },
    {
      title: "Organization",
      url: "/organization",
      icon: LuBuilding2,
    },
    {
      title: "Staff",
      url: "/staff",
      icon: LuUsers,
    },
    {
      title: "Attendance",
      url: "/attendance",
      icon: LuClock,
    },
    {
      title: "Requests",
      url: "/requests",
      icon: LuFileCheck,
    },
    {
      title: "Statistics",
      url: "/statistics",
      icon: LuBarChart3,
      items: [
        {
          title: "Attendance",
          url: "/statistics/attendance",
        },
        {
          title: "Requests",
          url: "/statistics/requests",
        },
      ],
    },
    {
      title: "Configurations",
      url: "/configurations",
      icon: LuWrench,
    },
  ],
};

const AppSidebar = () => {
  const pathname = usePathname();

  // const isActiveRoute = (url: string) => pathname === url;
  const isActiveRoute = (url: string) => {
    // Check if current path starts with the nav item URL
    // This handles both exact matches and sub-routes
    return pathname === url || pathname.startsWith(`${url}/`);
  };

  const navItems = data.navMain.map((item) => {
    // Map sub-items with isActive property
    const mappedSubItems = item.items?.map((subItem) => ({
      ...subItem,
      isActive: isActiveRoute(subItem.url),
    }));

    // Return item with updated sub-items and main isActive state
    return {
      ...item,
      items: mappedSubItems,
      isActive:
        isActiveRoute(item.url) ||
        mappedSubItems?.some((subItem) => subItem.isActive),
    };
  });

  return (
    <Sidebar className="border-none">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Image className="" src={logo} alt="Logo" width={32} height={32} />
          <Link href="/dashboard" className="text-xl font-semibold">
            Staffium
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 mt-5">
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LuUserPlus className="h-4 w-4" />
              <span>Invite</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
