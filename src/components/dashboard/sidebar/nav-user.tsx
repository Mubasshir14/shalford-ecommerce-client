"use client";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/components/context/UserContext";
import { logout } from "@/components/Services";
import { protectedRoutes } from "@/components/Types/ProtectedRoutes";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, setUser, setIsLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    setUser(null)
    setIsLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="font-sansita data-[state=open]:bg-amber-50 data-[state=open]:text-amber-600 rounded-lg px-3 py-2 transition-all duration-300 hover:bg-amber-50 hover:text-amber-600"
            >
              <Avatar className="h-9 w-9 rounded-full ring-2 ring-amber-200 shadow-sm">
                <AvatarImage
                  alt={user?.name}
                  src="https://github.com/shadcn.png"
                  className="rounded-full"
                />
                <AvatarFallback className="rounded-full bg-amber-100 text-amber-600 font-bold">
                  {user?.role?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left leading-tight ml-2">
                <span className="truncate font-bold text-gray-800 text-sm">
                  {user?.name}
                </span>
                <span className="truncate text-xs text-gray-500">
                  {user?.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-gray-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg shadow-lg border border-amber-100"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal font-sansita">
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar className="h-9 w-9 rounded-full ring-2 ring-amber-200">
                  <AvatarImage
                    alt={user?.name}
                    src="https://github.com/shadcn.png"
                  />
                  <AvatarFallback className="rounded-full bg-amber-100 text-amber-600 font-bold">
                    {user?.role?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-bold text-gray-800 text-sm">
                    {user?.name}
                  </span>
                  <span className="truncate text-xs text-gray-500">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => handleLogout()}
              className="flex items-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors font-sansita"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
