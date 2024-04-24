import { Inter } from "next/font/google";
import "@/app//globals.css";
import { AuthContextProvider } from "@/app/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pollzilla",
  description: "The next generation polling system",
};

export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </AuthContextProvider>
  );
}
