import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import page3Bg from '../../assets/page3.jpg';
import coupleNames from '../../assets/couple-names.png';
import dividerImg from '../../assets/divider.webp';

export default function PageThree() {
  const containerRef = useRef(null);
  const namesRef = useRef(null);
  const dividerRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP entrance timeline triggered when Page 3 scrolls into view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        namesRef.current,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power2.out', force3D: true }
      )
        .fromTo(
          dividerRef.current,
          { autoAlpha: 0, scaleX: 0.6 },
          { autoAlpha: 0.9, scaleX: 1, duration: 0.9, ease: 'power2.out', force3D: true },
          '-=0.7'
        )
        .fromTo(
          quoteRef.current,
          { autoAlpha: 0, y: 15 },
          { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power2.out', force3D: true },
          '-=0.6'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="page-3"
      className="relative w-full h-[100dvh] md:h-[852px] min-h-[100dvh] md:min-h-[852px] flex-shrink-0 gpu-layer overflow-hidden select-none"
    >
      {/* Background Image */}
      <img
        src={page3Bg}
        alt="Sakshi & Satyam at Timeless Walls"
        className="w-full h-full object-cover pointer-events-none select-none gpu-layer"
        draggable={false}
        decoding="async"
      />

      {/* Elegant Typography Overlay (Upper Right Quadrant matching reference) */}
      <div className="absolute top-[9%] right-[5%] w-[48%] max-w-[210px] flex flex-col items-center text-center pointer-events-none select-none gpu-layer z-20">
        {/* Couple Names (Sakshi & Satyam) */}
        <div ref={namesRef} className="gpu-layer flex justify-center w-full">
          <img
            src={coupleNames}
            alt="Sakshi & Satyam"
            className="w-[125px] sm:w-[135px] md:w-[145px] h-auto object-contain pointer-events-none select-none drop-shadow-sm gpu-layer"
            draggable={false}
          />
        </div>

        {/* Ornamental Divider */}
        <div ref={dividerRef} className="gpu-layer flex justify-center w-full my-2 sm:my-2.5">
          <img
            src={dividerImg}
            alt="Ornamental Divider"
            className="w-[90px] sm:w-[100px] md:w-[110px] h-auto object-contain pointer-events-none select-none opacity-90 gpu-layer"
            draggable={false}
          />
        </div>

        {/* Timeless Walls Poetic Quote */}
        <div ref={quoteRef} className="gpu-layer flex justify-center w-full">
          <p className="font-cormorant italic font-medium text-[#4a2c35] text-[12px] sm:text-[13px] md:text-[13.5px] leading-[1.45] tracking-wide">
            And amidst these timeless walls,
            <br />
            a new story begins.
          </p>
        </div>
      </div>
    </section>
  );
}
