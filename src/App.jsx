import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import IPhoneFrame from './components/Chassis/IPhoneFrame';
import OpeningScreen from './components/Opening/OpeningScreen';
import PageThree from './components/Pages/PageThree';
import PageFour from './components/Pages/PageFour';
import PageFive from './components/Pages/PageFive';
import PageSix from './components/Pages/PageSix';
import PageSeven from './components/Pages/PageSeven';

import './styles/iphone-mockup.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const scrollContainerRef = useRef(null);
  const lenisRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const scrollerEl = scrollContainerRef.current;
    if (!scrollerEl) return;

    // Synchronize Lenis smooth scroll targeting the active inner app viewport
    const lenis = new Lenis({
      wrapper: scrollerEl,
      content: scrollerEl.firstElementChild,
      lerp: 0.08,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Initially stop scroll until user clicks to open
    lenis.stop();

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Bind GSAP ScrollTrigger to track the inner mockup container
    ScrollTrigger.defaults({
      scroller: scrollerEl,
    });

    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // When invitation is opened, unlock Lenis and update scroll dimensions
  useEffect(() => {
    if (isOpened && lenisRef.current) {
      lenisRef.current.start();
      const timer = setTimeout(() => {
        lenisRef.current?.resize();
        ScrollTrigger.refresh();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isOpened]);

  const handleOpenInvitation = () => {
    setIsOpened(true);
  };

  return (
    <div className="desktop-viewport-container">
      <IPhoneFrame>
        <main
          id="mockup-scroll-container"
          ref={scrollContainerRef}
          className={`inner-app-scroll gpu-layer ${!isOpened ? 'overflow-y-hidden' : 'overflow-y-auto'}`}
        >
          <div id="scroll-content" className="w-full flex flex-col min-h-full gpu-layer">
            {/* Opening Page Section (img1 smoothly blends into img2) */}
            <section
              id="opening-page"
              className="relative w-full h-[100dvh] md:h-[852px] min-h-[100dvh] md:min-h-[852px] flex-shrink-0 gpu-layer overflow-hidden"
            >
              <OpeningScreen onOpen={handleOpenInvitation} />
            </section>

            {/* Subsequent Invitation Pages in single page scroll */}
            {isOpened && (
              <>
                {/* Page 3: Couple photo with typography & ornament divider */}
                <PageThree />

                {/* Page 4: Events itinerary cards inside envelope */}
                <PageFour />

                {/* Page 5: Running Countdown Clock */}
                <PageFive />

                {/* Page 6: Formal Wedding Invitation Announcement */}
                <PageSix />

                {/* Page 7: Grand Finale & Official Wedding Hashtag */}
                <PageSeven />
              </>
            )}
          </div>
        </main>
      </IPhoneFrame>
    </div>
  );
}
