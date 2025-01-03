"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const SelectedFilter = ({
  datas,
  valueSelected,
  handleClick,
}: {
  datas: Array<string>;
  valueSelected: string;
  handleClick: (label: string) => void;
}) => {
  // const handleClick = (label: string) => {
  //   setSelected(label);
  // };

  return (
    <div className="px-5 py-3 rounded-full bg-white shadow w-fit mx-auto">
      <div className="flex flex-wrap gap-2">
        {datas.map((label) => (
          <Button
            key={label}
            variant={valueSelected === label ? "default" : "ghost"}
            className="rounded-full"
            onClick={() => handleClick(label)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SelectedFilter;
