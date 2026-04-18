'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, motion } from 'framer-motion';

interface TextOverlay {
  scrollProgress: number;
  text: string;
  alignment: 'left' | 'center' | 'right';
  subtext?: string;
}

interface ScrollytellingVideoProps {
  videoSrc: string;
  overlayText: TextOverlay[];
  backgroundColor?: string;
  enableReverse?: boolean;
}

export const ScrollytellingVideo: React.FC<ScrollytellingVideoProps> = ({
  videoSrc,
  overlayText,
  backgroundColor = '#0a0a0a',
  enableReverse = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const prevScrollY = useRef(0);
  const prevTime = useRef(Date.now());
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end end'],
  });

  // Sync scroll progress with video playback
  useEffect(() => {
    if (!isVideoReady || !videoRef.current) return;

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      setScrollProgress(progress);

      // Calculate scroll velocity
      const currentTime = Date.now();
      const timeDelta = currentTime - prevTime.current;
      const scrollDelta = window.scrollY - prevScrollY.current;
      const velocity = scrollDelta / (timeDelta || 1);
      setScrollVelocity(velocity);

      prevScrollY.current = window.scrollY;
      prevTime.current = currentTime;

      if (videoRef.current && videoDuration > 0) {
        // Clamp progress between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, progress));
        const targetTime = clampedProgress * videoDuration;

        // Use requestAnimationFrame for smooth updates
        requestAnimationFrame(() => {
          if (videoRef.current) {
            // Only update if difference is significant (avoid constant micro-updates)
            if (Math.abs(videoRef.current.currentTime - targetTime) > 0.05) {
              videoRef.current.currentTime = targetTime;
            }
          }
        });
      }
    });

    return () => unsubscribe();
  }, [isVideoReady, videoDuration, scrollYProgress]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
      setIsVideoReady(true);
      setIsLoading(false);
    }
  };

  const handleCanPlayThrough = () => {
    setIsLoading(false);
  };

  // Fallback: ensure video ready state even if events don't fire immediately
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (videoRef.current && !isVideoReady) {
        const duration = videoRef.current.duration;
        if (duration && isFinite(duration)) {
          setVideoDuration(duration);
          setIsVideoReady(true);
          setIsLoading(false);
        }
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [videoSrc, isVideoReady]);

  // Calculate which overlay should be visible based on scroll progress
  const getVisibleOverlay = (): TextOverlay | null => {
    let closestOverlay: TextOverlay | null = null;
    let closestDistance = Infinity;

    overlayText.forEach((overlay) => {
      const distance = Math.abs(scrollProgress - overlay.scrollProgress);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestOverlay = overlay;
      }
    });

    // Show overlay only if within 15% of target scroll progress
    return closestDistance < 0.15 ? closestOverlay : null;
  };

  const visibleOverlay = getVisibleOverlay();

  // Calculate opacity for text transition
  const getOverlayOpacity = (targetProgress: number): number => {
    const distance = Math.abs(scrollProgress - targetProgress);
    if (distance < 0.05) return 1; // Fully visible
    if (distance < 0.15) return 1 - (distance - 0.05) / 0.1; // Fade out
    return 0;
  };

  // Velocity-based scale effect for micro-interactions
  const velocityScale = 1 + Math.abs(scrollVelocity) * 0.02;

  return (
    <div
      ref={containerRef}
      className="relative h-[400vh] bg-black"
      style={{ backgroundColor, position: 'relative' }}
    >
      {/* Video Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-white/90" />
              <p className="text-sm font-light tracking-wide text-white/60">
                Loading experience...
              </p>
            </div>
          </div>
        )}

        {/* Video Element */}
        <motion.video
          ref={videoRef}
          src={videoSrc}
          preload="metadata"
          muted
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlayThrough={handleCanPlayThrough}
          className="h-full w-full object-contain"
          style={{
            display: 'block',
          }}
          animate={{
            scale: velocityScale,
          }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
        />

        {/* Text Overlays */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {overlayText.map((overlay, idx) => (
            <motion.div
              key={idx}
              className={`absolute max-w-2xl px-8 text-center ${
                overlay.alignment === 'left'
                  ? 'left-8 sm:left-16 text-left'
                  : overlay.alignment === 'right'
                    ? 'right-8 sm:right-16 text-right'
                    : 'text-center'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: getOverlayOpacity(overlay.scrollProgress),
                y: getOverlayOpacity(overlay.scrollProgress) > 0 ? 0 : 20,
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Main Headline */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white/90 mb-4">
                {overlay.text}
              </h2>

              {/* Subtext */}
              {overlay.subtext && (
                <p className="text-base sm:text-lg text-white/60 font-light leading-relaxed">
                  {overlay.subtext}
                </p>
              )}

              {/* Decorative Line */}
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mt-6"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX:
                    getOverlayOpacity(overlay.scrollProgress) > 0.5 ? 1 : 0,
                }}
                transition={{ duration: 0.8 }}
                style={{ originX: 0.5 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Grain Overlay for Cinematic Feel */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='white' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />

        {/* Vignette for Depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)`,
          }}
        />

        {/* Scroll Velocity Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
          animate={{
            opacity: Math.abs(scrollVelocity) > 0.5 ? 0.6 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-xs text-white/40 tracking-widest uppercase">
            {Math.abs(scrollVelocity) > 2 ? 'Scrolling Fast' : 'Scrolling'}
          </div>
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 via-white/60 to-white/20 z-50 origin-left"
        style={{
          scaleX: scrollProgress,
        }}
      />
    </div>
  );
};

export default ScrollytellingVideo;
