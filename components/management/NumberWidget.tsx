import React from "react";

interface CardProps {
  title: string;
  Icon: React.ComponentType;
  value: string;
}

const NumberWidget: React.FC<CardProps> = ({ title, Icon, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex items-center justify-between text-gray-500">
        <p className="text-center font-semibold">{title}</p>
        <Icon />
      </div>
      <p className="text-start text-3xl font-semibold">{value}</p>
    </div>
  );
};

export default NumberWidget;
