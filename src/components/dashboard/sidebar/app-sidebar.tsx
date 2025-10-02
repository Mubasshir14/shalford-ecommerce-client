"use client";
import * as React from "react";
import {
  Bot,
  SquareTerminal,
  ShoppingCart,
  ClipboardCheck,
  Package,
  BookImage,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { useUser } from "@/components/context/UserContext";
import Image from "next/image";
import logo from "../../../assets/company.png";
import { TruckElectric } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  const navMain =
    user?.role === "user"
      ? [
          {
            title: "Dashboard",
            url: "/user/dashboard",
            icon: SquareTerminal,
            isActive: true,
          },
          {
            title: "Manage Order",
            url: "/user/dashboard/manage-order",
            icon: ClipboardCheck,
          },
          {
            title: "Cart",
            url: "/user/dashboard/cart",
            icon: ShoppingCart,
          },
          {
            title: "Track Order",
            url: "/user/dashboard/track-order",
            icon: TruckElectric,
          },
        ]
      : user?.role === "admin"
      ? [
          {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: SquareTerminal,
            isActive: true,
          },
          {
            title: "Manage User",
            url: "/admin/dashboard/manage-user",
            icon: Package,
          },
          {
            title: "Add Product",
            url: "/admin/dashboard/add-product",
            icon: Package,
          },
          {
            title: "Manage Category",
            url: "/admin/dashboard/manage-category",
            icon: Package,
          },
          {
            title: "Manage Product",
            url: "/admin/dashboard/manage-product",
            icon: Package,
          },
          {
            title: "Manage Featured",
            url: "/admin/dashboard/manage-featured",
            icon: Package,
          },
          {
            title: "Manage On Sale",
            url: "/admin/dashboard/manage-onsale",
            icon: Package,
          },
          // {
          //   title: "Update Product",
          //   url: "/admin/dashboard/update-product/:id",
          //   icon: Package,
          // },
          // {
          //   title: "Manage Orders",
          //   url: "/admin/dashboard/manage-order",
          //   icon: ClipboardCheck,
          // },
          {
            title: "Completed Orders",
            url: "/admin/dashboard/completed-order",
            icon: ClipboardCheck,
          },
          {
            title: "Processing Orders",
            url: "/admin/dashboard/processing-order",
            icon: ClipboardCheck,
          },
          {
            title: "Pending Orders",
            url: "/admin/dashboard/pending-order",
            icon: ClipboardCheck,
          },
          {
            title: "Calcelled Orders",
            url: "/admin/dashboard/cancelled-order",
            icon: ClipboardCheck,
          },
          {
            title: "Manage Banner",
            url: "/admin/dashboard/manage-banner",
            icon: BookImage,
          },
          {
            title: "Manage Newsletter",
            url: "/admin/dashboard/manage-newsletter",
            icon: Bot,
          },
          {
            title: "Manage Popup",
            url: "/admin/dashboard/manage-popup ",
            icon: Bot,
          },
          {
            title: "Manage Gallery",
            url: "/admin/dashboard/manage-gallery",
            icon: BookImage,
          },
          {
            title: "Track Order",
            url: "/admin/dashboard/track-order",
            icon: TruckElectric,
          },
        ]
      : [
          {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: SquareTerminal,
            isActive: true,
          },
        ];

  return (
    <Sidebar
      collapsible="icon"
      className="bg-gradient-to-b from-amber-50 via-white to-green-50 shadow-lg border-r border-gray-200 font-sansita"
      {...props}
    >
      {/* Header */}
      <SidebarHeader className="p-4 border-b border-gray-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-extrabold text-amber-500 flex items-center justify-center">
                    <Image
                      src={logo}
                      height={100}
                      width={100}
                      alt="Logo"
                      className="flex items-center justify-center"
                    />
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-3 py-4 space-y-2">
        <NavMain items={navMain} />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-gray-200 bg-gradient-to-r from-amber-50 to-green-50">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
