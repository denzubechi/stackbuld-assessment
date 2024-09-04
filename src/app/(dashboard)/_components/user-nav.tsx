"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import NotificationsDropdown from "./notifications-dropdown";

export function UserNav() {
  const router = useRouter();

  const merchant = {
    username: "Nzubechi",
    biodata: {
      firstName: "Samuel",
      lastName: "Chukwuma",
    },
    profilePhoto: "",
  };

  const { firstName, lastName } = merchant.biodata;
  const profilePhoto = merchant.profilePhoto || "";

  const handleLogout = () => {
   // router.replace("/login");
  };

  // Fallback for avatar if profilePhoto is not available
  const avatarFallback = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="flex items-center gap-2">
      <NotificationsDropdown />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative flex gap-2 items-center">
            <Avatar className="h-8 w-8 rounded-full">
              {profilePhoto ? (
                <AvatarImage src={profilePhoto} alt={merchant.username || "User"} />
              ) : (
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              )}
            </Avatar>
            <p>{firstName || "User"}</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem onClick={handleLogout}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
