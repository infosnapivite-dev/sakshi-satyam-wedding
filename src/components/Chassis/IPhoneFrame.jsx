import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function IPhoneFrame({ children }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics spring for realistic 3D chassis tilt
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtly rotate on 3D axes (max ±6 degrees)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  useEffect(() => {
    // Only attach interactive mouse tilt on desktop viewports (> 600px)
    if (typeof window === 'undefined' || window.innerWidth <= 600) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="iphone-wrapper"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Physical Hardware Buttons (Left Edge) */}
      <div className="btn-hardware btn-action" title="Action Button" />
      <div className="btn-hardware btn-vol-up" title="Volume Up" />
      <div className="btn-hardware btn-vol-down" title="Volume Down" />

      {/* Physical Hardware Buttons (Right Edge) */}
      <div className="btn-hardware btn-power" title="Side Power Button" />
      <div className="btn-hardware btn-camera-control" title="Camera Control" />

      {/* Main iPhone Device Chassis */}
      <div className="iphone-device-frame">
        {/* Dynamic Island (Pill Notch) */}
        <div className="iphone-notch">
          <div className="notch-lens" />
          <div className="notch-sensor" />
        </div>

        {/* Inner App Container Viewport */}
        <div className="inner-app-container">{children}</div>
      </div>
    </motion.div>
  );
}
