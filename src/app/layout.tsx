import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.scss";
import ClientSideComponent from "./utils/clientSideComponent/ClientSideComponent";
import { LessonProvider } from "./utils/context/LessonContext";
import { LessonDataProvider } from "./utils/context/LessonDataContext";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn English",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <LessonDataProvider>
          <LessonProvider>
            <ClientSideComponent>
              {children}
            </ClientSideComponent>
          </LessonProvider>
        </LessonDataProvider>
      </body>
    </html>
  );
}