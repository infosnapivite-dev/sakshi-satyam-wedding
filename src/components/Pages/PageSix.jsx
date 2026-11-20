import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import page6Bg from '../../assets/page6.jpg';
import sakshiTitle from '../../assets/sakshi-title.png';
import satyamTitle from '../../assets/satyam-title.png';

export default function PageSix() {
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
      id="page-6"
      className="relative w-full h-[100dvh] md:h-[852px] min-h-[100dvh] md:min-h-[852px] flex-shrink-0 gpu-layer overflow-hidden select-none"
    >
      {/* Background Image: Stone Pillar, Floral Urli, Ledge & Landscape */}
      <img
        src={page6Bg}
        alt="Wedding Invitation Formal Announcement"
        className="w-full h-full object-cover pointer-events-none select-none gpu-layer"
        draggable={false}
        decoding="async"
      />

      {/* Invitation Text Container (Positioned in Open Sky to the Right of the Pillar) */}
      <div
        ref={contentRef}
        className="absolute top-[13%] sm:top-[14%] left-[17%] right-[2%] flex flex-col items-center justify-center text-center pointer-events-none select-none gpu-layer z-20 px-2"
      >
        {/* Blessings Header */}
        <p className="font-cormorant italic text-[#5c4033] text-[13px] sm:text-[14px] md:text-[14.5px] leading-tight mb-1">
          With the blessings of
        </p>

        {/* Grandparents */}
        <h3 className="font-cormorant font-normal text-[#2e1d15] text-[15.5px] sm:text-[17px] md:text-[18px] leading-snug">
          Late Shri Satish Kr. Keshri
        </h3>
        <h3 className="font-cormorant font-normal text-[#2e1d15] text-[15.5px] sm:text-[17px] md:text-[18px] leading-snug mb-3 sm:mb-3.5">
          &amp; Smt. Rita Keshri
        </h3>

        {/* Formal Invitation Request */}
        <div className="space-y-0.5 mb-2.5 sm:mb-3">
          <p className="font-cormorant font-normal text-[#442f25] text-[11px] sm:text-[12px] md:text-[12.5px] leading-relaxed tracking-wide">
            The Keshri family requests the honour of your presence
          </p>
          <p className="font-cormorant font-normal text-[#442f25] text-[11px] sm:text-[12px] md:text-[12.5px] leading-relaxed tracking-wide">
            at the wedding of their beloved granddaughter
          </p>
        </div>

        {/* Bride Name (High-Res Asset) */}
        <div className="my-1 flex justify-center w-full">
          <img
            src={sakshiTitle}
            alt="Sakshi"
            className="w-[105px] sm:w-[115px] md:w-[125px] h-auto object-contain pointer-events-none select-none drop-shadow-sm gpu-layer"
            draggable={false}
          />
        </div>

        {/* Bride Family Details */}
        <div className="space-y-0.5 mb-2 sm:mb-2.5">
          <p className="font-cormorant font-normal text-[#38251b] text-[11px] sm:text-[12px] md:text-[12.5px] leading-relaxed">
            (D/o Mrs. Sangeeta &amp; Mr. Shekhar Keshri)
          </p>
          <p className="font-cormorant font-normal text-[#38251b] text-[11px] sm:text-[12px] md:text-[12.5px] leading-relaxed">
            (Sister of Shradha &amp; Shreshth Keshri)
          </p>
        </div>

        {/* Connecting Word */}
        <p className="font-cormorant italic text-[#5c4033] text-[13.5px] sm:text-[14.5px] md:text-[15px] my-1 leading-none">
          with
        </p>

        {/* Groom Name (High-Res Asset) */}
        <div className="my-1 flex justify-center w-full">
          <img
            src={satyamTitle}
            alt="Satyam"
            className="w-[115px] sm:w-[125px] md:w-[135px] h-auto object-contain pointer-events-none select-none drop-shadow-sm gpu-layer"
            draggable={false}
          />
        </div>

        {/* Groom Family Details */}
        <div className="space-y-0.5">
          <p className="font-cormorant font-normal text-[#38251b] text-[11px] sm:text-[12px] md:text-[12.5px] leading-relaxed">
            (Grand S/o Late Sunil Kumar Mehrotra
          </p>
          <p className="font-cormorant font-normal text-[#38251b] text-[11px] sm:text-[12px] md:text-[12.5px] leading-relaxed">
            &amp; Smt. Madhu Mehrotra)
          </p>
          <p className="font-cormorant font-normal text-[#38251b] text-[11px] sm:text-[12px] md:text-[12.5px] leading-relaxed">
            (S/o Mr. Kishan Mehrotra &amp; Mrs. Roli Mehrotra)
          </p>
        </div>
      </div>
    </section>
  );
}
