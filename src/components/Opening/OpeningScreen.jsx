import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';

export default function OpeningScreen({ onOpen, onSecondImageVisible, onManualScrollRequest }) {
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
      { autoAlpha: 0, y: -14 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        delay: 0.2,
        ease: 'power2.out',
        force3D: true,
        onComplete: () => {
          pulseTween.current = gsap.to(promptRef.current, {
            y: 5,
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
    if (isRemoved) {
      // User tapped while second image is visible: scroll to Page 3 immediately
      if (onManualScrollRequest) onManualScrollRequest();
      return;
    }
    if (isBlending) return;
    setIsBlending(true);
    
    // Stop floating pulse animation
    pulseTween.current?.kill();

    // Smoothly dissolve the prompt text as requested
    if (promptRef.current) {
      gsap.to(promptRef.current, {
        autoAlpha: 0,
        y: -14,
        scale: 0.96,
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
        if (onSecondImageVisible) {
          onSecondImageVisible();
        }
      },
    });
  };

  return (
    <div
      onClick={handlePageClick}
      className="relative w-full h-full min-h-[100dvh] md:min-h-[852px] overflow-hidden select-none gpu-layer cursor-pointer"
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

      {/* "Tap to Light Up the Palace" Prompt Overlay (Positioned at top, clean text layout) */}
      {showPrompt && (
        <div
          ref={promptRef}
          className="absolute top-14 sm:top-16 md:top-20 inset-x-0 flex flex-col items-center justify-center pointer-events-none select-none z-20 px-6 text-center gpu-layer"
        >
          <p className="font-cormorant text-[20px] sm:text-[23px] md:text-[25px] font-medium tracking-[0.1em] sm:tracking-[0.14em] text-[#faf6ee] drop-shadow-[0_2px_14px_rgba(0,0,0,0.92)]">
            Tap to Light Up the Palace
          </p>
        </div>
      )}
    </div>
  );
}
