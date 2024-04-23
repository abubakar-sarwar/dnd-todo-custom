import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/lib/ReduxProvider";
import { Settings } from "./_components";

export const metadata: Metadata = {
  title: "DND TODO",
  applicationName: "DND TODO",
  description:
    "DnD To-Do Custom is a Next.js to-do list app that lets you manage tasks with drag-and-drop simplicity. Organize projects, prioritize tasks, and customize colors for a personalized task management experience.",
  icons: ["/todo.png"],
  openGraph: {
    type: "website",
    url: "https://dnd-todo-custom.vercel.app/",
    title: "DND TODO CUSTOM",
    description:
      "DnD To-Do Custom is a Next.js to-do list app that lets you manage tasks with drag-and-drop simplicity. Organize projects, prioritize tasks, and customize colors for a personalized task management experience.",
    images: ["/todo.png"],
    siteName: "DND TODO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <main>{children}</main>
          <Settings />
        </ReduxProvider>
      </body>
    </html>
  );
}
