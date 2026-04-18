'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, motion, AnimatePresence } from 'framer-motion';

/**
 * Advanced Scrollytelling Component with Additional Features
 * Includes: scene markers, scroll snapping, advanced easing
 */

interface Scene {
  id: string;
  scrollProgress: number;
  title: string;
  description?: string;
  duration?: number; // duration in scroll % (e.g., 0.2 = 20%)
}

interface AdvancedScrollytellingProps {
  videoSrc: string;
  scenes: Scene[];
  backgroundColor?: string;
  enableSnapScrolling?: boolean;
  showSceneIndicators?: boolean;
}

export const AdvancedScrollytelling: React.FC<AdvancedScrollytellingProps> = ({
  videoSrc,
  scenes,
  backgroundColor = '#0a0a0a',
  enableSnapScrolling = false,
  showSceneIndicators = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Advanced easing function for cinematic feel
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Sync video with scroll
  useEffect(() => {
    if (!isVideoReady) return;

    const unsubscribe = scrollYProgress.onChange((progress) => {
      const easedProgress = easeInOutCubic(progress);
      setScrollProgress(easedProgress);

      // Update current scene
      const active = scenes.reduce((closest, scene) => {
        const distance = Math.abs(easedProgress - scene.scrollProgress);
        return distance < Math.abs(easedProgress - (closest?.scrollProgress ?? 0))
          ? scene
          : closest;
      });
      setCurrentScene(active);

      if (videoRef.current && videoDuration > 0) {
        const targetTime = easedProgress * videoDuration;
        if (Math.abs(videoRef.current.currentTime - targetTime) > 0.05) {
          videoRef.current.currentTime = targetTime;
        }
      }
    });

    return () => unsubscribe();
  }, [isVideoReady, videoDuration, scrollYProgress, scenes]);

  return (
    <div
      ref={containerRef}
      className="relative h-[400vh] bg-black"
      style={{ backgroundColor }}
    >
      {/* Sticky Video Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          preload="auto"
          muted
          playsInline
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setVideoDuration(videoRef.current.duration);
              setIsVideoReady(true);
            }
          }}
          className="h-full w-full object-cover"
        />

        {/* Scene Info Overlay */}
        {showSceneIndicators && currentScene && (
          <div className="absolute bottom-8 left-8 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xs text-white/40 tracking-widest uppercase mb-2">
                  Scene {scenes.indexOf(currentScene) + 1} of {scenes.length}
                </p>
                <h3 className="text-xl text-white/90 font-light">
                  {currentScene.title}
                </h3>
                {currentScene.description && (
                  <p className="text-sm text-white/60 mt-2 max-w-xs">
                    {currentScene.description}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Scene Indicators Timeline */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          {scenes.map((scene, idx) => (
            <motion.div
              key={scene.id}
              className="absolute h-full bg-white/60"
              initial={{ width: 0 }}
              animate={{
                width: Math.max(
                  4,
                  ((scene.duration || 0.1) * 100)
                ),
              }}
              style={{
                left: `${scene.scrollProgress * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)`,
          }}
        />
      </div>
    </div>
  );
};

export default AdvancedScrollytelling;
