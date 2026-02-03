'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { FaPlayCircle } from "react-icons/fa";

type AlbumContentProps = {
  albums: any[];
};

function AlbumContent({ albums }: AlbumContentProps) {
  console.log("AlbumContent albums:", albums);

  const [randomAlbums, setRandomAlbums] = useState<any[]>([]);

  // Shuffle albums only on client side to avoid hydration mismatch
  useEffect(() => {
    if (albums.length > 0) {
      const shuffled = [...albums].sort(() => Math.random() - 0.5);
      setRandomAlbums(shuffled.slice(0, 3));
    }
  }, [albums]);

  
  return (  
    <section className="px-4">
      <h2 className="gradient-text text-3xl font-bold">All Albums</h2>
      <div className="flex items-center justify-between my-3">
        <p className="text-xs font-semibold">Feature Albums</p>
        <button className="text-xs text-red-500">View All</button>
      </div>    
      <div className="flex items-center justify-center gap-2">
        {randomAlbums.length > 0 ? (
          randomAlbums.map((album, index) => {
            const cover = album.images && album.images[0] ? album.images[0].url : null;
            const name = album.name;
            return (
              <Link key={album.id || index} href={`/albums/${album.id}`} className="block">
                <img
                  src={cover}  
                  alt={name} 
                  className="w-30 h-20 object-cover rounded-lg" 
                />
              </Link>
            )
           })
          ) : (
          <p className="px-4 text-sm text-gray-500">No albums available.</p>
          )
        }
      </div>  
      <div className="space-y-4 mt-4">
        {albums.length > 0 ? (
          albums.map((album, index) => {
            const cover = album.images && album.images[0] ? album.images[0].url : null;
            const name = album.name;

            return (
              <div key={album.id || index}>
                <div className="">
                  <Link href={`/albums/${album.id}`} className="flex items-center justify-between gap-2">
                    <div className='flex items-center gap-2'>
                      {cover ? (
                        <img src={cover} alt={name} className="w-12 h-12 rounded object-cover" />
                      ) : (
                        <FaPlayCircle color="red" size={30} />
                      )}
                      <div>
                        <h4 className="font-semibold text-xs">{name}</h4>
                        <p className="text-xs text-gray-600">By {album.owner?.display_name || "Unknown"}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{album.tracks?.total} songs</p>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="px-4 text-sm text-gray-500">No albums available.</p>
        )}
      </div>
    </section>
  );
}

export default AlbumContent;
