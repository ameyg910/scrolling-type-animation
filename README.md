# 🎬 Janani Vikalakshi - Premium Scrollytelling Landing Page

A world-class, **Awwwards-level** scrollytelling experience featuring scroll-linked video animation with cinematic text overlays, built with **Next.js 14**, **Framer Motion**, and **Tailwind CSS**.

## ✨ Highlights

- **Scroll-Synced Video Playback**: Video frame-accurate scrubbing based on scroll position
- **Cinematic Text Overlays**: Beautifully animated text synchronized to scroll progress
- **Premium Performance**: 60fps smooth scrolling, optimized video rendering
- **Luxury Design**: Pure dark mode, tight typography, grain texture, vignette effects
- **Mobile Optimized**: Fully responsive, touch-friendly interactions
- **Advanced Polish**: Scroll velocity detection, micro-interactions, progress indicators

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your scrollytelling experience.

## 📹 Add Your Video

See [VIDEO_SETUP.md](VIDEO_SETUP.md) for complete video integration guide:

1. **Prepare** your video (5-10s, H.264 MP4)
2. **Place** at `/public/videos/janani-vikalakshi.mp4`
3. **Customize** text overlays in `app/page.tsx`
4. **Match** background color in component props

## 🎯 Core Components

### `ScrollytellingVideo` (Main Component)
Located in `components/ScrollytellingVideo.tsx`

**Features:**
- Video element with sticky positioning
- Scroll progress → video time mapping
- Four animated text overlay sections
- Loading state with spinner
- Grain texture and vignette effects
- Progress bar indicator
- Scroll velocity micro-interactions

**Usage:**
```jsx
import ScrollytellingVideo from '@/components/ScrollytellingVideo';

<ScrollytellingVideo
  videoSrc="/videos/janani-vikalakshi.mp4"
  overlayText={textOverlays}
  backgroundColor="#0a0a0a"
/>
```

### `AdvancedScrollytelling` (Optional)
Located in `components/AdvancedScrollytelling.tsx`

Advanced features:
- Scene markers and timeline
- Advanced easing functions
- Current scene indicators
- Snap scrolling support

## 🎨 Customization

### Text Overlays

Edit `app/page.tsx`:

```jsx
const textOverlays = [
  {
    scrollProgress: 0.05,   // 5% of scroll
    text: 'Your Headline',
    alignment: 'center',    // 'left' | 'center' | 'right'
    subtext: 'Optional description',
  },
  // Add more sections
];
```

### Colors & Styling

**Global Colors** (`app/globals.css`):
```css
:root {
  --background: #0a0a0a;  /* Change background */
  --foreground: #ededed;  /* Change text */
}
```

**Typography** (Tailwind classes):
- Headings: `text-white/90` (90% opacity)
- Body: `text-white/60` (60% opacity)
- Captions: `text-white/40` (40% opacity)

### Background Match

Update background color to match your video:

```jsx
<ScrollytellingVideo
  backgroundColor="#YOUR_VIDEO_BG_COLOR"
  // ... other props
/>
```

## 🎬 Technical Deep Dive

### Video Sync Algorithm

1. **Scroll Tracking**: Framer Motion `useScroll` hook tracks scroll progress (0→1)
2. **Progress Mapping**: Scroll progress mapped to video duration
3. **Frame Scrubbing**: `video.currentTime` updated via `requestAnimationFrame`
4. **Clamping**: Values clamped to prevent overshooting
5. **Throttling**: Updates only when diff > 0.05s to avoid jitter

### Text Overlay System

- **Distance Calculation**: Current overlay based on closest scroll position
- **Opacity Easing**: Smooth fade in/out within ±15% scroll range
- **Staggered Animations**: Each section animates independently
- **Velocity Responses**: Micro-scale effects based on scroll speed

### Performance Optimizations

✅ **What We Did:**
- Preload video with `preload="auto"`
- RequestAnimationFrame throttling
- Clamped scroll updates (0.05s threshold)
- Mobile resolution detection
- CSS containment for GPU acceleration

📊 **Target Performance:**
- 60 FPS smooth scrolling
- <100ms video scrub latency
- <50KB CSS bundle
- <200KB component bundle

## 📱 Mobile Considerations

The component is fully responsive:

```jsx
// Mobile-optimized video
<video
  className="object-cover"  // Cover mobile viewport
  playsInline              // Mobile autoplay policy
/>

// Responsive text
<h2 className="text-4xl sm:text-5xl md:text-6xl">
  Scales beautifully on all devices
</h2>
```

### Testing on Mobile

1. Use Chrome DevTools device emulation
2. Test on real iPhone/Android devices
3. Check scroll smoothness and video sync
4. Verify text readability at all sizes

## 🛠 Development Commands

```bash
# Development server (hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## 📦 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.4 | React framework with App Router |
| React | 19.2.4 | UI component library |
| Framer Motion | 12.38.0 | Animation library |
| Tailwind CSS | 4 | Utility-first styling |
| TypeScript | 5 | Type safety |

## 🎨 Design System

### Typography
- **Font Weight**: 300 (Light) for premium feel
- **Letter Spacing**: Tight (-0.01em)
- **Line Height**: Generous for readability

### Colors
- **Background**: Pure black (`#0a0a0a`)
- **Primary Text**: White with opacity
- **Accents**: White/60 and white/40
- **Effects**: White/30 and white/20

### Spacing
- **Container**: Responsive padding
- **Overlays**: Max-width 42rem (2xl)
- **Gaps**: Tailwind default scale

### Motion
- **Duration**: 0.6-0.8s standard
- **Easing**: Cubic bezier (0.25, 0.46, 0.45, 0.94)
- **Transition Type**: Smooth, cinematic

## 📚 Additional Resources

### Documentation Files
- **[VIDEO_SETUP.md](VIDEO_SETUP.md)** - Complete video integration guide
- **[CLAUDE.md](CLAUDE.md)** - Implementation details
- **[AGENTS.md](AGENTS.md)** - Agent documentation

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion Guide](https://www.framer.com/motion)
- [Tailwind CSS Reference](https://tailwindcss.com/docs)
- [Web Video Best Practices](https://web.dev/optimize-video)

## ✅ Pre-Launch Checklist

- [ ] Video file optimized and placed in `/public/videos/`
- [ ] Background color updated to match video
- [ ] Text overlays customized with your content
- [ ] All links and CTAs functional
- [ ] Tested on mobile devices
- [ ] Performance: 60fps verified
- [ ] Build succeeds: `npm run build`
- [ ] Production tested: `npm run start`

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push

# Deploy from Vercel dashboard
# Connect your GitHub repo and deploy automatically
```

### Other Platforms
Works on any Node.js 18+ hosting:
- Netlify
- Railway
- Heroku
- AWS Amplify
- DigitalOcean App Platform

## 🎯 Advanced Features

### Reverse Playback
The component supports reverse video playback when scrolling up:

```jsx
<ScrollytellingVideo
  enableReverse={true}  // Default
  // ...
/>
```

### Scroll Velocity Indicators
Automatic indicators appear when scrolling fast, showing:
- Scroll speed feedback
- Velocity-based micro-animations
- Real-time engagement feedback

### Scene Markers
Use `AdvancedScrollytelling` for:
- Named scroll sections
- Timeline visualization
- Scene duration tracking
- Custom easing functions

## 🤝 Support & Questions

### Troubleshooting

**Video not playing?**
- Check video format (H.264 MP4 or WebM)
- Verify `muted` attribute
- Check browser console for errors

**Text overlays not showing?**
- Verify `scrollProgress` values (0-1)
- Check z-index and pointer-events
- Ensure text is not hidden by video

**Performance issues?**
- Reduce video resolution
- Compress video file
- Check browser DevTools Performance tab
- Enable hardware acceleration

### Getting Help
1. Check [VIDEO_SETUP.md](VIDEO_SETUP.md) for video integration
2. Review component props in source code
3. Check browser console for errors
4. Refer to [Next.js Docs](https://nextjs.org/docs)

---

**Built with precision and care.**

**Janani Vikalakshi © 2026** | Premium Digital Experience

