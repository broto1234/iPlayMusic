"use client";

import { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";

const formatDuration = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};


// type Album = {
//   name?: string;
//   images?: { url: string }[];
//   artists?: { name: string }[];
//   total_tracks?: number;
//   tracks?: { items?: { name?: string; artists?: { name: string }[] }[] };
//   external_urls?: { spotify?: string };
// };
type AlbumContentProp = {
  album: any[];
};

export default function AlbumDetailContent({ album }: AlbumContentProp) {
  const [selectedSong, setSelectedSong] = useState<any>(null);

  const albumsTracks = album;

  console.log("AlbumDetailContent:", albumsTracks);
  
  return (
    <>
      <div className="">
        <p className="text-xs font-bold">All Songs</p>
        <div>
          {albumsTracks.map((track, idx) => {
            const trackArtists = track.artists?.slice(0,2).map((a: any) => a.name).join(", ");
            return (
              <div key={idx}>
                {selectedSong && selectedSong.id === track.id ? (
                  // Show player when this song is selected
                  <div className="p-1 bg-red-500 rounded-lg mt-2 mb-2">
                    <div className="flex justify-end items-center mb-2 mr-3">
                      <button 
                        onClick={() => setSelectedSong(null)}
                        className="text-sm text-white font-semibold hover:text-red-800"
                      >
                        Close
                      </button>
                    </div>
                    <iframe
                      src={`https://open.spotify.com/embed/track/${selectedSong.id}?utm_source=generator&theme=0`}
                      width="100%"
                      height="152"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                ) : (
                  // Show track info with hover effect for play button
                  <div className="group flex items-center justify-between gap-2 text-xs p-2 rounded">
                    <div className="flex items-center gap-2">
                      <div className="relative w-7.5">
                        <span className="text-gray-500 group-hover:hidden">{idx + 1}</span>
                        <button 
                          onClick={() => setSelectedSong(track)}
                          className="absolute -top-2 -left-2 hidden group-hover:block hover:opacity-70 transition"
                        >
                          <FaPlayCircle color="red" size={30} />
                        </button>
                      </div>
                      <div>
                        <p className="font-semibold">{track.name}</p>
                        {trackArtists && <p className="text-xs text-gray-600">{trackArtists}</p>}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{formatDuration(track.duration_ms)}</p>
                  </div>
                )}
              </div>                            
            );
          })}        
        </div>
      </div>
  </>  
  );
}
//     <div className="space-y-4">
//       <div className="flex gap-4 items-center">
//         {cover && <img src={cover} alt={album.name} className="w-32 h-32 rounded object-cover" />}
//         <div>
//           <p className="text-xs uppercase text-gray-500">Album</p>
//           <h1 className="text-3xl font-bold">{album.name}</h1>
//           {artists && <p className="text-sm text-gray-600">By {artists}</p>}
//           {album.external_urls?.spotify && (
//             <a href={album.external_urls.spotify} className="text-xs text-red-600 hover:underline">Open in Spotify</a>
//           )}
//         </div>
//       </div>

//       <div className="space-y-2">
//         <h2 className="text-lg font-semibold">Tracks</h2>
//         {album.tracks?.items?.length ? (
//           album.tracks.items.map((track, idx) => {
//             const trackArtists = track.artists?.map((a) => a.name).join(", ");
//             return (
//               <div key={idx} className="flex items-center gap-2 text-sm">
//                 <span className="text-gray-500 w-6 text-right">{idx + 1}</span>
//                 <div>
//                   <p className="font-medium">{track.name}</p>
//                   {trackArtists && <p className="text-gray-600">{trackArtists}</p>}
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-sm text-gray-600">No tracks found.</p>
//         )}
//       </div>
//     </div>
//   );
// }