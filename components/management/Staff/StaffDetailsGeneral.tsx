"use client";

import { StaffResponse } from "@/api/constant/response";
import { DepartmentService } from "@/api/DepartmentService";
import { PositionService } from "@/api/PositionService";
import { StaffService } from "@/api/StaffService";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import Spinner from "@/components/Feedback/Spinner";
import NationalityList from "@/components/SharedData/NationalitityList";
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
import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

  const { nationalityQuery } = NationalityList()
  const deptQuery = useQuery({
    queryKey: ['depts'],
    queryFn: () => DepartmentService.getAllDept(),
  })
  const posQuery = useQuery({
    queryKey: ['positions'],
    queryFn: () => PositionService.getAllPos(),
  })
  const queryClient = useQueryClient()

  const updateStaffMutation = useMutation({
    mutationFn: (payload: Object) => StaffService.updateOneStaffById(id, payload),
    onSuccess: () => {
      toast({
        variant: 'default',
        title: `Updated successfully`
      })
      // setTempData()
      queryClient.invalidateQueries({
        queryKey: ['staffs', 1, {
          search: "",
          department: "",
          gender: "",
        }]
      })
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: `Failed to update staff with error: ${error}`
      })
      // Reset temp data on error
      setTempData(staffGeneralData);
    }
  })

  const validateField = (field: keyof StaffResponse, value: any): boolean => {
    if (!value) {
      toast({
        variant: 'default',
        title: `${field} cannot be empty`
      })
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
      updateStaffMutation.mutate({ [field]: tempData[field] })
      //

      setStaffGeneralData((prev) => ({
        ...prev,
        [field]: tempData[field],
      }));

      setIsEdit((prev) => ({
        ...prev,
        [field]: false,
      }));

    } catch (error) {
      toast({
        variant: 'destructive',
        title: `Failed to update ${field} cause: ${error}`
      })
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
          value={tempData[field]?.toString() || ""}
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
  const renderSelectField = (field: keyof StaffResponse, label: string, data: any[]) => (
    <div>
      <Label htmlFor={field}>{label}</Label>
      <div className="flex gap-2">
        <Select
          disabled={!isEdit[field] || isLoading}
          value={tempData[field] as any}
          onValueChange={(value) => handleInputChange(field, value)}
        >
          <SelectTrigger
            className={isEdit[field] ? "border-indigo-400" : ""}
          >
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>
          <SelectContent >
            {data}
          </SelectContent>
        </Select>
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
  )

  return (
    <div className="bg-white p-5 rounded-lg shadow space-y-5">
      {updateStaffMutation.isPending ?
        <div className="w-full h-full flex justify-center">
          <Spinner />
        </div>
        :
        <>
          <div>
            <div className="w-fit mx-auto rounded-full bg-indigo-400 text-white font-medium px-10 py-2 text-sm">
              Personal
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5">
              {renderInputField("first_name", "First Name")}
              {renderInputField("last_name", "Last Name")}
              {renderSelectField("gender", "Gender",
                [<SelectItem key="male" value="Male" >
                  Male
                </SelectItem>,

                <SelectItem key="female" value="Female" >
                  Female
                </SelectItem>])}
              {
                nationalityQuery.isPending ?
                  <div className="flex justify-center"><Spinner /></div>
                  :
                  renderSelectField("nationality", "Nationality",
                    nationalityQuery.data.map((i: any, index: any) => (
                      <SelectItem key={index} value={i.name.common} >
                        {i.name.common}
                      </SelectItem>
                    ))
                  )

              }
              {/* {renderInputField("birthdate", "Birthdate")} */}
              <div>
                <Label htmlFor='birthdate'>Birthdate</Label>
                <div className="flex gap-2">
                  <DatePicker
                    isDisabled={!isEdit['birthdate'] || isLoading}
                    date={tempData['birthdate'] ? new Date(tempData['birthdate'].toString()) : undefined}
                    setDate={(v: any) => handleInputChange('birthdate', v)}
                  />

                  <Button
                    size="icon"
                    variant={isEdit['birthdate'] ? "default" : "ghost"}
                    onClick={() => handleToggleEdit('birthdate')}
                    disabled={isLoading}
                  >
                    {isEdit['birthdate'] ? (
                      <Save className="h-4 w-4" />
                    ) : (
                      <Pencil className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
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
              {posQuery.isPending ? <div className="flex justify-center"><Spinner /></div> :
                <div>
                  <Label htmlFor="position">Position</Label>
                  <div className="flex gap-2">
                    <Select
                      disabled={!isEdit["position"] || isLoading}
                      value={tempData["position"]?._id}
                      onValueChange={(value) => { handleInputChange("position", value); console.log(value) }}
                    >
                      <SelectTrigger
                        className={isEdit["position"] ? "border-indigo-400" : ""}
                      >
                        <SelectValue placeholder={`Select position`} />
                      </SelectTrigger>
                      <SelectContent >
                        {posQuery.data.data.map((i: any, index: any) => (
                          <SelectItem key={i._id} value={i._id} >
                            {i.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      size="icon"
                      variant={isEdit["position"] ? "default" : "ghost"}
                      onClick={() => handleToggleEdit("position")}
                      disabled={isLoading}
                    >
                      {isEdit["position"] ? (
                        <Save className="h-4 w-4" />
                      ) : (
                        <Pencil className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

              }

              {deptQuery.isPending ? <div className="flex justify-center"><Spinner /></div>
                :
                <div>
                  <Label htmlFor="department">Department</Label>
                  <div className="flex gap-2">
                    <Select
                      disabled={!isEdit["department"] || isLoading}
                      value={tempData["department"]?._id as any}
                      onValueChange={(value) => handleInputChange("department", value)}
                    >
                      <SelectTrigger
                        className={isEdit["department"] ? "border-indigo-400" : ""}
                      >
                        <SelectValue placeholder={`Select Department`} />
                      </SelectTrigger>
                      <SelectContent >
                        {deptQuery.data.data.map((i: any, index: any) => (
                          <SelectItem key={index} value={i._id} >
                            {i.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      size="icon"
                      variant={isEdit["department"] ? "default" : "ghost"}
                      onClick={() => handleToggleEdit("department")}
                      disabled={isLoading}
                    >
                      {isEdit["department"] ? (
                        <Save className="h-4 w-4" />
                      ) : (
                        <Pencil className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

              }

              <div>
                <Label htmlFor='date_of_contract'>Date of Contract</Label>
                <div className="flex gap-2">
                  <DatePicker
                    isDisabled={!isEdit['date_of_contract'] || isLoading}
                    date={tempData['date_of_contract'] ? new Date(tempData['date_of_contract'].toString()) : undefined}
                    setDate={(v: any) => handleInputChange('date_of_contract', v)}
                  />

                  <Button
                    size="icon"
                    variant={isEdit['date_of_contract'] ? "default" : "ghost"}
                    onClick={() => handleToggleEdit('date_of_contract')}
                    disabled={isLoading}
                  >
                    {isEdit['date_of_contract'] ? (
                      <Save className="h-4 w-4" />
                    ) : (
                      <Pencil className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor='contract_end_date'>Contract End Date</Label>
                <div className="flex gap-2">
                  <DatePicker
                    isDisabled={!isEdit['contract_end_date'] || isLoading}
                    date={tempData['contract_end_date'] ? new Date(tempData['contract_end_date'].toString()) : undefined}
                    setDate={(v: any) => handleInputChange('contract_end_date', v)}
                  />

                  <Button
                    size="icon"
                    variant={isEdit['contract_end_date'] ? "default" : "ghost"}
                    onClick={() => handleToggleEdit('contract_end_date')}
                    disabled={isLoading}
                  >
                    {isEdit['contract_end_date'] ? (
                      <Save className="h-4 w-4" />
                    ) : (
                      <Pencil className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>}
    </div>
  );
};

export default StaffDetailsGeneral;
