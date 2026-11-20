import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import page5Bg from '../../assets/page5.jpg';

// Target wedding date: Feb 1, 2027 matching wedding suite
const TARGET_WEDDING_DATE = new Date('2027-02-01T12:00:00').getTime();

function calculateTimeLeft() {
  const now = new Date().getTime();
  const diff = Math.max(0, TARGET_WEDDING_DATE - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function PageFive() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  // Live real-time countdown timer running continuously every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // GSAP scroll entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="page-5"
      className="relative w-full h-[100dvh] md:h-[852px] min-h-[100dvh] md:min-h-[852px] flex-shrink-0 gpu-layer overflow-hidden select-none"
    >
      {/* Background Image: Fort Ramparts, Lantern & Hills */}
      <img
        src={page5Bg}
        alt="Wedding Countdown Backdrop"
        className="w-full h-full object-cover pointer-events-none select-none gpu-layer"
        draggable={false}
        decoding="async"
      />

      {/* Countdown Content Overlay (Centered in Upper Open Sky) */}
      <div
        ref={contentRef}
        className="absolute inset-x-0 top-[23%] sm:top-[24%] flex flex-col items-center justify-center text-center pointer-events-none select-none gpu-layer z-20 px-4"
      >
        {/* Poetic Inscription */}
        <p className="font-playfair text-[#2c1a11] text-[18px] sm:text-[20px] md:text-[21px] tracking-wide mb-8 sm:mb-10 font-normal leading-tight">
          The wait for forever is almost over
        </p>

        {/* 4-Unit Live Countdown Clock - Unified Font Style */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-5 w-full max-w-[340px]">
          {/* DAYS */}
          <div className="flex flex-col items-center min-w-[50px] sm:min-w-[58px]">
            <span className="font-playfair text-[38px] sm:text-[44px] md:text-[48px] leading-none text-[#2c1a11] tabular-nums font-normal">
              {timeLeft.days}
            </span>
            <span className="font-playfair text-[10px] sm:text-[11px] md:text-[11.5px] uppercase tracking-[0.14em] text-[#2c1a11] mt-1.5 font-normal">
              DAYS
            </span>
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] h-[36px] sm:h-[42px] bg-[#2c1a11]/60 self-center" />

          {/* HOURS */}
          <div className="flex flex-col items-center min-w-[50px] sm:min-w-[58px]">
            <span className="font-playfair text-[38px] sm:text-[44px] md:text-[48px] leading-none text-[#2c1a11] tabular-nums font-normal">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="font-playfair text-[10px] sm:text-[11px] md:text-[11.5px] uppercase tracking-[0.14em] text-[#2c1a11] mt-1.5 font-normal">
              HOURS
            </span>
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] h-[36px] sm:h-[42px] bg-[#2c1a11]/60 self-center" />

          {/* MINUTES */}
          <div className="flex flex-col items-center min-w-[50px] sm:min-w-[58px]">
            <span className="font-playfair text-[38px] sm:text-[44px] md:text-[48px] leading-none text-[#2c1a11] tabular-nums font-normal">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="font-playfair text-[10px] sm:text-[11px] md:text-[11.5px] uppercase tracking-[0.14em] text-[#2c1a11] mt-1.5 font-normal">
              MINUTES
            </span>
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] h-[36px] sm:h-[42px] bg-[#2c1a11]/60 self-center" />

          {/* SECONDS */}
          <div className="flex flex-col items-center min-w-[50px] sm:min-w-[58px]">
            <span className="font-playfair text-[38px] sm:text-[44px] md:text-[48px] leading-none text-[#2c1a11] tabular-nums font-normal">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="font-playfair text-[10px] sm:text-[11px] md:text-[11.5px] uppercase tracking-[0.14em] text-[#2c1a11] mt-1.5 font-normal">
              SECONDS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
