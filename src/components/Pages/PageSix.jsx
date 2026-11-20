import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import page6Bg from '../../assets/page6.jpg';
import sakshiTitle from '../../assets/sakshi-title.png';
import satyamTitle from '../../assets/satyam-title.png';

export default function PageSix() {
  const containerRef = useRef(null);
  const textItemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth cascade appearing animation for each and every text line
      gsap.fromTo(
        textItemsRef.current,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
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

  const addToRefs = (el) => {
    if (el && !textItemsRef.current.includes(el)) {
      textItemsRef.current.push(el);
    }
  };

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
      <div className="absolute top-[12%] sm:top-[13%] left-[17%] right-[2%] flex flex-col items-center justify-center text-center pointer-events-none select-none gpu-layer z-20 px-2">
        {/* Blessings Header */}
        <p
          ref={addToRefs}
          className="font-cormorant italic text-[#5c4033] text-[14.5px] sm:text-[16px] md:text-[16.5px] leading-tight mb-1 gpu-layer"
        >
          With the blessings of
        </p>

        {/* Grandparents */}
        <h3
          ref={addToRefs}
          className="font-cormorant font-normal text-[#2e1d15] text-[17px] sm:text-[18.5px] md:text-[19.5px] leading-snug gpu-layer"
        >
          Late Shri Satish Kr. Keshri
        </h3>
        <h3
          ref={addToRefs}
          className="font-cormorant font-normal text-[#2e1d15] text-[17px] sm:text-[18.5px] md:text-[19.5px] leading-snug mb-3.5 sm:mb-4 gpu-layer"
        >
          &amp; Smt. Rita Keshri
        </h3>

        {/* Formal Invitation Request */}
        <div className="space-y-0.5 mb-2.5 sm:mb-3">
          <p
            ref={addToRefs}
            className="font-cormorant font-normal text-[#442f25] text-[12.5px] sm:text-[13.5px] md:text-[14px] leading-relaxed tracking-wide gpu-layer"
          >
            The Keshri family requests the honour of your presence
          </p>
          <p
            ref={addToRefs}
            className="font-cormorant font-normal text-[#442f25] text-[12.5px] sm:text-[13.5px] md:text-[14px] leading-relaxed tracking-wide gpu-layer"
          >
            at the wedding of their beloved granddaughter
          </p>
        </div>

        {/* Bride Name (Scaled Up) */}
        <div ref={addToRefs} className="my-1 flex justify-center w-full gpu-layer">
          <img
            src={sakshiTitle}
            alt="Sakshi"
            className="w-[118px] sm:w-[130px] md:w-[142px] h-auto object-contain pointer-events-none select-none drop-shadow-sm gpu-layer"
            draggable={false}
          />
        </div>

        {/* Bride Family Details */}
        <div className="space-y-0.5 mb-2.5 sm:mb-3">
          <p
            ref={addToRefs}
            className="font-cormorant font-normal text-[#38251b] text-[12.5px] sm:text-[13.5px] md:text-[14px] leading-relaxed gpu-layer"
          >
            (D/o Mrs. Sangeeta &amp; Mr. Shekhar Keshri)
          </p>
          <p
            ref={addToRefs}
            className="font-cormorant font-normal text-[#38251b] text-[12.5px] sm:text-[13.5px] md:text-[14px] leading-relaxed gpu-layer"
          >
            (Sister of Shradha &amp; Shreshth Keshri)
          </p>
        </div>

        {/* Connecting Word */}
        <p
          ref={addToRefs}
          className="font-cormorant italic text-[#5c4033] text-[15px] sm:text-[16.5px] md:text-[17px] my-1 leading-none gpu-layer"
        >
          with
        </p>

        {/* Groom Name (Scaled Up) */}
        <div ref={addToRefs} className="my-1 flex justify-center w-full gpu-layer">
          <img
            src={satyamTitle}
            alt="Satyam"
            className="w-[128px] sm:w-[140px] md:w-[152px] h-auto object-contain pointer-events-none select-none drop-shadow-sm gpu-layer"
            draggable={false}
          />
        </div>

        {/* Groom Family Details */}
        <div className="space-y-0.5">
          <p
            ref={addToRefs}
            className="font-cormorant font-normal text-[#38251b] text-[12.5px] sm:text-[13.5px] md:text-[14px] leading-relaxed gpu-layer"
          >
            (Grand S/o Late Sunil Kumar Mehrotra
          </p>
          <p
            ref={addToRefs}
            className="font-cormorant font-normal text-[#38251b] text-[12.5px] sm:text-[13.5px] md:text-[14px] leading-relaxed gpu-layer"
          >
            &amp; Smt. Madhu Mehrotra)
          </p>
          <p
            ref={addToRefs}
            className="font-cormorant font-normal text-[#38251b] text-[12.5px] sm:text-[13.5px] md:text-[14px] leading-relaxed gpu-layer"
          >
            (S/o Mr. Kishan Mehrotra &amp; Mrs. Roli Mehrotra)
          </p>
        </div>
      </div>
    </section>
  );
}
