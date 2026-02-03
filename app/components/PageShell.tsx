"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  const pathname = usePathname();
  const isPlaylistsPage = pathname?.startsWith("/playlists");
  const isSearchPage = pathname?.startsWith("/search/");

  return (
    <div className="relative w-full min-h-screen">
      {isPlaylistsPage && (
        <div className="absolute text-white inset-x-0 top-0 h-[40vh] bg-[url('/sound-wave.jpg')] bg-cover bg-center bg-no-repeat z-0" />
      )}
      {isSearchPage && (
        <div className="absolute text-white inset-0 z-0 bg-black" />
      )}
      <div className="relative z-10 max-w-2xl mx-auto min-h-screen flex flex-col justify-between gap-2">
        {children}
      </div>
    </div>
  );
}
