import React from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import GeneratedAvatar from "@/components/generated-avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";

const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/sign-in"),
      },
    });
  };

  if (isPending || !data?.user) return null;

  const { name, email, image } = data.user;

  const UserAvatar = image ? (
    <Avatar>
      <AvatarImage src={image} alt={name} />
    </Avatar>
  ) : (
    <GeneratedAvatar seed={name} varient="initials" className="size-9 mr-3" />
  );

  const UserInfo = (
    <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
      <p className="text-sm truncate">{name}</p>
      <p className="text-xs truncate text-muted-foreground">{email}</p>
    </div>
  );

  const AvatarTrigger = (
    <div className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2">
      {UserAvatar}
      {UserInfo}
      <ChevronDownIcon className="size-4 shrink-0" />
    </div>
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{AvatarTrigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{name}</DrawerTitle>
            <DrawerDescription>{email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant="outline"
              onClick={() => {
                authClient.customer.portal();
              }}
            >
              <CreditCardIcon className="size-4 mr-2" />
              Billing
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOutIcon className="size-4 mr-2" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{AvatarTrigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{name}</span>
            <span className="text-sm font-normal truncate text-muted-foreground">
              {email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            authClient.customer.portal();
          }}
        >
          <CreditCardIcon className="size-4 mr-2" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOutIcon className="size-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserButton;
