import NextAuth from "next-auth";

import {DEFAULT_LOGIN_REDIRECT,apiAuthPrefix,publicRoutes,authRoutes} from '@/route'
import authConfig from "./auth.config";

const {auth} =NextAuth(authConfig)

export default auth(req=>{
    const {nextUrl} =req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.includes(apiAuthPrefix);

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
        return null;
    }

    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
        }
        return null;
    }
    if(!isLoggedIn && !publicRoutes){
        return Response.redirect(new URL('auth/sign-in',nextUrl))
    }
    return null;
})


export const config ={
    matcher: [
    // Apply middleware to everything except static files and Next.js internals
    "/((?!_next|.*\\..*).*)",
  ],
}
