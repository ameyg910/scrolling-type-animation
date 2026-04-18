# Janani Vikalakshi - Developer Guide

## 🎬 What You've Built

A premium scrollytelling landing page where:
- **The user scrolls** → **Video plays/rewinds** in sync
- **Text appears at key moments** matching the scroll timeline
- **Cinematic effects** enhance the visual experience
- **Performance is optimized** for smooth 60fps scrolling

## 🚀 Quick Start (5 minutes)

### 1. Start Development Server
```bash
npm run dev
```
→ Opens http://localhost:3000

### 2. Add Your Video
Place your video at:
```
/public/videos/janani-vikalakshi.mp4
```

**Video Requirements:**
- Format: H.264 MP4 (or WebM)
- Duration: 5-10 seconds
- Resolution: 1920×1080 recommended
- Size: <10MB ideal

### 3. Customize Content
Edit `app/page.tsx`:
```jsx
const textOverlays = [
  {
    scrollProgress: 0.05,    // 5% down the scroll
    text: 'Your Headline',
    alignment: 'center',
    subtext: 'Your subtitle',
  },
  // ... more overlays
];
```

### 4. Match Video Background
Update the background color to match your video:
```jsx
<ScrollytellingVideo
  backgroundColor="#YOUR_DOMINANT_COLOR"  // e.g., "#1a1a1a"
/>
```

**Done!** Scroll and watch the magic.

## 📁 Project Structure

```
scroll-video-site/
├── app/
│   ├── layout.tsx           # Root layout + metadata
│   ├── page.tsx             # Landing page (main)
│   ├── globals.css          # Global styles
│   └── favicon.ico
├── components/
│   ├── ScrollytellingVideo.tsx      # Main component ⭐
│   └── AdvancedScrollytelling.tsx   # Advanced version (optional)
├── public/
│   └── videos/
│       └── janani-vikalakshi.mp4    # Your video goes here
├── scripts/
│   └── generate-demo-video.sh       # Generate test video
├── package.json
├── tsconfig.json
├── tailwind.config.js              # Tailwind config
├── README.md                        # Main documentation
└── VIDEO_SETUP.md                   # Video integration guide
```

## 🎨 Key Components Explained

### ScrollytellingVideo (Main)
**File:** `components/ScrollytellingVideo.tsx`

**What it does:**
1. Creates sticky video container (h-screen)
2. Syncs video playback with scroll position
3. Shows/hides text overlays
4. Adds cinematic effects (grain, vignette)

**Props:**
```typescript
{
  videoSrc: string;           // Path to video
  overlayText: TextOverlay[]; // Text sections
  backgroundColor?: string;   // Match video BG
  enableReverse?: boolean;    // Reverse on scroll up
}
```

**How scroll sync works:**
```
Scroll Position (0-100%)  ─→  useScroll hook  ─→  Video Time (0-duration)
                               (Framer Motion)
```

### Text Overlays
Each overlay includes:
- **scrollProgress**: When to show (0-1 scale)
- **text**: Main headline
- **alignment**: left, center, or right
- **subtext**: Optional description

**Visual Behavior:**
- Appears gradually as you scroll to it
- Stays visible for ±15% of scroll range
- Smooth fade in/out animations
- Smooth vertical slide animation

## 🎯 Customization Paths

### Quick Changes (5 min)
1. Text overlays ✏️
2. Background color 🎨
3. Button text/links 🔗

### Medium Changes (15-30 min)
1. Add custom fonts 🔤
2. Adjust animation timing ⏱️
3. Modify color palette 🌈
4. Add footer content 📝

### Advanced Changes (1+ hour)
1. Scene markers with `AdvancedScrollytelling`
2. Multiple videos with transitions
3. Custom easing functions
4. Scroll snap sections

## 💻 Development Workflow

### Watch Mode
```bash
npm run dev
```
- Auto-refresh on file changes
- Hot Module Replacement (HMR)
- Shows errors in terminal + browser

### Check for Errors
```bash
npm run lint
```
- ESLint checks code quality
- TypeScript checks types
- Reports issues before build

### Build for Production
```bash
npm run build
npm run start
```
- Optimizes code and assets
- Runs production server locally
- Tests everything works

## 🎬 Video Integration Guide

### Best Format: H.264 MP4

**Compress using FFmpeg:**
```bash
ffmpeg -i input.mov \
  -c:v libx264 \
  -preset slow \
  -crf 18 \
  -c:a aac \
  -b:a 128k \
  output.mp4
```

**Settings Explained:**
- `-preset slow`: Higher quality (takes longer)
- `-crf 18`: Quality level (lower = better, 0-51)
- `-aac -b:a 128k`: Audio codec and bitrate

### Get Dominant Video Color

**Option 1: Using FFmpeg**
```bash
ffmpeg -i video.mp4 -frames:v 1 -f image2 frame.png
# Open frame.png in color picker
```

**Option 2: Visual inspection**
- First frame is usually representative
- Look for most prevalent color
- Use color picker tool

## 🔧 Common Customizations

### Change Scroll Duration
The video plays over 4 viewport heights (h-[400vh]):
```jsx
<div className="h-[400vh]">  // Change this
  {/* Sticky video plays here */}
</div>
```

### Adjust Text Size
```jsx
// In ScrollytellingVideo.tsx
<h2 className="text-4xl sm:text-5xl md:text-6xl">
  {/* Adjust these values */}
</h2>
```

### Modify Overlay Fade Range
```jsx
// In ScrollytellingVideo.tsx
const distance = Math.abs(scrollProgress - overlay.scrollProgress);
if (distance < 0.05) return 1;      // Fully visible range
if (distance < 0.15) return 1 - ... // Fade out range
```

### Change Vignette Darkness
```jsx
// In ScrollytellingVideo.tsx
backgroundImage: `radial-gradient(..., rgba(0, 0, 0, 0.4) ...)`
//                                                      ↑ Increase for darker
```

### Disable Grain Effect
Comment out or remove:
```jsx
{/* Remove or disable this div */}
<div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-5">
  {/* Grain SVG */}
</div>
```

## 🐛 Troubleshooting

### Video Not Playing
```
✓ Check: Video format (H.264 MP4 or WebM)
✓ Check: File path in videoSrc prop
✓ Check: Browser console for errors (F12)
✓ Check: Video file isn't corrupted
```

### Text Overlays Not Showing
```
✓ Check: scrollProgress values (must be 0-1)
✓ Check: Text color isn't black (use text-white/90)
✓ Check: z-index not being overridden
✓ Check: Text is centered in viewport
```

### Scroll Sync Feels Laggy
```
✓ Check: Video file size (<10MB ideal)
✓ Check: Browser tab has focus
✓ Check: No other heavy animations running
✓ Try: Close other tabs/applications
✓ Enable: Hardware acceleration in browser
```

### Build Fails
```bash
# Clear cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## 📊 Performance Tips

### Video Optimization
- **Target size**: 2-8 MB
- **Duration**: 5-10 seconds
- **Format**: H.264 MP4 (best browser support)
- **Resolution**: 1920×1080 (scale down for slower devices)

### Check Performance
1. Open DevTools (F12)
2. Go to Performance tab
3. Click Record
4. Scroll the page
5. Click Stop
6. Look for frame rate (target: 60fps)

### Optimize if Needed
- Reduce video resolution
- Decrease video bitrate
- Minimize overlays (fewer text sections)
- Remove grain/vignette effects

## 📱 Mobile Testing

### Quick Mobile Test
```bash
# Get your computer's IP
ipconfig getifaddr en0  # macOS
ipconfig  # Windows, then find IPv4 address

# Run dev server (if not already running)
npm run dev

# On mobile device, visit:
http://YOUR_IP_ADDRESS:3000
```

### What to Test
- Video syncs smoothly
- Text is readable
- Scroll feels responsive
- No layout breaks
- Mobile buttons work

## 🚀 Deployment

### Vercel (Recommended - 1 click)
1. Push code to GitHub
2. Go to vercel.com
3. Import GitHub repo
4. Click Deploy
5. Done! ✨

### Other Platforms
- **Netlify**: Similar to Vercel
- **Railway**: `npm run build && npm run start`
- **AWS Amplify**: Git-based deployment
- **DigitalOcean App Platform**: Container-based

## 📚 File Deep Dives

### app/page.tsx
- Main landing page
- Text overlay definitions
- Layout and footer
- **Edit this** to change content

### components/ScrollytellingVideo.tsx
- Core scrollytelling logic
- Video sync algorithm
- Text overlay rendering
- Loading states
- **Edit this** for advanced features

### app/globals.css
- Global styles and colors
- Typography defaults
- Scrollbar styling
- **Edit this** to change colors

### app/layout.tsx
- Root HTML structure
- Metadata (SEO)
- Font loading
- **Edit this** for SEO changes

## 🎓 Learning Resources

### Next.js
- [Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

### Framer Motion
- [Official Docs](https://www.framer.com/motion)
- [useScroll API](https://www.framer.com/motion/use-scroll)
- [Animation Principles](https://www.framer.com/motion)

### Tailwind CSS
- [Docs](https://tailwindcss.com/docs)
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Hover States](https://tailwindcss.com/docs/hover-focus-and-other-states)

### Web Video
- [Web Video Best Practices](https://web.dev/optimize-video)
- [Video Compression Guide](https://www.adobe.com/creativecloud/video-compression-guide.html)

## 🎯 Next Steps

1. **Add your video** → Place in `/public/videos/`
2. **Customize text** → Edit `app/page.tsx`
3. **Match colors** → Update `backgroundColor` prop
4. **Test mobile** → Use DevTools or real device
5. **Deploy** → Push to Vercel or your platform
6. **Monitor** → Use analytics to track engagement

## ❓ FAQ

**Q: Can I use multiple videos?**
A: Yes! Create multiple ScrollytellingVideo components or use AdvancedScrollytelling.

**Q: Can I add more text overlays?**
A: Yes! Add more objects to the `textOverlays` array in page.tsx.

**Q: Can I change scroll duration?**
A: Yes! Modify the `h-[400vh]` class to `h-[300vh]` (shorter) or `h-[500vh]` (longer).

**Q: Can I disable animations?**
A: Yes! Comment out or remove motion components from ScrollytellingVideo.tsx.

**Q: What browsers are supported?**
A: All modern browsers (Chrome, Firefox, Safari, Edge). IE11 not supported.

---

**Happy scrolling! 🎬**

Questions? Check README.md, VIDEO_SETUP.md, or the component source code.
