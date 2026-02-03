"use client";

import { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { IoPlayBackSharp, IoPlayForwardSharp } from "react-icons/io5";
import { RiPlayLargeFill } from "react-icons/ri";
import { FaPause } from "react-icons/fa6";
import Image from "next/image";
import { playlist } from "../../../../../playlists"

export default function MusicPlayer() {
  const params = useParams();
  const audioRef = useRef(null);

  const currentId = parseInt(params.id) || 1;
  const slug = params.slug;
  const subslug = params.subslug;

  const currentTrackIndex = playlist.findIndex((track) => track.id === currentId);
  const currentTrack = currentTrackIndex !== -1 ? currentTrackIndex : 0;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const track = playlist[currentTrack];

  // Calculate next and previous IDs
  const prevIndex = currentTrack === 0 ? playlist.length - 1 : currentTrack - 1;
  const nextIndex = currentTrack === playlist.length - 1 ? 0 : currentTrack + 1;
  const prevId = playlist[prevIndex].id;
  const nextId = playlist[nextIndex].id;

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
    <main className="flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        
        {/* Vinyl + Background Wave */}
        <div className="relative flex justify-center mb-4">
          {/* Waves - spread out more and make larger */}
          <div className="absolute flex items-center justify-between gap-1 w-full z-0">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((i) => (
              <div
                key={i}
                className={`w-0.5 h-48 rounded-full bg-gray-500 transition-opacity duration-300
                ${isPlaying ? "opacity-60 animate-wave" : "opacity-0"}`}
                style={{
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>

          {/* Vinyl */}
          <div>
            <Image
              src="/disk.jpg"
              alt="Vinyl Record"
              width={200}
              height={200}
              className="relative z-10 w-48 h-auto rounded-full"
            />
          </div>
        </div>

        {/* Info */}
        <div className="text-center mb-6">
          <h1 className="text-lg font-bold text-gray-800">{track.title}</h1>
          <p className="text-sm text-gray-500">{track.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="relative w-full h-0.5 rounded-full bg-cyan-200">
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

          <div className="flex justify-between text-[12px] text-gray-700 mt-2">
            <span>0:00</span>
            <span>{track.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <Link
            href={`/categories/${slug}/${subslug}/${prevId}`}
            onClick={handleTrackChange}
            className="text-linearZero text-xl"
          >
            <CgPlayTrackPrev />
          </Link>
          <button onClick={rewind} className="text-xl">
            <IoPlayBackSharp size={18} />
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-linear-to-r from-linearZero via-[#F43A4F] to-linearFull text-white text-2xl flex items-center justify-center shadow-lg"
          >
            {isPlaying ? <FaPause /> : <RiPlayLargeFill />}
          </button>

          <button onClick={forward} className="text-xl">
            <IoPlayForwardSharp size={18} />
          </button>
          <Link
            href={`/categories/${slug}/${subslug}/${nextId}`}
            onClick={handleTrackChange}
            className="text-linearFull text-xl"
          >
            <CgPlayTrackNext />
          </Link>
        </div>

        {/* Audio */}
        <audio
          ref={audioRef}
          src={track.src}
          onTimeUpdate={handleTimeUpdate}
        ></audio>
      </div>
    </main>
  );
}
