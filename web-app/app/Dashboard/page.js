import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import Main from '@/components/Main'
import React from 'react'

export default function DashboardPage() {
  let isAuthenticated = true
  
  let children = (<Login/>)

  if (isAuthenticated) {children=(<Dashboard/>)}
  
    return (
    <Main>
        {children}
    </Main>
  )
}
