import { Inter } from "next/font/google";
import "@/app/globals.css";
import Bars from "../Bars/page"
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex space-x-2 w-screen ">
        <div className="w-[20%]"><Bars/></div>
        <div className="w-[80%]">{children}</div>
        </div>
        </body>
    </html>
  );
}
