"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import logo from "../../public/logo.png";
import { LuBell, LuSettings } from "react-icons/lu";
import { formatDateTime } from "../../utils/formatDateTime";

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

  return (
    <header className="p-4 flex items-center justify-end my-auto">
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
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={logo} />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground font-medium">
            Khải Khải
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
