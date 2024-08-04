import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8">
      <div className="mb-4">Go to dashboard to access charts</div>
      <Link href="/dashboard">
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
}
