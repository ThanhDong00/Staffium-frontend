"use client";

import { StaffResponse } from "@/api/constant/response";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Save } from "lucide-react";
import React, { useState } from "react";

interface EditState {
  [key: string]: boolean;
}

const StaffDetailsGeneral = ({
  id,
  staffInformation,
}: {
  id: string;
  staffInformation: StaffResponse;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState<EditState>({
    first_name: false,
    last_name: false,
    gender: false,
    nationality: false,
    birthdate: false,
    birthplace: false,
    place_of_residence: false,
    citizen_id: false,
    phone: false,
    email: false,
    // Work
    position: false,
    department: false,
    date_of_contract: false,
    contract_end_date: false,
  });

  const [staffGeneralData, setStaffGeneralData] =
    useState<StaffResponse>(staffInformation);

  const [tempData, setTempData] = useState<StaffResponse>(staffInformation);

  const validateField = (field: keyof StaffResponse, value: any): boolean => {
    if (!value.trim()) {
      alert(`${field} cannot be empty`);
      return false;
    }
    return true;
  };

  const handleInputChange = (field: keyof StaffResponse, value: string) => {
    setTempData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (field: keyof StaffResponse) => {
    try {
      setIsLoading(true);

      if (!validateField(field, tempData[field])) {
        return;
      }

      // API call
      //

      setStaffGeneralData((prev) => ({
        ...prev,
        [field]: tempData[field],
      }));

      setIsEdit((prev) => ({
        ...prev,
        [field]: false,
      }));

      alert(`${field} updated successfully`);
    } catch (error) {
      alert(`Failed to update ${field}`);
      // Reset temp data on error
      setTempData((prev) => ({
        ...prev,
        [field]: staffGeneralData[field],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleEdit = (field: keyof StaffResponse) => {
    if (isEdit[field]) {
      handleSave(field);
    } else {
      setIsEdit((prev) => ({
        ...prev,
        [field]: true,
      }));
    }
  };

  const renderInputField = (field: keyof StaffResponse, label: string) => (
    <div>
      <Label htmlFor={field}>{label}</Label>
      <div className="flex gap-2">
        <Input
          id={field}
          value={
            field === "position"
              ? (tempData[field] as any)?.name || ""
              : field === "department"
              ? (tempData[field] as any)?.name || ""
              : tempData[field]?.toString() || ""
          }
          onChange={(e) => handleInputChange(field, e.target.value)}
          disabled={!isEdit[field] || isLoading}
          className={isEdit[field] ? "border-blue-400" : ""}
        />
        <Button
          size="icon"
          variant={isEdit[field] ? "default" : "ghost"}
          onClick={() => handleToggleEdit(field)}
          disabled={isLoading}
        >
          {isEdit[field] ? (
            <Save className="h-4 w-4" />
          ) : (
            <Pencil className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-5 rounded-lg shadow space-y-5">
      <div>
        <div className="w-fit mx-auto rounded-full bg-indigo-400 text-white font-medium px-10 py-2 text-sm">
          Personal
        </div>
        <div className="grid grid-cols-2 gap-4 mt-5">
          {renderInputField("first_name", "First Name")}
          {renderInputField("last_name", "Last Name")}
          {/* {renderInputField("gender", "gender")} */}
          <div>
            <Label htmlFor="gender">Gender</Label>
            <div className="flex gap-2">
              <Select
                disabled={!isEdit["gender"] || isLoading}
                value={tempData["gender"]}
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger
                  className={isEdit["gender"] ? "border-blue-400" : ""}
                >
                  <SelectValue placeholder={`Select Gender`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="male" value="male">
                    Male
                  </SelectItem>

                  <SelectItem key="female" value="female">
                    Female
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="icon"
                variant={isEdit.gender ? "default" : "ghost"}
                onClick={() => handleToggleEdit("gender")}
                disabled={isLoading}
              >
                {isEdit.gender ? (
                  <Save className="h-4 w-4" />
                ) : (
                  <Pencil className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          {renderInputField("nationality", "Nationality")}
          {renderInputField("birthdate", "Birthdate")}
          {renderInputField("birthplace", "Birthplace")}
          {renderInputField("place_of_residence", "Place of Residence")}
          {renderInputField("citizen_id", "Citizen ID")}
          {renderInputField("phone", "Phone Number")}
          {renderInputField("email", "Email")}
        </div>
      </div>
      <hr />
      <div>
        <div className="w-fit mx-auto rounded-full bg-indigo-400 text-white font-medium px-10 py-2 text-sm">
          Work
        </div>
        <div className="grid grid-cols-2 gap-4 mt-5">
          {renderInputField("position", "Position")}
          {renderInputField("department", "Department")}
          {renderInputField("date_of_contract", "Date of Contract")}
          {renderInputField("contract_end_date", "Contract End Date")}
        </div>
      </div>
    </div>
  );
};

export default StaffDetailsGeneral;
