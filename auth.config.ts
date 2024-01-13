import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/register'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPosts = nextUrl.pathname.startsWith('/posts');
      if (isOnPosts) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/posts', nextUrl));
      }
      return true;
    },

  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;