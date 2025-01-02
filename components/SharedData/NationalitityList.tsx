'use client'
import { ThirdPartyService } from '@/api/ThirdPartyService'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function NationalityList() {
  const nationalityQuery = useQuery({
    queryKey: ['nationalities'],
    queryFn: () => ThirdPartyService.getAllNationality()
  })
  return { nationalityQuery }
}
