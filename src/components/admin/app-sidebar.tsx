import * as React from "react"
import { GalleryVerticalEnd, PlusCircle } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Property Management",
      url: "#",
      items: [
        {
          title: "property listing",
          url: "managelisting",
          icon:<PlusCircle className="text-secondary300 w-10 h-20" size={24}/>
        },
       
      ],
    },
    {
      title: "Property feature management",
      url: "#",
      items: [
        {
          title: "view listed feautures",
          url: "#",
          icon:<PlusCircle className="text-secondary300 w-10 h-20" size={24}/>
        },
        {
          title: "create property feature",
          url: "#",
          isActive: true,
          icon:<PlusCircle className="text-secondary300 w-10 h-20" size={24}/>
        },

      ],
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-secondary300">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-secondary300" asChild>
              <Link href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image width={300} height={300} src={"/logo.jpeg"} alt={"logo"} className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-white">Intime Homes Consultancy</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-secondary200">
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <div>
                            {item.icon}
                            <Link href={item.url}>{item.title}</Link>

                          </div>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
