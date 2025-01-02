'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/hooks/useUser';
import { Pencil, Save } from 'lucide-react';
import React, { useState } from 'react'

export default function AccountPage() {
  const [isEdit, setIsEdit] = useState<{ [key: string]: boolean }>({ email: false, password: false });
  const user = useUser()
  const renderInputField = (field: string, label: string) => (
    <div>
      <Label htmlFor={field}>{label}</Label>
      <div className="flex gap-2">
        <Input
          id={field}
          onChange={(e) => { }}
          disabled={!isEdit[field]}
          className={isEdit[field] ? "border-blue-400" : ""}
        />
        <Button
          size="icon"
          variant={isEdit[field] ? "default" : "ghost"}
          onClick={() => { }}
          disabled={false}
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
    <div className="p-5">
      <div className="flex flex-col gap-8 rounded-lg bg-white p-5 shadow">
        <div className='flex gap-4 justify-start items-center'>
          <Avatar className='w-20 h-20'>
            <AvatarFallback className='text-primary bg-indigo-50 text-lg'>KK</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-semibold">{user.getDisplayName()}</h1>
        </div>
        <div className='flex flex-row gap-2 ml-4'>
          {renderInputField('email', 'Email')}
          {renderInputField('password', 'Password')}
        </div>
      </div>

    </div>
  )
}
