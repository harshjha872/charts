"use client";

import { signOut } from "./actions";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

const Logout = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      onClick={async () => {
        startTransition(async () => {
          await signOut();
        });
      }}
      disabled={isPending}
    >
      Logout
    </Button>
  );
};

export default Logout;
