// "use client";
// import { SessionProvider, useSession } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// // Wrapper component to handle session and pass props to children
// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   return <SessionProvider>{children}</SessionProvider>;
// }

// // Component to check authentication and pass session data
// export function AuthWrapper({
//   children,
// }: {
//   children: (props: { session: any; status: string }) => React.ReactNode;
// }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "authenticated") {
//       console.log("user is authenticated");
//       // Optionally redirect or perform actions
//       router.push("/");
//     } else {
//       console.log("user is not authenticated");
//     }
//   }, [status, router]);

//   return <>{children({ session, status })}</>;
// }