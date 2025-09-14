import { IdParams } from '@/types'
import React from 'react'

export default async function ReviewDetails({params}:IdParams) {
  const {id} =await params
  return (
    <div>ReviewDetails-{id}</div>
  )
}
