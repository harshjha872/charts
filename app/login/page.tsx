import { login, signup, signOut } from "./actions";
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

export default function LoginPage() {
  return (
    <>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
        <button formAction={signOut}>Sign out</button>
      </form>

      {/* <LoginShad /> */}
      {/* <CreateAccount /> */}
    </>
  );
}

// function LoginShad() {
//   return (
//     <Card className="mx-auto max-w-sm">
//       <CardHeader className="space-y-1">
//         <CardTitle className="text-2xl font-bold">Login</CardTitle>
//         <CardDescription>
//           Enter your email and password to login to your account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="m@example.com"
//               required
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <Input id="password" type="password" required />
//           </div>
//           <Button type="submit" className="w-full">
//             Login
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function CreateAccount() {
//   return (
//     <div className="mx-auto max-w-[400px] space-y-6">
//       <div className="space-y-2 text-center">
//         <h1 className="text-3xl font-bold">Create an Account</h1>
//         <p className="text-muted-foreground">
//           Enter your email and password to get started.
//         </p>
//       </div>
//       <Card>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input id="email" type="email" placeholder="Enter your email" />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//             />
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button type="submit" className="w-full">
//             Create Account
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
