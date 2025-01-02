"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { OrgConfigService } from "@/api/OrgConfigService";
import { toast } from "@/hooks/use-toast";
import Spinner from "@/components/Feedback/Spinner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Save } from "lucide-react";

const Configurations = () => {
  const [isEdit, setIsEdit] = useState<{ [key: string]: boolean }>({ clock_in_time: false, clock_out_time: false });
  const [input, setInput] = useState<{ [key: string]: string }>({ clock_in_time: '', clock_out_time: '' });
  const orgConfigQuery = useQuery({
    queryKey: ["org-config"],
    queryFn: () => OrgConfigService.getConfig()
  });
  const updateConfigMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string, payload: Object }) => {
      console.log('ii', id)
      return OrgConfigService.updateConfig(id, payload)
    },
    onSuccess: (res) => {
      if (res.status === 200) {
        toast({
          variant: 'default',
          title: `Successfully update config`
        })
        console.log(res.data)
      }
      else {
        toast({
          variant: 'destructive',
          title: `Failed to update config with error ${res.message}`
        })
      }

    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: `Failed to update config`
      })
    }
  })



  useEffect(() => {
    if (orgConfigQuery.data) {
      setInput({
        clock_in_time: orgConfigQuery.data.data.details?.clock_in_time,
        clock_out_time: orgConfigQuery.data.data.details?.clock_out_time
      })
    }
  }, [orgConfigQuery.data])

  const renderInputField = (field: string, label: string) => (
    <div>
      <Label htmlFor={field}>{label}</Label>
      <div className="flex gap-2">
        <Input
          type='time'
          id={field}
          value={input[field]}
          onChange={(e) => {
            console.log(e.target.value)
            setInput(prev => ({ ...prev, [field]: e.target.value }))
          }}
          disabled={!isEdit[field]}
          className={isEdit[field] ? "border-indigo-400" : ""}
        />
        <Button
          size="icon"
          variant={isEdit[field] ? "default" : "ghost"}
          onClick={() => {

            if (isEdit[field]) {
              console.log(orgConfigQuery.data.data._id)
              updateConfigMutation.mutate({
                id: orgConfigQuery.data.data._id as string, payload: {
                  clock_in_time: input['clock_in_time'],
                  clock_out_time: input['clock_out_time'],
                }
              })
            }
            setIsEdit(prev => ({ ...prev, [field]: !isEdit[field] }))
          }}
          disabled={false}
        >
          {isEdit[field] ? (
            <Save className="h-4 w-4" />
          ) : (
            <Pencil className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div >
  );


  return (
    <div className="p-5">
      <div className="flex flex-col gap-8 rounded-lg bg-white p-5 shadow">
        {orgConfigQuery.isPending ?
          <div><Spinner /></div>
          :
          <div className="flex flex-col gap-4 w-1/2">
            {renderInputField('clock_in_time', 'Clock in time')}
            {renderInputField('clock_out_time', 'Clock out time')}
          </div>
        }
      </div>
    </div>
  )
};

export default Configurations;
