import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';

export default function OpeningScreen({ onOpen }) {
  const [isRemoved, setIsRemoved] = useState(false);
  const [isBlending, setIsBlending] = useState(false);
  const img1Ref = useRef(null);

  const handlePageClick = () => {
    if (isBlending || isRemoved) return;
    setIsBlending(true);
    
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
    </div>
  );
}
