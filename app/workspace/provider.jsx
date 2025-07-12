import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import AppSidebar from './_components/AppSidebar'

function WorkspaceProvider({ children }) {
    return (

        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <div>{children}</div>
        </SidebarProvider>
    )
}

export default WorkspaceProvider
