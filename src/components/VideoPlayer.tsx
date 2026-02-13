"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Maximize2 } from "lucide-react";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title?: string;
}

export default function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  // If no video src provided, show a demo placeholder
  if (!src) {
    return (
      <div className="relative aspect-video bg-[#18181b] rounded-xl overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
            <Play size={24} className="text-[#a78bfa] ml-1" />
          </div>
          <p className="text-xs text-[#a1a1aa]">{title || "Video Preview"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-[#18181b] rounded-xl overflow-hidden group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        onEnded={() => setPlaying(false)}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors"
        initial={false}
        animate={{ opacity: playing ? 0 : 1 }}
        whileHover={{ opacity: 1 }}
      >
        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause size={20} className="text-white" />
          ) : (
            <Play size={20} className="text-white ml-0.5" />
          )}
        </button>
      </motion.div>

      <button
        className="absolute bottom-3 right-3 p-2 text-white/50 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Fullscreen"
        onClick={() => videoRef.current?.requestFullscreen()}
      >
        <Maximize2 size={16} />
      </button>
    </div>
  );
}
