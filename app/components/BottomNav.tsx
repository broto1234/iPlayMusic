'use client';

import { usePathname } from "next/navigation";

import { MdMusicNote } from "react-icons/md";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { IoMdWifi } from "react-icons/io";
import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { BiAlbum } from "react-icons/bi";

import LinkCompo from "./LinkCompo";

export default function BottomNav() {
  const pathname = usePathname();
  const isCategoriesPage = pathname.startsWith("/categories/");
  const isSearchPage = pathname.startsWith("/search/");
  // const isPlaylistPage = pathname.startsWith("/playlists");

  return (
    <section className="shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2),0_-2px_4px_-1px_rgba(0,0,0,0.06)] mt-4">
      {!isCategoriesPage && !isSearchPage && (
        <div className="flex items-center justify-around py-3 text-[12px]">
        <LinkCompo href="/categories" className="flex items-center"><BiCategory />categories</LinkCompo>
        <LinkCompo href="/music" className="flex items-center"><MdMusicNote />music</LinkCompo>
        <LinkCompo href="/albums" className="flex items-center"><BiAlbum />albums</LinkCompo>
        <LinkCompo href="/playlists" className="flex items-center"><MdOutlinePlaylistAddCheckCircle />playlists</LinkCompo>
        <LinkCompo href="/feature" className="flex items-center"><MdOutlineFeaturedPlayList />feature</LinkCompo>
      </div>
      )}      
    </section>
  );
}
