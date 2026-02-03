"use client";

import { useRef, useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { IoPlayBackSharp, IoPlayForwardSharp } from "react-icons/io5";
import { RiPlayLargeFill } from "react-icons/ri";
import { FaPause } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";

export default function MusicPlayer() {
  const params = useParams();
  const searchParams = useSearchParams();
  const audioRef = useRef(null);

  // Get track info from URL parameters
  const trackName = searchParams.get('track') || 'Unknown Track';
  const artistName = searchParams.get('artist') || 'Unknown Artist';
  const trackDuration = searchParams.get('duration') || '0:00';
  const trackImage = searchParams.get('image') || '';
  const trackId = params.slug;

  // Create a playlist with the current track
  const playlist = [
    {
      id: trackId,
      title: trackName,
      artist: artistName,
      src: "/music1.mp3", // Spotify preview URL would go here
      duration: trackDuration,
      image: trackImage,
    }
  ];

  const currentTrack = 0; // Always the first (and only) track

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const track = playlist[currentTrack];

  // For single track, disable prev/next navigation
  const hasPrevNext = false;

  /* Play - Pause */
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  /* Handle track navigation - reset playing state */
  const handleTrackChange = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  /* Rewind 10s */
  const rewind = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      0,
      audioRef.current.currentTime - 10
    );
  };

  /* Forward 10s */
  const forward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      audioRef.current.duration,
      audioRef.current.currentTime + 10
    );
  };

  /* Progress update */
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const percent =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(percent || 0);
  };

  /* Seek */
  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const time =
      (Number(e.target.value) / 100) * audioRef.current.duration;
    audioRef.current.currentTime = time;
  };

  /* Auto play on track change */
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    if (isPlaying) audioRef.current.play();
  }, [currentTrack]);

  return (
    <main className="flex items-center justify-center mt-6">
      <div className="max-w-md w-full px-4">
        {/* Info */}
        <div className="text-center mb-6">
          {track.image && (
            <div className="mb-3 w-40 h-40 p-2 bg-circleOne/40 rounded-full mx-auto">
              <div className="flex justify-center mb-3 w-36 h-36 p-2 bg-circleOne/50 rounded-full mx-auto">
                <img
                  src={track.image}
                  alt={track.title}
                  className="w-32 h-32 rounded-full object-cover shadow"
                />
              </div>
            </div>
          )}
          <h1 className="text-lg font-bold text-white">{track.title}</h1>
          <p className="text-sm text-gray-500">{track.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="relative w-full h-0.5 rounded-full bg-red-500">
            <div
              className="absolute h-0.5 rounded-full bg-linear-to-r from-orange-400 to-pink-500"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-pink-600 shadow-md"
              style={{
                left: `calc(${progress}% - 8px)`,
                maxLeft: "calc(100% - 16px)",
              }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <div className="flex justify-between text-[12px] text-white mt-2">
            <span>0:00</span>
            <span>{track.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button 
            disabled
            className="text-white text-xl cursor-not-allowed"
          >
            <CgPlayTrackPrev />
          </button>
          <button onClick={rewind} className="text-xl text-white">
            <IoPlayBackSharp size={18} />
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-linear-to-r from-linearZero via-[#F43A4F] to-linearFull text-white text-2xl flex items-center justify-center shadow-lg"
          >
            {isPlaying ? <FaPause /> : <RiPlayLargeFill />}
          </button>

          <button onClick={forward} className="text-xl text-white">
            <IoPlayForwardSharp size={18} />
          </button>
          <button
            disabled
            className="text-white text-xl cursor-not-allowed"
          >
            <CgPlayTrackNext />
          </button>
        </div>

        {/* Audio */}
        <audio
          ref={audioRef}
          src={playlist[0].src}
          onTimeUpdate={handleTimeUpdate}
        ></audio>

        {/* Back to Search */}
        <div className="mt-6 text-center">
          <Link 
            href="/search" 
            className="text-sm text-white bg-linear-to-r from-linearFull via-[#F43A4F] to-linearZero px-2 py-2 rounded hover:text-blue-950"
          >
            <FaArrowLeft className="inline mr-1" /> Back to Search
          </Link>
        </div>
      </div>
    </main>
  );
}
