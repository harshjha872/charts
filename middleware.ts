// import { NextRequest } from "next/server";
// import { updateSession } from "./utils/auth/auth";

// export async function middleware(request: NextRequest) {
//   return await updateSession(request);
// }
import { cookies } from "next/headers";

import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const {
    nextUrl: { search },
  } = request;
  const urlSearchParams = new URLSearchParams(search);
  const params = Object.fromEntries(urlSearchParams.entries());

  if (Object.keys(urlSearchParams).length > 0) {
    for (const [key, value] of Object.entries(urlSearchParams)) {
      cookies().set({
        name: key,
        value: value,
        httpOnly: false,
        path: "/dashboard",
      });
    }
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
