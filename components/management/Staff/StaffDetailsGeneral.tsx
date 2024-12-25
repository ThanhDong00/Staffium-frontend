"use client";

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

interface StaffData {
  firstName: string;
  lastName: string;
  gender: string;
  nationality: string;
  birthdate: string;
  birthplace: string;
  placeOfResidence: string;
  citizenID: string;
  phoneNumber: string;
  email: string;
  // Work
  position: string;
  department: string;
  dateOfContract: string;
  contractEndDate: string;
}

interface EditState {
  firstName: boolean;
  lastName: boolean;
  gender: boolean;
  nationality: boolean;
  birthdate: boolean;
  birthplace: boolean;
  placeOfResidence: boolean;
  citizenID: boolean;
  phoneNumber: boolean;
  email: boolean;
  position: boolean;
  department: boolean;
  dateOfContract: boolean;
  contractEndDate: boolean;
}

const StaffDetailsGeneral = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState<EditState>({
    firstName: false,
    lastName: false,
    gender: false,
    nationality: false,
    birthdate: false,
    birthplace: false,
    placeOfResidence: false,
    citizenID: false,
    phoneNumber: false,
    email: false,
    // Work
    position: false,
    department: false,
    dateOfContract: false,
    contractEndDate: false,
  });

  const [staffGeneralData, setStaffGeneralData] = useState<StaffData>({
    firstName: "Smith",
    lastName: "Jone",
    gender: "Female",
    nationality: "Viet Nam",
    birthdate: "20/10/2000",
    birthplace: "Ben Tre, Viet Nam",
    placeOfResidence: "Trường Đại học Công nghệ Thông tin",
    citizenID: "000000000000",
    phoneNumber: "0123456789",
    email: "staffium@gmail.com",
    // Work
    position: "Developer",
    department: "IT",
    dateOfContract: "20/10/2020",
    contractEndDate: "20/10/2029",
  });

  const [tempData, setTempData] = useState<StaffData>({
    firstName: staffGeneralData.firstName,
    lastName: staffGeneralData.lastName,
    gender: staffGeneralData.gender,
    nationality: staffGeneralData.nationality,
    birthdate: staffGeneralData.birthdate,
    birthplace: staffGeneralData.birthplace,
    placeOfResidence: staffGeneralData.placeOfResidence,
    citizenID: staffGeneralData.citizenID,
    phoneNumber: staffGeneralData.phoneNumber,
    email: staffGeneralData.email,
    // Work
    position: staffGeneralData.position,
    department: staffGeneralData.department,
    dateOfContract: staffGeneralData.dateOfContract,
    contractEndDate: staffGeneralData.contractEndDate,
  });

  const validateField = (field: keyof StaffData, value: string): boolean => {
    if (!value.trim()) {
      alert(`${field} cannot be empty`);
      return false;
    }
    return true;
  };

  const handleInputChange = (field: keyof StaffData, value: string) => {
    setTempData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (field: keyof EditState) => {
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

  const handleToggleEdit = (field: keyof EditState) => {
    if (isEdit[field]) {
      handleSave(field);
    } else {
      setIsEdit((prev) => ({
        ...prev,
        [field]: true,
      }));
    }
  };

  const renderInputField = (field: keyof StaffData, label: string) => (
    <div>
      <Label htmlFor={field}>{label}</Label>
      <div className="flex gap-2">
        <Input
          id={field}
          value={tempData[field]}
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
          {renderInputField("firstName", "First Name")}
          {renderInputField("lastName", "Last Name")}
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
                  <SelectItem key="male" value="Male">
                    Male
                  </SelectItem>

                  <SelectItem key="female" value="Female">
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
          {renderInputField("placeOfResidence", "Place of Residence")}
          {renderInputField("citizenID", "Citizen ID")}
          {renderInputField("phoneNumber", "Phone Number")}
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
          {renderInputField("dateOfContract", "Date of Contract")}
          {renderInputField("contractEndDate", "Contract End Date")}
        </div>
      </div>
    </div>
  );
};

export default StaffDetailsGeneral;
