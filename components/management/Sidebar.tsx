"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LuLayoutGrid,
  LuClock,
  LuFileCheck,
  LuBarChart3,
  LuWrench,
  LuUserPlus,
  LuUsers,
} from "react-icons/lu";
import SidebarItem from "./SidebarItem";
import Image from "next/image";
import logo from "../../public/logo.png";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-52 flex flex-col gap-5 p-4">
      <div className="flex items-center gap-2 px-4 py-2">
        <Image className="" src={logo} alt="Logo" width={32} height={32} />
        <Link href="/dashboard" className="text-xl font-semibold">
          Staffium
        </Link>
      </div>

      <nav className="flex flex-col gap-3">
        <Link href="/dashboard">
          <SidebarItem
            icon={LuLayoutGrid}
            label="Dashboard"
            active={pathname === "/dashboard"}
          />
        </Link>
        <Link href="/staff">
          <SidebarItem
            icon={LuUsers}
            label="Staff"
            active={pathname === "/staff"}
          />
        </Link>
        <Link href="/attendance">
          <SidebarItem
            icon={LuClock}
            label="Attendance"
            active={pathname === "/attendance"}
          />
        </Link>
        <Link href="/requests">
          <SidebarItem
            icon={LuFileCheck}
            label="Requests"
            active={pathname === "/requests"}
          />
        </Link>
        <Link href="/statistics">
          <SidebarItem
            icon={LuBarChart3}
            label="Statistics"
            active={pathname === "/statistics"}
          />
        </Link>
        <Link href="/configurations">
          <SidebarItem
            icon={LuWrench}
            label="Configurations"
            active={pathname === "/configurations"}
          />
        </Link>
      </nav>

      <Link href="/invite" className="mt-auto">
        <SidebarItem
          icon={LuUserPlus}
          label="Invite"
          active={pathname === "/invite"}
        />
      </Link>
    </aside>
  );
};

export default SideBar;
