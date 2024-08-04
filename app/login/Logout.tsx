"use client";

import { signOut } from "./actions";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react'

const Logout = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <>
    <Button
      variant="ghost"
      onClick={async () => {
        startTransition(async () => {
          await signOut();
        });
      }}
      disabled={isPending}
    >
      <LogOut size={17}/>
      
    </Button>
      {/* <LogOut /> */}
    </>
  );
};

export default Logout;
