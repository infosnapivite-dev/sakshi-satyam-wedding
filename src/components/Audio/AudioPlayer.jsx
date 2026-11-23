import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import songSource from '../../assets/sakshi-satyam-song.mp3';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const userMutedRef = useRef(false);
  const wasPlayingBeforeHiddenRef = useRef(false);

  useEffect(() => {
    // Initialize audio instance
    const audio = new Audio(songSource);
    audio.loop = true;
    audio.volume = 0.65;
    audioRef.current = audio;

    // Helper to attempt playing audio
    const attemptPlay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            cleanupInteractionListeners();
          })
          .catch(() => {
            // Browser autoplay policy blocked; wait for first user gesture
            setIsPlaying(false);
          });
      }
    };

    // User gesture listener to unlock audio if autoplay was blocked
    const handleFirstUserGesture = () => {
      if (!userMutedRef.current && audio.paused) {
        attemptPlay();
      }
    };

    const cleanupInteractionListeners = () => {
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
      window.removeEventListener('scroll', handleFirstUserGesture, true);
      window.removeEventListener('keydown', handleFirstUserGesture);
    };

    // 1. Try immediate autoplay on visit
    attemptPlay();

    // 2. Also register first interaction listeners as fallback for strict browser autoplay policies
    window.addEventListener('click', handleFirstUserGesture, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstUserGesture, { once: true, passive: true });
    window.addEventListener('scroll', handleFirstUserGesture, { once: true, passive: true, capture: true });
    window.addEventListener('keydown', handleFirstUserGesture, { once: true, passive: true });

    // 3. Handle when user turns off / minimizes / switches browser tab: turn off/pause song
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden or minimized
        if (audio && !audio.paused) {
          audio.pause();
          wasPlayingBeforeHiddenRef.current = true;
          setIsPlaying(false);
        }
      } else {
        // Tab restored: resume only if it was playing before and user didn't explicitly mute
        if (wasPlayingBeforeHiddenRef.current && !userMutedRef.current) {
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {});
          wasPlayingBeforeHiddenRef.current = false;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 4. Handle when user closes the window or navigates away
    const handlePageHide = () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };

    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handlePageHide);

    return () => {
      cleanupInteractionListeners();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handlePageHide);
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  const handleToggleVolume = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      userMutedRef.current = true;
    } else {
      userMutedRef.current = false;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error('Audio playback failed:', err);
      });
    }
  };

  return (
    <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-50 pointer-events-auto select-none">
      <button
        type="button"
        onClick={handleToggleVolume}
        aria-label={isPlaying ? 'Mute background song' : 'Play background song'}
        title={isPlaying ? 'Mute Music' : 'Play Music'}
        className="group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.5),0_0_12px_rgba(230,195,140,0.2)] transition-all duration-300 active:scale-95 cursor-pointer"
      >
        {/* Subtle Ambient Pulse Ring when Playing */}
        {isPlaying && (
          <span className="absolute -inset-0.5 rounded-full border border-[#eec79a]/40 animate-ping opacity-60 pointer-events-none" />
        )}

        {/* Audio Status Icon */}
        {isPlaying ? (
          <Volume2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#ecd2b2] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] transition-transform duration-200 group-hover:scale-110" />
        ) : (
          <VolumeX className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#bfb5a7]/75 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] transition-transform duration-200 group-hover:scale-110" />
        )}
      </button>
    </div>
  );
}
