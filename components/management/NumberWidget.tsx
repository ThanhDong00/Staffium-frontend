import React from "react";
import { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  Icon: LucideIcon;
  value: string;
}

const NumberWidget: React.FC<CardProps> = ({ title, Icon, value }) => {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <div className="flex items-center justify-between text-gray-500">
        <p className="text-center text-sm font-semibold">{title}</p>
        <Icon size={16} />
      </div>
      <p className="text-start text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default NumberWidget;
