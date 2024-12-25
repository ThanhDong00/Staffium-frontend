import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Save } from "lucide-react";
import React from "react";

const StaffEditableField = ({
  id,
  label,
  value,
  isEdit,
  isLoading = false,
  onChange,
  onToggleEdit,
}: {
  id: string;
  label: string;
  value: string;
  isEdit: boolean;
  isLoading?: boolean;
  onChange: (value: string) => void;
  onToggleEdit: () => void;
}) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2">
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={!isEdit || isLoading}
          className={isEdit ? "border-blue-400" : ""}
        />
        <Button
          size="icon"
          variant={isEdit ? "default" : "ghost"}
          onClick={onToggleEdit}
          disabled={isLoading}
        >
          {isEdit ? (
            <Save className="h-4 w-4" />
          ) : (
            <Pencil className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default StaffEditableField;
