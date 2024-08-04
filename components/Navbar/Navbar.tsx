import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Logout from "@/app/login/Logout";
import { LogIn } from "lucide-react";
import { Button } from "../ui/button";

const Navbar = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <div className="h-16 border-b-[1px] border-zinc-200 flex justify-between items-center px-8">
      <div>Charts</div>

      {error || !data?.user ? (
        <Link href="/login">
          <Button variant="ghost">
            <LogIn size={17}/>
          </Button>
        </Link>
      ) : (
        <div className="flex space-x-2 items-center">
          <span>{data.user.email} </span>
          <Logout />
        </div>
      )}
    </div>
  );
};

export default Navbar;
