"use client";
import React, { use } from 'react'
import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
} from "@/components/ui/sidebar";
import { Book, Compass, PencilRulerIcon, Wrench, WalletCards, UserCircle2Icon, LayoutDashboard, Sparkle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AddNewCourseDialog from './AddNewCourseDialog';


const SideBarOptions = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        path: '/workspace'
    },
    {
        title: 'My Learning',
        icon: Book,
        path: '/workspace/my-courses'
    },
    {
        title: 'Explore Courses',
        icon: Compass,
        path: '/workspace/explore'
    },
    {
        title: 'AI Tools',
        icon: Sparkle,
        path: '/workspace/ai-tools'
    },
    {
        title: 'Billing',
        icon: WalletCards,
        path: '/workspace/billing'
    },
    {
        title: 'Profile',
        icon: UserCircle2Icon,
        path: '/workspace/profile'
    }
]

function AppSidebar() {

    const path = usePathname()
    return (
        <Sidebar>
            <SidebarHeader className={'p-2'}>
                <img src="/logo.jpg" alt="logo" width="140" height="80" />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <AddNewCourseDialog>
                    <Button>Create Course</Button>
                </AddNewCourseDialog>
                <SidebarGroup />
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SideBarOptions.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild className={'p-5'}>
                                        <Link href={item.path} className={`text-[17px] 
                                            ${path.includes(item.path) && 'text-primary bg-purple-100'}`}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default AppSidebar
