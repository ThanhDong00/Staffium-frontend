"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import logo from "../../public/logo.png";
import { LuBell, LuSettings } from "react-icons/lu";
import { formatDateTime } from "../../utils/formatDateTime";
import { useUser } from "@/hooks/useUser";
import { usePathname, useRouter } from "next/navigation";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import LoginSession from "@/app/cookie";
import { USER_ROLES } from "@/constants/enum";

const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState(
    formatDateTime(new Date())
  );


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(formatDateTime(new Date()));
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const user = useUser()
  const router = useRouter()
  const path = usePathname()



  return (
    <header className="py-4 px-8 flex items-center justify-end my-auto">
      {LoginSession.role() === USER_ROLES.HR &&
        <div className="flex flex-row gap-4 justify-center items-center">
          <Button
            className="rounded-3xl"
            onClick={() => {
              if (!path.startsWith('/personal'))
                router.push('/personal/info')
              else
                router.push('/dashboard')
            }}
          >
            {!path.startsWith('/personal') ? 'Personal' : 'Managament'}
          </Button>
          <Label>Switch to {!path.startsWith('/personal') ? 'Personal' : 'Managament'} mode</Label>
        </div>
      }
      <span className="text-sm text-muted-foreground font-semibold px-4">
        {currentDateTime}
      </span>

      <div className="flex items-center gap-4 border-l-2 border-slate-300 pl-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <LuBell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <LuSettings className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 px-4 py-1 rounded-lg hover:bg-slate-100 hover:cursor-pointer"
          onClick={() => {
            router.push("/account")
          }}
        >
          <Avatar>
            <AvatarImage src={user.getAvatar()} />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground font-medium">
            {user.getDisplayName()}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
