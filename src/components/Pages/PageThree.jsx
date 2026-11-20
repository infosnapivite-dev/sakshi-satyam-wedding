import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import page3Bg from '../../assets/page3.jpg';
import coupleNames from '../../assets/couple-names.png';
import dividerImg from '../../assets/divider.webp';

export default function PageThree() {
  const containerRef = useRef(null);
  const namesRef = useRef(null);
  const dividerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth appearing animation staggered for each and every text element
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        namesRef.current,
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 1.15, ease: 'power2.out', force3D: true }
      )
        .fromTo(
          dividerRef.current,
          { autoAlpha: 0, scaleX: 0.4 },
          { autoAlpha: 0.95, scaleX: 1, duration: 0.95, ease: 'power2.out', force3D: true },
          '-=0.65'
        )
        .fromTo(
          line1Ref.current,
          { autoAlpha: 0, y: 15 },
          { autoAlpha: 1, y: 0, duration: 1.0, ease: 'power2.out', force3D: true },
          '-=0.55'
        )
        .fromTo(
          line2Ref.current,
          { autoAlpha: 0, y: 15 },
          { autoAlpha: 1, y: 0, duration: 1.0, ease: 'power2.out', force3D: true },
          '-=0.7'
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
      <div className="absolute top-[8.5%] right-[4%] w-[52%] max-w-[235px] flex flex-col items-center text-center pointer-events-none select-none gpu-layer z-20">
        {/* Couple Names (Sakshi & Satyam) - Scaled Up */}
        <div ref={namesRef} className="gpu-layer flex justify-center w-full">
          <img
            src={coupleNames}
            alt="Sakshi & Satyam"
            className="w-[140px] sm:w-[155px] md:w-[168px] h-auto object-contain pointer-events-none select-none drop-shadow-sm gpu-layer"
            draggable={false}
          />
        </div>

        {/* Ornamental Divider - Scaled Up */}
        <div ref={dividerRef} className="gpu-layer flex justify-center w-full my-2.5 sm:my-3">
          <img
            src={dividerImg}
            alt="Ornamental Divider"
            className="w-[98px] sm:w-[110px] md:w-[122px] h-auto object-contain pointer-events-none select-none opacity-95 gpu-layer"
            draggable={false}
          />
        </div>

        {/* Timeless Walls Poetic Inscription - Line by Line Animated with Increased Text Size */}
        <div className="gpu-layer flex flex-col items-center w-full">
          <p
            ref={line1Ref}
            className="font-cormorant italic font-medium text-[#4a2c35] text-[13.5px] sm:text-[15px] md:text-[16px] leading-[1.4] tracking-wide"
          >
            And amidst these timeless walls,
          </p>
          <p
            ref={line2Ref}
            className="font-cormorant italic font-medium text-[#4a2c35] text-[13.5px] sm:text-[15px] md:text-[16px] leading-[1.4] tracking-wide"
          >
            a new story begins.
          </p>
        </div>
      </div>
    </section>
  );
}
