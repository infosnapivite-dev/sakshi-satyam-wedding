import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import page4Bg from '../../assets/page4.jpg';
import dividerImg from '../../assets/divider.webp';

const ITINERARY_CARDS = [
  {
    id: 'bandhani-bazar',
    title: 'BANDHANI BAZAR',
    topPct: '37.8%',
  },
  {
    id: 'ace-of-hearts',
    title: 'ACE OF HEARTS',
    topPct: '46.0%',
  },
  {
    id: 'safari-tales',
    title: 'SAFARI TALES',
    topPct: '54.1%',
  },
  {
    id: 'lunar-whisper',
    title: 'LUNAR WHISPER',
    topPct: '63.1%',
  },
  {
    id: 'rajbagh',
    title: 'RAJBAGH',
    topPct: '71.2%',
  },
];

export default function PageFour() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP entrance timeline triggered when Page 4 scrolls into view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        cardsRef.current,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power2.out',
          force3D: true,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="page-4"
      className="relative w-full h-[100dvh] md:h-[852px] min-h-[100dvh] md:min-h-[852px] flex-shrink-0 gpu-layer overflow-hidden select-none"
    >
      {/* Background Illustration (Envelope & Stepped Cards) */}
      <img
        src={page4Bg}
        alt="Wedding Events Itinerary"
        className="w-full h-full object-cover pointer-events-none select-none gpu-layer"
        draggable={false}
        decoding="async"
      />

      {/* 5 Event Titles & Dividers Layered on Each Card */}
      {ITINERARY_CARDS.map((card, index) => (
        <div
          key={card.id}
          className="absolute inset-x-0 w-full flex justify-center pointer-events-none select-none z-20"
          style={{ top: card.topPct, transform: 'translateY(-50%)' }}
        >
          <div
            ref={(el) => (cardsRef.current[index] = el)}
            className="flex flex-col items-center justify-center text-center w-[80%] max-w-[310px] gpu-layer"
          >
            {/* Card Event Title */}
            <span className="font-cinzel font-semibold text-[#2c1508] text-[14px] sm:text-[15px] md:text-[16px] tracking-[0.15em] uppercase leading-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.35)]">
              {card.title}
            </span>

            {/* Ornamental Divider */}
            <img
              src={dividerImg}
              alt="Divider"
              className="w-[115px] sm:w-[128px] md:w-[138px] h-auto object-contain pointer-events-none select-none opacity-95 mt-1 sm:mt-1.5 gpu-layer"
              draggable={false}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
