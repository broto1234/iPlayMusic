"use client";

// import { useState } from "react";
// import { FaPlayCircle } from "react-icons/fa";

const formatDuration = (ms:number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};


type PlaylistContentProp = {
  playlist: any;
};

export default function PlaylistDetailContent({ playlist }: PlaylistContentProp) {
  // const [selectedSong, setSelectedSong] = useState<any>(null);

  const playlistsTrack = playlist;

  console.log("PlaylistDetailContent:", playlistsTrack);
  
  return (
      <div className="">
        <p className="text-xs font-bold">All Songs</p>
        <ol className="px-6">
        {playlistsTrack.items.map((trackItem: any, idx: number) => {
          const track = trackItem.track;
          const trackArtists = track.artists?.slice(0,2).map((a: any) => a.name).join(", ");
          return (
            <li key={idx} className="flex items-center justify-between py-2 border-b border-gray-200">
              <div>
                <p className="text-sm font-medium">{track.name}</p>
                <p className="text-xs text-gray-500">{trackArtists}</p>
              </div>
              <p className="text-xs text-gray-500">{formatDuration(track.duration_ms)}</p>
            </li>
          );
        })}
        </ol>
      </div>
  );
}