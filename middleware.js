// middleware.js
import { NextResponse } from "next/server";

export async function middleware(req) {
    const res = NextResponse.next();
    const authUser = req.cookies.get("authUser")?.value;
    const { pathname } = req.nextUrl;

    // const { pathname } = req.nextUrl;
    // var userId = "";
    // if (!adminUser) {
    //     userId = adminUser.user.getItem("id");
    // }
    console.log(authUser)

  // Allow the request if the following is true
  // 1) The token exists
  // 2) It's a request for the NextAuth session or provider fetching
//   if (accessToken && userId < 3 && pathname.startsWith('/admin')) {
//     return NextResponse.next();
//   }


//   // Redirect them to login if they don't have a token and are requesting a protected route
//   if (!accessToken && pathname !== "/login") {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }


}

