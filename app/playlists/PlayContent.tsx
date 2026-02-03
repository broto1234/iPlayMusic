'use client';

import { IoClose } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { FaPlayCircle } from "react-icons/fa";

type PlayContentProps = {
  albums: any[];
};

function PlayContent({ albums }: PlayContentProps) {
  console.log("PlayContent albums:", albums);

  const [randomAlbums, setRandomAlbums] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<any | null>(null);

  console.log("selected tracks:", tracks);

  // Shuffle albums only on client side to avoid hydration mismatch
  useEffect(() => {
    if (albums && albums.length > 0) {
      const shuffled = [...albums].sort(() => Math.random() - 0.5);
      setRandomAlbums(shuffled.slice(0, 3));
      
      // Fetch tracks for the first album
      if (shuffled.length > 0 && shuffled[0]?.id) {
        const firstAlbumId = shuffled[0].id;
        setSelectedAlbumId(firstAlbumId);
        fetchAlbumTracks(firstAlbumId);
      }
    }
  }, [albums]);

  const handleAlbumClick = (albumId: string) => {
    setSelectedAlbumId(albumId);
    fetchAlbumTracks(albumId);
  };

  const fetchAlbumTracks = async (albumId: string) => {
    console.log("Fetching tracks ID:", albumId);

    try {
      setLoading(true);
      const response = await fetch(`/api/albums/${albumId}/tracks`);
      const data = await response.json();
      setTracks(data.items || []);
    } catch (error) {
      console.error('Error fetching tracks:', error);
      setTracks([]);
    } finally {
      setLoading(false);
    }
  };

  const displayAlbums = (() => {
    if (randomAlbums.length === 0) return [];
    const selectedIndex = selectedAlbumId
      ? randomAlbums.findIndex((album) => album?.id === selectedAlbumId)
      : -1;

    if (randomAlbums.length < 3 || selectedIndex === -1) return randomAlbums;

    const prevIndex = (selectedIndex - 1 + randomAlbums.length) % randomAlbums.length;
    const nextIndex = (selectedIndex + 1) % randomAlbums.length;

    return [randomAlbums[prevIndex], randomAlbums[selectedIndex], randomAlbums[nextIndex]];
  })();

  return (  
    <section className="">
      <h1 className="mb-6 px-4 text-2xl font-bold text-white">
        Playlists
      </h1>
      <div className="flex items-center justify-center gap-6">
        {displayAlbums.length > 0 ? (
          displayAlbums.map((album, index) => {
            const cover = album?.images?.[0]?.url || null;
            const name = album?.name || 'Unknown Album';
            const isCenter = index === 1;
            return (
              <div 
                key={album?.id || index} 
                className={`cursor-pointer transition-transform ${isCenter ? 'scale-105' : 'hover:scale-105'} ${selectedAlbumId === album?.id ? 'rounded-lg' : ''}`}
                onClick={() => album?.id && handleAlbumClick(album.id)}
              >
                <img
                  src={cover}  
                  alt={name} 
                  className={`object-cover rounded-xs shadow-2xl ${isCenter ? "w-68 h-30" : "w-30 h-20 opacity-70"}`}
                  title={name}
                />
              </div>
            )
           })
          ) : (
          <p className="px-4 text-sm text-gray-500">No albums available.</p>
          )
        }
      </div>  
      <div className="mt-4 text-center">
        {displayAlbums.length > 0 && displayAlbums[1] && (
          <div className="text-md font-bold">
            <p className="mt-1">Top {displayAlbums[1]?.total_tracks || 0}</p>
            <h2 className="">{displayAlbums[1]?.name}</h2>
          </div>
        )}
      </div>
      <div className="mt-2 px-2">
        {loading ? (
          <p className="text-gray-500">Loading tracks...</p>
        ) : tracks.length > 0 ? (
          <ul className="space-y-1">
            {tracks.map((track) => (
              <div  key={track.id} >
                <li className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  {/* <span className="text-sm font-medium text-gray-600 w-6">{index + 1}</span> */}
                  <button 
                      onClick={() => setSelectedTrack(track)}
                      className="hover:opacity-70 transition"
                    >
                      <FaPlayCircle color="red" size={30} />
                    </button>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{track.name}</p>
                    <p className="text-xs">
                      {track.artists?.map((artist: any) => artist.name).join(', ') || 'Unknown Artist'}
                    </p>
                  </div>
                  <span className="text-xs">
                    {Math.floor(track.duration_ms / 60000)} : {((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
                  </span>
                </li> 
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
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg"
                  ></iframe>
                </div>
              )}
              </div>
            ))}  
          </ul>
        ) : (
          <p className="text-gray-500">No tracks available.</p>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="w-full text-center font-bold uppercase text-xs text-btnColor px-8 py-3 rounded-full border-2 hover:bg-btnColor hover:text-white transition"
        >
          Listen All
        </button>
      </div>
    </section>
  );
}
export default PlayContent;