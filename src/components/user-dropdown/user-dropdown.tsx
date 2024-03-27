import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-pageBlack outline-none">
        <div className="text-white flex items-center mr-8 cursor-pointer">
          <Avatar>
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <p className="font-chakra text-sm">Ramadhan</p>
            <p className="font-chakra text-xs opacity-40">Effenduck</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#1f1f22] text-white outline-none border-0">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-800"/>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
