import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigator } from "@/contexts/navigator-context";
import { useUser } from "@/contexts/user-context";
import { auth } from "@/firebase/firebaseConfig";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { signOut } from "firebase/auth";
import { AiOutlineUser } from "react-icons/ai";

const UserDropdown = () => {

    const user = useUser();

    const navigate = useNavigator();
    const logout = () => signOut(auth);

    if(user === null) return (
        <div 
            className="px-6 flex items-center text-pageCream font-chakra gap-2 cursor-pointer"
        
        >
            {/* <AiOutlineUser className="text-xl"/> */}
            <p className="hover:text-lighterBlue transition-all duration-200" onClick={() => navigate("/login")}>Login</p>
        </div>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-pageBlack outline-none select-none">
        <div className="text-white flex items-center mr-8 cursor-pointer">
          <Avatar className="bg-darkBlue w-10 h-10 rounded-full flex items-center justify-center  ">
            <AvatarFallback>{user?.firstName.charAt(0)}{user?.lastName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <p className="font-chakra text-sm">{user?.firstName}</p>
            <p className="font-chakra text-xs opacity-40">{user?.lastName}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#1f1f22] text-white outline-none border-0 rounded-none">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-stone-800"/>
        <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
