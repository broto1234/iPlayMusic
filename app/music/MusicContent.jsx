"use client";

import { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const formatDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const MusicContent = ({ data }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);

  return (
    <section className="">
      {/* Track List */}
      <div>
        {data.items && data.items.map((item, index) => {
          const track = item.track;
          const duration = formatDuration(track.duration_ms);
          const artistName = track.artists.map(artist => artist.name).join(", "); 
          return (
            <div key={index}>
              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2"> 
                  <button 
                    onClick={() => setSelectedTrack(track)}
                    className="hover:opacity-70 transition"
                  >
                    <FaPlayCircle color="red" size={30} />
                  </button>
                  
                  <div>
                    <h4 className="font-semibold text-sm">{track.album.name.substring(0, 30)}</h4>
                    <p className="text-xs">{artistName}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{duration}</p>
              </div>
              {/* Show player only for this track if it's selected */}
              {selectedTrack && selectedTrack.id === track.id && (
                <div className="p-1 bg-red-500 rounded-lg mt-2 mb-4">
                  <div className="flex justify-end items-center pr-2 hover:opacity-70 transition">
                    {/* <h3 className="font-semibold text-lg">Now Playing</h3> */}
                    <button 
                      onClick={() => setSelectedTrack(null)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      <IoClose size={24} color="white"/>
                    </button>
                  </div>
                  <iframe
                    src={`https://open.spotify.com/embed/track/${selectedTrack.id}`}
                    width="100%"
                    height="100"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg"
                  ></iframe>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default MusicContent;
