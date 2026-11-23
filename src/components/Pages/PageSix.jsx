import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import page6Bg from '../../assets/page6.jpg';
import sakshiTitle from '../../assets/sakshi-title.png';
import satyamTitle from '../../assets/satyam-title.png';
import omLogo from '../../assets/om logo.png';
import ganeshaLogo from '../../assets/ganesha logo.png';

export default function PageSix() {
  const containerRef = useRef(null);
  const textItemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth cascade appearing animation for each and every element
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
      <div className="absolute top-[5%] sm:top-[5.5%] md:top-[6%] left-[17%] right-[2%] flex flex-col items-center justify-center text-center pointer-events-none select-none gpu-layer z-20 px-2">
        {/* Sacred Om Emblem */}
        <div ref={addToRefs} className="flex justify-center w-full mb-1 sm:mb-1.5 gpu-layer">
          <img
            src={omLogo}
            alt="Om Emblem"
            className="w-[28px] sm:w-[32px] md:w-[36px] h-auto object-contain pointer-events-none select-none drop-shadow-sm gpu-layer"
            draggable={false}
          />
        </div>

        {/* Auspicious Lord Ganesha Emblem */}
        <div ref={addToRefs} className="flex justify-center w-full mb-1 sm:mb-1.5 gpu-layer">
          <img
            src={ganeshaLogo}
            alt="Lord Ganesha Emblem"
            className="w-[40px] sm:w-[46px] md:w-[50px] h-auto object-contain pointer-events-none select-none drop-shadow-sm gpu-layer"
            draggable={false}
          />
        </div>

        {/* Divine Invocation in Hindi */}
        <p
          ref={addToRefs}
          className="font-hindi text-[#3a2216] text-[13px] sm:text-[14px] md:text-[15px] tracking-wider mb-2.5 sm:mb-3 font-normal leading-tight gpu-layer"
        >
          ॥ श्री गणेशाय नमः ॥
        </p>

        {/* Blessings Header */}
        <p
          ref={addToRefs}
          className="font-cormorant italic text-[#5c4033] text-[14px] sm:text-[15px] md:text-[15.5px] leading-tight mb-1 gpu-layer"
        >
          With the blessings of
        </p>

        {/* Grandparents */}
        <h3
          ref={addToRefs}
          className="font-cormorant font-normal text-[#2e1d15] text-[16.5px] sm:text-[17.5px] md:text-[18.5px] leading-snug gpu-layer"
        >
          Late Satish Kr. Keshri
        </h3>
        <h3
          ref={addToRefs}
          className="font-cormorant font-normal text-[#2e1d15] text-[16.5px] sm:text-[17.5px] md:text-[18.5px] leading-snug mb-2.5 sm:mb-3 gpu-layer"
        >
          &amp; Smt. Rita Keshri
        </h3>

        {/* Formal Invitation Request */}
        <div className="space-y-0.5 mb-2 sm:mb-2.5">
          <p
            ref={addToRefs}
            className="font-cormorant font-normal text-[#442f25] text-[12px] sm:text-[13px] md:text-[13.5px] leading-relaxed tracking-wide gpu-layer"
          >
            The Keshri family requests the honour of your presence
          </p>
          <p
            ref={addToRefs}
            className="font-cormorant font-normal text-[#442f25] text-[12px] sm:text-[13px] md:text-[13.5px] leading-relaxed tracking-wide gpu-layer"
          >
            at the wedding of their beloved granddaughter
          </p>
        </div>

        {/* Bride Name (Scaled Up) */}
        <div ref={addToRefs} className="my-0.5 flex justify-center w-full gpu-layer">
          <img
            src={sakshiTitle}
            alt="Sakshi"
            className="w-[115px] sm:w-[126px] md:w-[138px] h-auto object-contain pointer-events-none select-none drop-shadow-sm gpu-layer"
            draggable={false}
          />
        </div>

        {/* Bride Family Details */}
        <div className="space-y-0.5 mb-2 sm:mb-2.5">
          <p
            ref={addToRefs}
            className="font-cormorant font-normal text-[#38251b] text-[12px] sm:text-[13px] md:text-[13.5px] leading-relaxed gpu-layer"
          >
            (D/o Mrs. Sangeeta &amp; Mr. Shekhar Keshri)
          </p>

        </div>

        {/* Connecting Word */}
        <p
          ref={addToRefs}
          className="font-cormorant italic text-[#5c4033] text-[14.5px] sm:text-[15.5px] md:text-[16px] my-0.5 leading-none gpu-layer"
        >
          with
        </p>

        {/* Groom Name (Scaled Up) */}
        <div ref={addToRefs} className="my-0.5 flex justify-center w-full gpu-layer">
          <img
            src={satyamTitle}
            alt="Satyam"
            className="w-[125px] sm:w-[136px] md:w-[148px] h-auto object-contain pointer-events-none select-none drop-shadow-sm gpu-layer"
            draggable={false}
          />
        </div>

        {/* Groom Family Details */}
        <div className="space-y-0.5">
          <p
            ref={addToRefs}
            className="font-cormorant font-normal text-[#38251b] text-[12px] sm:text-[13px] md:text-[13.5px] leading-relaxed gpu-layer"
          >
            (Grand S/o Late Shri Sunil KR. Mehrotra
          </p>
          <p
            ref={addToRefs}
            className="font-cormorant font-normal text-[#38251b] text-[12px] sm:text-[13px] md:text-[13.5px] leading-relaxed gpu-layer"
          >
            &amp; Smt. Madhu Mehrotra)
          </p>
          <p
            ref={addToRefs}
            className="font-cormorant font-normal text-[#38251b] text-[12px] sm:text-[13px] md:text-[13.5px] leading-relaxed gpu-layer"
          >
            (S/o Mrs. Roli Mehrotra &amp; Mr. Kishan Mehrotra)
          </p>
        </div>
      </div>
    </section>
  );
}
