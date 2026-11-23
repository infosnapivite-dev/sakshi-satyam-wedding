import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import songSource from '../../assets/sakshi-satyam-song.mp3';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const userMutedRef = useRef(false);
  const wasPlayingBeforeHiddenRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.65;

    // Helper to attempt playing audio
    const attemptPlay = () => {
      if (userMutedRef.current) return;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            removeInteractionListeners();
          })
          .catch(() => {
            // Autoplay policy prevented playback, keep listeners active for user gesture
            setIsPlaying(false);
          });
      }
    };

    // User gesture handler to unlock audio
    const handleUserGesture = () => {
      if (!userMutedRef.current && audio.paused) {
        // Unlock Web Audio API context for iOS/Safari
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            const ctx = new AudioContext();
            if (ctx.state === 'suspended') ctx.resume();
          }
        } catch (_) {}

        attemptPlay();
      }
    };

    // Listen on multiple user activation events
    const events = ['click', 'pointerdown', 'touchstart', 'touchend', 'scroll', 'wheel', 'keydown'];
    const addInteractionListeners = () => {
      events.forEach((evt) => {
        window.addEventListener(evt, handleUserGesture, { passive: true, capture: true });
      });
    };

    const removeInteractionListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleUserGesture, { capture: true });
      });
    };

    // Global custom event from OpeningScreen or App
    const handleCustomPlay = () => {
      handleUserGesture();
    };
    window.addEventListener('app:play-audio', handleCustomPlay);

    // 1. Try immediate autoplay on visit
    attemptPlay();

    // 2. Add interaction listeners to play as soon as user touches/clicks anywhere
    addInteractionListeners();

    // 3. Auto-pause when user turns off screen, minimizes, or switches tabs
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!audio.paused) {
          wasPlayingBeforeHiddenRef.current = true;
          audio.pause();
        }
      } else {
        if (wasPlayingBeforeHiddenRef.current && !userMutedRef.current) {
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {});
          wasPlayingBeforeHiddenRef.current = false;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 4. Handle when browser tab/window is closed or navigated away
    const handlePageHide = () => {
      audio.pause();
      audio.currentTime = 0;
    };

    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handlePageHide);

    return () => {
      removeInteractionListeners();
      window.removeEventListener('app:play-audio', handleCustomPlay);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handlePageHide);
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
    <>
      {/* Real HTML5 Audio Element in DOM */}
      <audio
        ref={audioRef}
        src={songSource}
        autoPlay
        loop
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Volume Toggle in Top-Left Corner */}
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
    </>
  );
}
