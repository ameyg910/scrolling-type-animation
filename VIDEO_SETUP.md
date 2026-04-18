# Janani Vikalakshi - Premium Scrollytelling Landing Page

A world-class, Awwwards-level scrollytelling experience built with Next.js 14, Framer Motion, and Tailwind CSS.

## ✨ Features

- **Scroll-Linked Video**: Video playback synchronized with page scroll position
- **Cinematic Text Overlays**: Scroll-synced animated text with precise timing control
- **Performance Optimized**: Smooth video scrubbing, optimized rendering, mobile-ready
- **Premium Polish**: Grain overlay, vignette effects, scroll velocity indicators
- **Dark Mode Premium**: Pure dark aesthetic with sophisticated typography
- **Framer Motion Integration**: Smooth animations and transitions throughout

## 🎯 Core Features

### 1. Scroll-Synced Video
- Video plays forward/backward based on scroll progress
- Smooth, frame-accurate scrubbing
- Loading state with spinner
- H.264/WebM video support

### 2. Text Overlays
Four synchronized text sections at scroll points:
- **0%**: Hero headline (centered)
- **30%**: Feature message (left-aligned)
- **60%**: Key moment (right-aligned)  
- **90%**: CTA message (centered)

Each section includes:
- Main headline with light font weight
- Optional subtext
- Decorative animated line
- Smooth opacity transitions

### 3. Visual Polish
- Subtle grain texture for cinematic feel
- Radial vignette for depth
- Progress indicator bar at top
- Scroll velocity indicators
- Velocity-based micro-interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📹 Adding Your Video

### Step 1: Prepare Your Video
1. **Format**: H.264 MP4 or WebM
2. **Duration**: 5-10 seconds recommended
3. **Resolution**: 1920x1080 (Full HD) or higher
4. **File Size**: Keep under 10MB for optimal performance
5. **Background Color**: Take note of the dominant background color

### Step 2: Optimize Your Video

**Using FFmpeg:**
```bash
# Convert to H.264 MP4 (high quality, compact)
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 18 \
  -c:a aac -b:a 128k -pix_fmt yuv420p output.mp4

# Convert to WebM (even smaller)
ffmpeg -i input.mov -c:v libvpx-vp9 -b:v 1M -c:a libopus output.webm
```

### Step 3: Place Your Video
Add your video to: `/public/videos/janani-vikalakshi.mp4`

### Step 4: Update Background Color
In [app/page.tsx](app/page.tsx), update the `backgroundColor` prop:
```jsx
<ScrollytellingVideo
  videoSrc="/videos/janani-vikalakshi.mp4"
  overlayText={textOverlays}
  backgroundColor="#YOUR_DOMINANT_VIDEO_BG_COLOR"
/>
```

## 🎨 Customization

### Update Text Overlays

In [app/page.tsx](app/page.tsx):

```jsx
const textOverlays = [
  {
    scrollProgress: 0.05,      // 5% scroll
    text: 'Your Main Headline',
    alignment: 'center',       // 'left' | 'center' | 'right'
    subtext: 'Optional subtitle text',
  },
  {
    scrollProgress: 0.3,       // 30% scroll
    text: 'Feature Message',
    alignment: 'left',
    subtext: 'Describe your feature here',
  },
  // Add more sections as needed
];
```

### Color Customization

**In [app/globals.css](app/globals.css):**
```css
:root {
  --background: #0a0a0a;      /* Background color */
  --foreground: #ededed;      /* Text color */
}
```

**Text opacity in components:**
- Headings: `text-white/90` (90% opacity)
- Body: `text-white/60` (60% opacity)
- Accents: `text-white/30` to `text-white/40`

## 🎬 ScrollytellingVideo Component

### Props

```typescript
interface ScrollytellingVideoProps {
  videoSrc: string;           // Path to video file
  overlayText: TextOverlay[]; // Array of text overlays
  backgroundColor?: string;   // Hex color matching video BG
  enableReverse?: boolean;    // Enable reverse playback (default: true)
}

interface TextOverlay {
  scrollProgress: number;     // 0-1 (scroll percentage)
  text: string;              // Main headline
  alignment: 'left' | 'center' | 'right';
  subtext?: string;          // Optional subtitle
}
```

### Usage

```jsx
import ScrollytellingVideo from '@/components/ScrollytellingVideo';

<ScrollytellingVideo
  videoSrc="/videos/your-video.mp4"
  overlayText={textOverlays}
  backgroundColor="#0a0a0a"
/>
```

## 📱 Mobile Optimization

The component is fully responsive:
- Sticky video adapts to viewport
- Text scales down on mobile
- Touch-friendly scroll interactions
- Optimized loading states

For best results:
- Use `.object-cover` for video (default)
- Ensure text has adequate padding on mobile

## ⚡ Performance Tips

1. **Video Optimization**: Compress video to <10MB
2. **Preload**: Video preloads automatically
3. **requestAnimationFrame**: Used for smooth scrubbing
4. **Clamping**: Prevents overshooting scroll
5. **Throttling**: Minimal updates when needed

### Browser DevTools
Monitor performance:
```
Performance tab > Record > Scroll > Stop
Look for: Smooth 60fps rendering
```

## 🎯 Advanced Features

### Scroll Velocity Micro-Interactions
The component detects scroll speed and applies subtle scale effects:
- Fast scrolling triggers velocity indicator
- Smooth scale animation on video
- Non-intrusive visual feedback

### Progress Bar
Fixed progress indicator at top of viewport shows scroll position.

### Grain Texture
Subtle SVG noise overlay (opacity: 5%) adds cinematic quality.

### Vignette
Radial gradient darkens edges for depth and focus.

## 🛠 Development

### Build for Production
```bash
npm run build
npm run start
```

### Lint Code
```bash
npm run lint
```

## 📦 Dependencies

- **next**: 16.2.4 - React framework
- **react**: 19.2.4 - UI library
- **framer-motion**: 12.38.0 - Animation library
- **tailwindcss**: 4 - Utility CSS framework

## 🎥 Video Format Recommendations

### Best Format: H.264 MP4
- Wide browser support
- Good compression
- Fast playback
- Suitable for scrubbing

### Alternative: WebM (VP9)
- Smaller file size
- Modern browsers
- Ideal for progressive enhancement

### Settings
```
Codec: H.264 (libx264)
Bitrate: 4-6 Mbps
Resolution: 1920x1080
Frame Rate: 24-30 fps
Audio: AAC 128kbps (or remove)
```

## 📖 Documentation Files

- [CLAUDE.md](CLAUDE.md) - Technical implementation details
- [AGENTS.md](AGENTS.md) - Agent/API documentation

## 🎨 Design System

### Typography
- Font Weight: 300 (Light)
- Letter Spacing: Tight (-0.01em)
- Colors: White with opacity variants

### Spacing
- Container padding: Responsive
- Overlay max-width: 2xl (42rem)
- Gaps: Tailwind default scale

### Animation Timing
- Standard duration: 0.6-0.8s
- Easing: Cubic bezier (0.25, 0.46, 0.45, 0.94)
- Transitions: Smooth and cinematic

## ✅ Checklist for Launch

- [ ] Video file placed in `/public/videos/`
- [ ] Background color updated to match video
- [ ] Text overlays customized
- [ ] All links/CTAs functional
- [ ] Mobile tested on real devices
- [ ] Performance optimized
- [ ] Metadata updated in layout.tsx
- [ ] Build tested: `npm run build`

## 🤝 Support

For issues or questions, refer to:
- Next.js Docs: https://nextjs.org/docs
- Framer Motion: https://www.framer.com/motion
- Tailwind CSS: https://tailwindcss.com

---

**Built with precision and care. Janani Vikalakshi © 2026**
