import { NextResponse } from "next/server";

export async function middleware(request) {
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;
  const { pathname } = request.nextUrl;

  // ১. কোনো কুকি না থাকলে সরাসরি লগইনে পাঠান
  if (!sessionToken) {
    if (pathname.startsWith("/admin") || pathname.startsWith("/founder") || pathname.startsWith("/collaborator")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // ২. যদি কুকি থাকে, তবে সার্ভার সাইডে সেশন ভ্যালিডেশন চেক করুন
  // বিঃদ্রঃ এটি আরও নিশ্চিত করার জন্য যে কুকিটি আসল। 
  // আপনি যদি চান প্রতিটি রিকোয়েস্টে ব্যাকএন্ডে চেক করতে, তবে নিচের লজিকটি দেখুন।
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/founder/:path*", "/collaborator/:path*"],
};