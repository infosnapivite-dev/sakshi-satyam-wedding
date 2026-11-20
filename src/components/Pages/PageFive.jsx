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
  const inscriptionRef = useRef(null);
  const daysRef = useRef(null);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);
  const dividersRef = useRef([]);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  // Live real-time countdown timer running continuously every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Smooth appearing animation staggered for each and every text element
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Inscription smoothly floats and fades in
      tl.fromTo(
        inscriptionRef.current,
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 1.05, ease: 'power2.out', force3D: true }
      )
        // 2. Countdown columns stagger into view
        .fromTo(
          [daysRef.current, hoursRef.current, minutesRef.current, secondsRef.current],
          { autoAlpha: 0, y: 20, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.95,
            stagger: 0.1,
            ease: 'power2.out',
            force3D: true,
          },
          '-=0.55'
        )
        // 3. Vertical dividers expand vertically
        .fromTo(
          dividersRef.current,
          { autoAlpha: 0, scaleY: 0 },
          {
            autoAlpha: 0.6,
            scaleY: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power2.out',
            force3D: true,
          },
          '-=0.75'
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
      <div className="absolute inset-x-0 top-[22%] sm:top-[23%] flex flex-col items-center justify-center text-center pointer-events-none select-none gpu-layer z-20 px-4">
        {/* Poetic Inscription - Scaled Up with Smooth Entrance */}
        <p
          ref={inscriptionRef}
          className="font-playfair text-[#2c1a11] text-[19.5px] sm:text-[22px] md:text-[23.5px] tracking-wide mb-8 sm:mb-10 font-normal leading-tight gpu-layer"
        >
          The wait for forever is almost over
        </p>

        {/* 4-Unit Live Countdown Clock - Scaled Up with Unified Font Style */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-5 w-full max-w-[360px]">
          {/* DAYS */}
          <div
            ref={daysRef}
            className="countdown-card flex flex-col items-center min-w-[54px] sm:min-w-[62px] gpu-layer"
          >
            <span className="font-playfair text-[42px] sm:text-[48px] md:text-[54px] leading-none text-[#2c1a11] tabular-nums font-normal">
              {timeLeft.days}
            </span>
            <span className="font-playfair text-[11px] sm:text-[12px] md:text-[12.5px] uppercase tracking-[0.16em] text-[#2c1a11] mt-2 font-normal">
              DAYS
            </span>
          </div>

          {/* Vertical Divider */}
          <div
            ref={(el) => (dividersRef.current[0] = el)}
            className="countdown-divider w-[1px] h-[40px] sm:h-[46px] bg-[#2c1a11]/60 self-center gpu-layer origin-center"
          />

          {/* HOURS */}
          <div
            ref={hoursRef}
            className="countdown-card flex flex-col items-center min-w-[54px] sm:min-w-[62px] gpu-layer"
          >
            <span className="font-playfair text-[42px] sm:text-[48px] md:text-[54px] leading-none text-[#2c1a11] tabular-nums font-normal">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="font-playfair text-[11px] sm:text-[12px] md:text-[12.5px] uppercase tracking-[0.16em] text-[#2c1a11] mt-2 font-normal">
              HOURS
            </span>
          </div>

          {/* Vertical Divider */}
          <div
            ref={(el) => (dividersRef.current[1] = el)}
            className="countdown-divider w-[1px] h-[40px] sm:h-[46px] bg-[#2c1a11]/60 self-center gpu-layer origin-center"
          />

          {/* MINUTES */}
          <div
            ref={minutesRef}
            className="countdown-card flex flex-col items-center min-w-[54px] sm:min-w-[62px] gpu-layer"
          >
            <span className="font-playfair text-[42px] sm:text-[48px] md:text-[54px] leading-none text-[#2c1a11] tabular-nums font-normal">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="font-playfair text-[11px] sm:text-[12px] md:text-[12.5px] uppercase tracking-[0.16em] text-[#2c1a11] mt-2 font-normal">
              MINUTES
            </span>
          </div>

          {/* Vertical Divider */}
          <div
            ref={(el) => (dividersRef.current[2] = el)}
            className="countdown-divider w-[1px] h-[40px] sm:h-[46px] bg-[#2c1a11]/60 self-center gpu-layer origin-center"
          />

          {/* SECONDS */}
          <div
            ref={secondsRef}
            className="countdown-card flex flex-col items-center min-w-[54px] sm:min-w-[62px] gpu-layer"
          >
            <span className="font-playfair text-[42px] sm:text-[48px] md:text-[54px] leading-none text-[#2c1a11] tabular-nums font-normal">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="font-playfair text-[11px] sm:text-[12px] md:text-[12.5px] uppercase tracking-[0.16em] text-[#2c1a11] mt-2 font-normal">
              SECONDS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
