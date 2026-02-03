"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MdKeyboardArrowLeft } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

export default function HeaderNav() {

  const pathname = usePathname();

  const getHeaderName = () => {
    if (pathname === "/feature") return "Featured";
    if (pathname === "/music") return "Music";
    if (pathname === "/wifi") return "WiFi";
    if (pathname === "/search") return "Search";
    if (pathname === "/playlists" || pathname.startsWith("/playlists/")) return "Playlists";
    if (pathname === "/categories") return "Categories";
    if (pathname.startsWith("/categories/") || pathname.startsWith("/search/")) return "Playing";
    if (pathname === "/albums" || pathname.startsWith("/albums/")) return "Music";
    return "iPlayMusic";
  };

  const getBackLink = () => {
    if (pathname.startsWith("/albums/")) return "/albums";
    if (pathname.startsWith("/playlists/")) return "/playlists";
    if (pathname.startsWith("/categories/")) return "/categories";
    return "/";
  };

  const isCategoriesPage = pathname.startsWith("/categories/");
  const isPlaylistPage = pathname.startsWith("/playlists");
  const isSearchPage = pathname.startsWith("/search/");

  return (
    <section 
      className={`flex items-center justify-between px-4 py-2 ${isPlaylistPage || isSearchPage ? 'text-white' : 'text-black'}`}
    >
      <Link href={getBackLink()}>
        <MdKeyboardArrowLeft size={22} />
      </Link>
      <h1 className="text-[10px] uppercase font-bold tracking-widest">{getHeaderName()}</h1>
      <div className="flex items-center gap-4">
        {!isCategoriesPage && !isSearchPage && (
          <Link href="/search">
            <FiSearch size={16} />
          </Link>
        )}
      </div>
    </section>
  );
}
