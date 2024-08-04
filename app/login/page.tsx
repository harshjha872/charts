"use client";

import { login } from "./actions";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useTransition } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  return (
    <form className="flex h-full items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="">
            <div className="">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button
              formAction={async (formData) => {
                startTransition(async () => {
                  const res = await login(
                    formData,
                    Object.keys(params).length > 0 ? params.toString() : ""
                  );
                  if (res.err) toast.error(res.err);
                  else toast.success("Logged In!");
                });
              }}
              disabled={isPending}
              type="submit"
              className="w-full mt-8"
            >
              Login
            </Button>
            <p className="mt-4 text-center text-sm text-gray-500">
              Dont have an account?
              <Link
                href="/signup"
                className="font-semibold text-gray-500 underline underline-offset-2 transition-colors hover:text-black ml-1"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
