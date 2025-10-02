"use client";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  const isActive = (url: string) => pathname === url;

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm font-sansita font-semibold text-gray-500 tracking-wide mb-2">
        Menu
      </SidebarGroupLabel>
      <SidebarMenu className="space-y-2">
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={isActive(item.url)}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-all duration-300 ease-in-out
                  ${
                    isActive(item.url)
                      ? "bg-amber-100 text-amber-600 font-semibold shadow-sm"
                      : "hover:bg-amber-50 hover:text-amber-600"
                  }`}
              >
                <Link href={item.url} className="flex items-center gap-3 w-full">
                  <item.icon
                    className={`w-5 h-5 ${
                      isActive(item.url) ? "text-amber-500" : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-base ${
                      isActive(item.url) ? "text-amber-600" : "text-gray-700"
                    }`}
                  >
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>

              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90 transition-transform duration-200">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-6 mt-1">
                    <SidebarMenuSub className="space-y-1">
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={`rounded-md px-3 py-2 text-sm transition-all ${
                              pathname === subItem.url
                                ? "text-amber-600 font-semibold bg-amber-50"
                                : "text-gray-600 hover:text-amber-600 hover:bg-amber-50"
                            }`}
                          >
                            <Link href={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
