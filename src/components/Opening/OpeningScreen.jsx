import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';

export default function OpeningScreen({ onOpen }) {
  const [isRemoved, setIsRemoved] = useState(false);
  const [isBlending, setIsBlending] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const img1Ref = useRef(null);
  const promptRef = useRef(null);
  const pulseTween = useRef(null);

  // Floating gentle entrance and breathing animation for the prompt
  useEffect(() => {
    if (!promptRef.current) return;

    gsap.fromTo(
      promptRef.current,
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        delay: 0.2,
        ease: 'power2.out',
        force3D: true,
        onComplete: () => {
          pulseTween.current = gsap.to(promptRef.current, {
            y: -6,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            force3D: true,
          });
        },
      }
    );

    return () => {
      pulseTween.current?.kill();
    };
  }, []);

  const handlePageClick = () => {
    if (isBlending || isRemoved) return;
    setIsBlending(true);
    
    // Stop floating pulse animation
    pulseTween.current?.kill();

    // Smoothly dissolve the prompt text as requested
    if (promptRef.current) {
      gsap.to(promptRef.current, {
        autoAlpha: 0,
        y: -12,
        scale: 0.95,
        duration: 0.5,
        ease: 'power2.in',
        overwrite: true,
        force3D: true,
        onComplete: () => {
          setShowPrompt(false);
        },
      });
    }

    // Notify parent to reveal subsequent pages & enable smooth scroll
    if (onOpen) onOpen();

    // Smooth GPU-accelerated blend transition adhering to PRD mandates
    gsap.to(img1Ref.current, {
      autoAlpha: 0,
      duration: 1.4,
      ease: 'power2.inOut',
      force3D: true,
      onComplete: () => {
        // Completely remove img1 from DOM after blend finishes
        setIsRemoved(true);
      },
    });
  };

  return (
    <div
      onClick={handlePageClick}
      className={`relative w-full h-full min-h-[100dvh] md:min-h-[852px] overflow-hidden select-none gpu-layer ${
        !isRemoved ? 'cursor-pointer' : ''
      }`}
      aria-label="Opening Page"
    >
      {/* Underlying Image: img2 (Base Layer) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden gpu-layer z-0">
        <img
          src={img2}
          alt="Wedding Backdrop Revealed"
          className="w-full h-full object-cover pointer-events-none select-none gpu-layer"
          draggable={false}
          decoding="async"
        />
      </div>

      {/* Top Image: img1 (Overlaid on img2, fades/blends out on click then removed) */}
      {!isRemoved && (
        <div
          ref={img1Ref}
          className="absolute inset-0 w-full h-full overflow-hidden gpu-layer z-10"
        >
          <img
            src={img1}
            alt="Wedding Cover"
            className="w-full h-full object-cover pointer-events-none select-none gpu-layer"
            draggable={false}
            decoding="async"
          />
        </div>
      )}

      {/* "Tap to Light Up the Palace" Prompt Overlay */}
      {showPrompt && (
        <div
          ref={promptRef}
          className="absolute bottom-16 sm:bottom-20 inset-x-0 flex flex-col items-center justify-center pointer-events-none select-none z-20 px-6 text-center gpu-layer"
        >
          <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 shadow-[0_6px_28px_rgba(0,0,0,0.65),0_0_15px_rgba(245,210,160,0.18)]">
            <Sparkles className="w-4 h-4 text-[#eec79a] animate-pulse flex-shrink-0" />
            <span className="font-cormorant text-[17px] sm:text-[19px] md:text-[20px] font-medium tracking-[0.14em] text-[#faf6ee] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Tap to Light Up the Palace
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
