'use client';

import { signup } from "../login/actions";
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

export default function CreateAccount() {
  const [isPending, startTransition] = useTransition();

  return (
    <form className="flex h-full items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your email and password below to create your account
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
              <Input minLength={6} id="password" name="password" type="password" required />
            </div>
            <Button
              formAction={async (formData) => {
                startTransition(async () => {
                  const res = await signup(formData);
                  if(res.err) toast.error(res.err)
                  else toast.success('Signed up!')
                })
              }}
              disabled={isPending}
              className="w-full mt-8"
            >
              Sign up
            </Button>
            <p className="mt-4 text-center text-sm text-gray-500">
              Already have an account?
              <Link
                href="/login"
                className="font-semibold text-gray-500 underline underline-offset-2 transition-colors hover:text-black ml-1"
              >
                Log in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
