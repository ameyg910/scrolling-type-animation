# 🎯 Janani Vikalakshi - Quick Reference

## ⚡ 30-Second Setup

```bash
npm install          # If you haven't already
npm run dev         # Start dev server
```
→ Visit http://localhost:3000

## 📹 Add Your Video

1. Export/render your video as **H.264 MP4**
2. Place at: `public/videos/janani-vikalakshi.mp4`
3. Done! It will auto-play on scroll

## 🎨 Key Files to Edit

### Text Content
**File:** `app/page.tsx`
```jsx
const textOverlays = [
  {
    scrollProgress: 0.05,    // Show at 5% scroll
    text: 'Your Headline',
    alignment: 'center',     // or 'left' / 'right'
    subtext: 'Your description',
  },
];
```

### Colors & Styling
**File:** `app/globals.css`
```css
:root {
  --background: #0a0a0a;  /* Background color */
  --foreground: #ededed;  /* Text color */
}
```

### Video Background Color
**File:** `app/page.tsx`
```jsx
<ScrollytellingVideo
  backgroundColor="#0a0a0a"  // Match video background
/>
```

## 🎬 Text Overlay Positions

```
Scroll %    Content              Position
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5%          Hero Headline         Center
30%         Feature #1            Left
60%         Feature #2            Right
90%         Call-to-Action        Center
```

**To adjust:** Change `scrollProgress` values (0-1)

## 🎨 Text Styling Classes

```jsx
{/* Headings */}
<h2 className="text-white/90">Main headline</h2>

{/* Body text */}
<p className="text-white/60">Description</p>

{/* Captions */}
<span className="text-white/40">Small text</span>

{/* Responsive */}
<h2 className="text-4xl sm:text-5xl md:text-6xl">
  Scales on mobile/tablet/desktop
</h2>
```

## 📱 Responsive Breakpoints

```
Tailwind    Screen Width
━━━━━━━━━━━━━━━━━━━━━━━━━━━
sm          640px+ (tablets)
md          768px+ (small desktop)
lg          1024px+ (desktop)
xl          1280px+ (wide desktop)

Example: sm:text-2xl md:text-3xl lg:text-4xl
```

## ⏱️ Common Scroll Percentages

| Position | % | Use Case |
|----------|---|----------|
| 0.05 | 5% | Opening/Hero |
| 0.15 | 15% | Early content |
| 0.30 | 30% | First feature |
| 0.50 | 50% | Midpoint/peak |
| 0.60 | 60% | Second feature |
| 0.80 | 80% | Late content |
| 0.90 | 90% | Closing/CTA |

## 🎨 Color Hex Codes

```
Pure Dark:      #0a0a0a
Charcoal:       #1a1a1a
Gray Dark:      #333333
Gray Medium:    #666666
Gray Light:     #cccccc
Pure White:     #ffffff
Accent Blue:    #0066ff
Accent Red:     #ff0033
```

## 📊 Opacity Variants (Tailwind)

```
text-white/5      →  5% opacity (barely visible)
text-white/20     →  20% opacity (faint)
text-white/40     →  40% opacity (captions)
text-white/60     →  60% opacity (body text)
text-white/90     →  90% opacity (headings)
```

## 🎬 Video Format Guide

**Best Format: H.264 MP4**
```bash
# Compress with FFmpeg
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 18 output.mp4
```

**Settings:**
- `-preset`: fast, medium, slow (quality vs speed)
- `-crf 18`: Quality (0=lossless, 51=worst, 18-23=good)
- Target: 2-8 MB file size

## 🚀 Build & Deploy

```bash
# Check for errors
npm run lint

# Build for production
npm run build

# Test production build
npm run start

# Deploy to Vercel
git push  # Vercel auto-deploys from GitHub
```

## 🐛 Debug Checklist

```
Video not syncing?
☐ Check video file format (H.264 MP4)
☐ Check video is in /public/videos/
☐ Open DevTools → Console for errors
☐ Check browser cache (Shift + Refresh)

Text not showing?
☐ Check scrollProgress is 0-1
☐ Check text color (white/90, not black)
☐ Check alignment (center/left/right)
☐ Scroll down to see text appear

Scroll laggy?
☐ Reduce video resolution
☐ Reduce video bitrate
☐ Close other browser tabs
☐ Check DevTools Performance (should be 60fps)
```

## 📐 Component Props

### ScrollytellingVideo
```tsx
<ScrollytellingVideo
  videoSrc="/videos/file.mp4"           // Required
  overlayText={textOverlays}            // Required
  backgroundColor="#0a0a0a"             // Optional, default: #0a0a0a
  enableReverse={true}                  // Optional, default: true
/>
```

### TextOverlay Object
```tsx
{
  scrollProgress: 0.05,                 // 0-1 (percent of scroll)
  text: 'Your Headline',                // Main text (required)
  alignment: 'center',                  // 'left' | 'center' | 'right'
  subtext: 'Optional subtitle',         // Optional
}
```

## 🎯 Typography Scale

```
Size         Class          Use
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Large        text-6xl       Main headlines
Medium       text-5xl       Section titles
Small        text-4xl       Subtitles
Body         text-lg        Body text
Caption      text-sm        Small text
```

## 🎨 Common CSS Utilities

```jsx
{/* Spacing */}
<div className="p-8">         {/* Padding */}
<div className="mb-4">        {/* Margin bottom */}
<div className="gap-4">       {/* Gap between items */}

{/* Sizing */}
<div className="w-full">      {/* Full width */}
<div className="h-screen">    {/* Full height */}
<div className="max-w-3xl">   {/* Max width */}

{/* Display */}
<div className="flex">        {/* Flexbox */}
<div className="grid">        {/* Grid */}
<div className="hidden">      {/* Hidden */}
```

## 🔧 Performance Targets

| Metric | Target | Check With |
|--------|--------|-----------|
| FPS | 60fps | DevTools Performance tab |
| Video Size | <10MB | File properties |
| Page Size | <500KB | Build output |
| Load Time | <2s | Lighthouse |
| Scroll Latency | <50ms | Feel while scrolling |

## 🎨 CSS Variable Customization

```css
/* In app/globals.css */
:root {
  --background: #0a0a0a;
  --foreground: #ededed;
}

/* Usage in components */
body {
  background: var(--background);
  color: var(--foreground);
}
```

## 📱 Mobile Viewport Meta Tags

**Current settings (in layout.tsx):**
```tsx
viewport: {
  width: "device-width",      // Responsive width
  initialScale: 1,            // Zoom = 100%
  maximumScale: 1,            // No zoom allowed
}
```

## 🔗 Useful Links

- **Docs**: [README.md](README.md)
- **Video Setup**: [VIDEO_SETUP.md](VIDEO_SETUP.md)
- **Development**: [DEVELOPMENT.md](DEVELOPMENT.md)
- **Source**: [components/ScrollytellingVideo.tsx](components/ScrollytellingVideo.tsx)

## 📝 Keyboard Shortcuts

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run lint` | Check code quality |
| `Ctrl+C` | Stop dev server |
| `Shift+Refresh` | Hard refresh (clear cache) |

## 💡 Pro Tips

1. **Test video file size**: Use FFmpeg `-crf` lower (18-20) for better quality
2. **Mobile users**: Always test on real devices, not just emulation
3. **Color matching**: Take screenshot of first video frame for exact color
4. **Text overlay timing**: Place key moments (0.3, 0.6, 0.9) for rhythm
5. **Backup files**: Keep original video in `/public/videos/` folder
6. **Version control**: Commit `package.json` and `package-lock.json` to Git

---

**Need more help?** See [DEVELOPMENT.md](DEVELOPMENT.md) or [VIDEO_SETUP.md](VIDEO_SETUP.md)
