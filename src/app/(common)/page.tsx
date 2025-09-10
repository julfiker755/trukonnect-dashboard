import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function HomePage() {
  return (
   <Link href='/reviewer'>
      <Button variant="primary">Reviewer</Button> 
   </Link>
  )
}
