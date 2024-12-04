import React from "react";
import { IconType } from "react-icons";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
}) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </div>
  );
};

export default SidebarItem;
