import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import page7Bg from '../../assets/page7.jpg';
import dividerImg from '../../assets/divider.webp';

export default function PageSeven() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, y: 16 },
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
      id="page-7"
      className="relative w-full h-[100dvh] md:h-[852px] min-h-[100dvh] md:min-h-[852px] flex-shrink-0 gpu-layer overflow-hidden select-none"
    >
      {/* Background Image: Night Illuminated Fort & Twilight Sky */}
      <img
        src={page7Bg}
        alt="Illuminated Fortress & Wedding Finale"
        className="w-full h-full object-cover pointer-events-none select-none gpu-layer"
        draggable={false}
        decoding="async"
      />

      {/* Closing Message Overlay (Bottom Dark Area) */}
      <div
        ref={contentRef}
        className="absolute inset-x-0 bottom-[8%] sm:bottom-[9%] md:bottom-[10%] flex flex-col items-center justify-center text-center pointer-events-none select-none gpu-layer z-20 px-4"
      >
        {/* Poetic Invitation Sign-off */}
        <p className="font-cormorant italic text-[#f5f0e6] text-[15px] sm:text-[16.5px] md:text-[17.5px] tracking-wide leading-relaxed font-normal">
          The lights are on. The celebrations await.
        </p>
        <p className="font-cormorant italic text-[#f5f0e6] text-[15px] sm:text-[16.5px] md:text-[17.5px] tracking-wide leading-relaxed font-normal mb-2.5 sm:mb-3">
          All that’s missing is you.
        </p>

        {/* Ornamental Gold Divider */}
        <div className="flex justify-center w-full my-1 sm:my-1.5 gpu-layer">
          <img
            src={dividerImg}
            alt="Divider"
            className="w-[84px] sm:w-[94px] md:w-[102px] h-auto object-contain pointer-events-none select-none opacity-90 brightness-110 gpu-layer"
            draggable={false}
          />
        </div>

        {/* Couple Names */}
        <h2 className="font-wolmer text-[#f5eedc] text-[19px] sm:text-[21px] md:text-[23px] uppercase tracking-[0.16em] font-normal mt-2 sm:mt-2.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          SAKSHI &amp; SATYAM
        </h2>

        {/* Official Wedding Hashtag */}
        <span className="font-cormorant text-[#c7bcab] text-[11px] sm:text-[12px] md:text-[12.5px] font-medium tracking-[0.16em] uppercase mt-2 opacity-85">
          #SakshiSeSatyamTak
        </span>
      </div>
    </section>
  );
}
