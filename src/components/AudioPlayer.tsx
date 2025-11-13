import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  title?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      // Restart the audio automatically when it ends
      audio.currentTime = 0;
      setCurrentTime(0);
      audio.play().catch(error => {
        console.error('Auto-restart failed:', error);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    };

    const handleError = () => {
      setIsLoading(false);
      console.error('Audio loading error');
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Floating Mobile Audio Player - Always Accessible */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-40 right-4 z-50"
      >
        <motion.button
          onClick={togglePlayPause}
          disabled={isLoading}
          className="w-14 h-14 bg-primary/90 hover:bg-primary border border-primary/50 rounded-full flex items-center justify-center text-primary-foreground shadow-xl disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation backdrop-blur-sm"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
          ) : isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-0.5" />
          )}
        </motion.button>
      </motion.div>

      {/* Full Controls for All Devices - Below View Details */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="flex flex-col items-center gap-4 mt-8 max-w-md mx-auto px-6 py-6 bg-gradient-to-br from-white/10 via-rose-50/5 to-pink-50/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl"
      >
        <audio ref={audioRef} src={src} preload="metadata" />

        {/* Song Title */}
        <div className="flex items-center gap-2 text-primary-foreground/90 bg-gradient-to-r from-rose-500/20 to-pink-500/20 px-4 py-2 rounded-full border border-primary/10">
          <span className="text-lg">🎵</span>
          <span className="font-semibold text-sm">{title}</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-sm bg-gradient-to-r from-rose-100/20 to-pink-100/20 p-4 rounded-xl border border-primary/10">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-3 bg-gradient-to-r from-rose-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider touch-manipulation shadow-inner"
            disabled={isLoading}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          />
          <div className="flex justify-between text-xs text-primary-foreground/70 mt-2 font-medium">
            <span className="bg-primary/10 px-2 py-1 rounded-md">{formatTime(currentTime)}</span>
            <span className="bg-primary/10 px-2 py-1 rounded-md">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Play/Pause Button */}
        <motion.button
          onClick={togglePlayPause}
          disabled={isLoading}
          className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 border-2 border-white/30 rounded-full flex items-center justify-center text-white shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation backdrop-blur-sm transition-all duration-300 hover:shadow-rose-500/25"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(244, 114, 182, 0.4)" }}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-0.5" />
          )}
        </motion.button>
      </motion.div>
    </>
  );
};

export default AudioPlayer;

<style>{`
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: hsl(var(--primary));
    cursor: pointer;
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
  }

  .slider::-moz-range-thumb {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: hsl(var(--primary));
    cursor: pointer;
    border: none;
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
  }
`}</style>
