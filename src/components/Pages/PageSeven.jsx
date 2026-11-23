import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import page7Bg from '../../assets/page7.jpg';
import dividerImg from '../../assets/divider.webp';

export default function PageSeven() {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const dividerRef = useRef(null);
  const namesRef = useRef(null);
  const hashtagRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth appearing animation staggered for each and every text element
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        line1Ref.current,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 1.05, ease: 'power2.out', force3D: true }
      )
        .fromTo(
          line2Ref.current,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 1.05, ease: 'power2.out', force3D: true },
          '-=0.75'
        )
        .fromTo(
          dividerRef.current,
          { autoAlpha: 0, scaleX: 0.4 },
          { autoAlpha: 0.95, scaleX: 1, duration: 0.95, ease: 'power2.out', force3D: true },
          '-=0.65'
        )
        .fromTo(
          namesRef.current,
          { autoAlpha: 0, y: 20, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: 'power2.out', force3D: true },
          '-=0.65'
        )
        .fromTo(
          hashtagRef.current,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 0.9, y: 0, duration: 0.95, ease: 'power2.out', force3D: true },
          '-=0.55'
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
      <div className="absolute inset-x-0 bottom-[4%] sm:bottom-[4.5%] md:bottom-[5%] flex flex-col items-center justify-center text-center pointer-events-none select-none gpu-layer z-20 px-4">
        {/* Poetic Invitation Sign-off - Scaled Up with Staggered Entrance */}
        <p
          ref={line1Ref}
          className="font-cormorant italic text-[#f5f0e6] text-[17px] sm:text-[18.5px] md:text-[20px] tracking-wide leading-relaxed font-normal gpu-layer"
        >
          Together with love and excitement,
        </p>
        <p
          ref={line2Ref}
          className="font-cormorant italic text-[#f5f0e6] text-[17px] sm:text-[18.5px] md:text-[20px] tracking-wide leading-relaxed font-normal mb-3 sm:mb-3.5 gpu-layer"
        >
          Sharad Chacha, Shradha and Shreshth  await the pleasure of your presence as Sakshi begins her forever with Satyam.
        </p>

        {/* Ornamental Gold Divider - Scaled Up */}
        <div ref={dividerRef} className="flex justify-center w-full my-1 sm:my-1.5 gpu-layer">
          <img
            src={dividerImg}
            alt="Divider"
            className="w-[98px] sm:w-[110px] md:w-[120px] h-auto object-contain pointer-events-none select-none opacity-90 brightness-110 gpu-layer"
            draggable={false}
          />
        </div>

        {/* Couple Names - Scaled Up with Wolmer Font */}
        <h2
          ref={namesRef}
          className="font-wolmer text-[#f5eedc] text-[22px] sm:text-[25px] md:text-[27px] uppercase tracking-[0.18em] font-normal mt-2.5 sm:mt-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] gpu-layer"
        >
          SAKSHI &amp; SATYAM
        </h2>

        {/* Official Wedding Hashtag - Scaled Up */}
        <span
          ref={hashtagRef}
          className="font-cormorant text-[#c7bcab] text-[12.5px] sm:text-[13.5px] md:text-[14.5px] font-medium tracking-[0.18em] uppercase mt-2.5 opacity-90 gpu-layer"
        >
          #SakshiSeSatyamTak
        </span>
      </div>
    </section>
  );
}
