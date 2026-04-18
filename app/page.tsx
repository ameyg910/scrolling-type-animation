'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ScrollytellingVideo from '@/components/ScrollytellingVideo';

const textOverlays = [
  {
    scrollProgress: 0.05,
    text: 'Janani Vikalakshi',
    alignment: 'center' as const,
    subtext: 'Where Innovation Meets Vision',
  },
  {
    scrollProgress: 0.3,
    text: 'Elegance Redefined',
    alignment: 'left' as const,
    subtext: 'Experience the seamless blend of art and technology',
  },
  {
    scrollProgress: 0.6,
    text: 'Crafted for Perfection',
    alignment: 'right' as const,
    subtext: 'Every detail matters. Every moment counts.',
  },
  {
    scrollProgress: 0.9,
    text: 'The Journey Begins',
    alignment: 'center' as const,
    subtext: 'Step into a new era of possibility',
  },
];

export default function Home() {
  return (
    <main className="bg-black">
      <ScrollytellingVideo
        videoSrc="/videos/janani-vikalakshi.mp4"
        overlayText={textOverlays}
        backgroundColor="#0a0a0a"
      />

      {/* Premium Footer Section */}
      <section className="relative bg-black min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl opacity-20" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 py-32 sm:px-12">
          <motion.div
            className="mx-auto max-w-2xl text-center space-y-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Heading */}
            <motion.div
              className="space-y-6"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-tight">
                The Future
                <br />
                <span className="font-extralight text-white/70">Awaits</span>
              </h2>
              <div className="w-12 h-px bg-gradient-to-r from-white/30 to-transparent mx-auto" />
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg sm:text-xl text-white/50 font-light leading-relaxed max-w-lg mx-auto"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Experience a new dimension of storytelling where art, technology, and vision converge into seamless excellence.
            </motion.p>

            {/* Premium CTA */}
            <motion.div
              className="pt-8 space-y-4"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <button
                className="px-12 py-4 text-sm sm:text-base font-light tracking-widest text-white uppercase border border-white/40 hover:border-white/80 hover:bg-white/10 transition-all duration-500 group relative overflow-hidden"
                type="button"
              >
                <span className="relative z-10">Explore The Experience</span>
              </button>
              <p className="text-xs text-white/30 pt-2">Scroll back to discover more</p>
            </motion.div>

            {/* Bottom Divider */}
            <motion.div
              className="pt-16 space-y-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-xs text-white/40">
                <p>© 2026 Janani Vikalakshi</p>
                <div className="w-1 h-1 bg-white/20 hidden sm:block rounded-full" />
                <p>Crafted with precision & care</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
