# Advanced Examples & Customizations

This guide shows advanced techniques and customizations for the Janani Vikalakshi scrollytelling experience.

## 🎬 Advanced Text Overlays

### Example 1: Complex Scroll Timeline
```jsx
// app/page.tsx
const textOverlays = [
  // Opening sequence
  {
    scrollProgress: 0.02,
    text: 'Janani',
    alignment: 'center',
    subtext: 'A New Beginning',
  },
  {
    scrollProgress: 0.08,
    text: 'Vikalakshi',
    alignment: 'center',
    subtext: 'Where Dreams Take Flight',
  },
  
  // First act
  {
    scrollProgress: 0.25,
    text: 'Elegance in Motion',
    alignment: 'left',
    subtext: 'Experience the art of seamless storytelling',
  },
  
  // Midpoint
  {
    scrollProgress: 0.50,
    text: 'The Moment of Truth',
    alignment: 'center',
    subtext: 'Where innovation meets tradition',
  },
  
  // Second act
  {
    scrollProgress: 0.75,
    text: 'Your Journey Awaits',
    alignment: 'right',
    subtext: 'Step into the future with confidence',
  },
  
  // Closing
  {
    scrollProgress: 0.95,
    text: 'Forever Changed',
    alignment: 'center',
    subtext: 'Welcome to the next chapter',
  },
];
```

### Example 2: Minimal Overlay (Only Hero)
```jsx
const textOverlays = [
  {
    scrollProgress: 0.5,
    text: 'Pure Elegance',
    alignment: 'center',
  },
];
```

### Example 3: Multi-Language Support
```jsx
// Define translations
const translations = {
  en: {
    hero: 'Welcome to Elegance',
    feature1: 'Innovative Design',
    feature2: 'Timeless Quality',
    cta: 'Begin Your Journey',
  },
  es: {
    hero: 'Bienvenido a la Elegancia',
    feature1: 'Diseño Innovador',
    feature2: 'Calidad Atemporal',
    cta: 'Comienza Tu Viaje',
  },
};

// Usage
const lang = 'en';
const textOverlays = [
  {
    scrollProgress: 0.05,
    text: translations[lang].hero,
    alignment: 'center',
  },
  // ... more overlays
];
```

---

## 🎨 Advanced Styling

### Example 1: Custom Font Integration
```jsx
// app/layout.tsx
import { Playfair_Display, Montserrat } from 'next/font/google';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '600'],
});

export default function RootLayout({ children }) {
  return (
    <html className={`${playfair.variable} ${montserrat.variable}`}>
      {/* ... */}
    </html>
  );
}
```

```css
/* app/globals.css */
:root {
  --font-serif: var(--font-playfair);
  --font-sans: var(--font-montserrat);
}

h1, h2, h3 {
  font-family: var(--font-serif);
  font-weight: 700;
}

p, span {
  font-family: var(--font-sans);
  font-weight: 300;
}
```

### Example 2: Color Themes
```jsx
// utils/themes.ts
export const themes = {
  luxury: {
    background: '#0a0a0a',
    accent: '#d4af37', // Gold
    text: '#ffffff',
  },
  modern: {
    background: '#1a1a1a',
    accent: '#00d9ff', // Cyan
    text: '#e0e0e0',
  },
  minimal: {
    background: '#ffffff',
    accent: '#000000', // Black
    text: '#333333',
  },
};

// Usage in component
const currentTheme = themes.luxury;
```

### Example 3: Dynamic Color Adjustment
```css
/* app/globals.css */
:root {
  --hue: 0;
  --saturation: 0%;
  --lightness: 10%;
}

body {
  background: hsl(var(--hue), var(--saturation), var(--lightness));
}

/* Switch theme */
body.theme-modern {
  --hue: 200;
  --saturation: 100%;
  --lightness: 15%;
}
```

---

## ⚡ Performance Enhancements

### Example 1: Video Lazy Loading
```jsx
// components/ScrollytellingVideo.tsx
import { useInView } from 'react-intersection-observer';

export const ScrollytellingVideo = (props) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {inView ? (
        <video src={props.videoSrc} preload="auto" />
      ) : (
        <div className="bg-black/50">Loading...</div>
      )}
    </div>
  );
};
```

### Example 2: Adaptive Video Quality
```jsx
// hooks/useVideoQuality.ts
export const useVideoQuality = () => {
  const [quality, setQuality] = useState('hd');

  useEffect(() => {
    const connection = (navigator as any).connection;
    if (connection) {
      if (connection.saveData) {
        setQuality('sd'); // Low bandwidth
      } else if (connection.effectiveType === '4g') {
        setQuality('hd'); // High bandwidth
      }
    }
  }, []);

  return quality;
};

// Usage
const quality = useVideoQuality();
const videoSrc = `/videos/janani-vikalakshi-${quality}.mp4`;
```

### Example 3: Preload Optimization
```jsx
// components/ScrollytellingVideo.tsx
<video
  ref={videoRef}
  preload="metadata"  // Load only metadata first
  onLoadedMetadata={() => {
    // Start full preload
    videoRef.current.preload = 'auto';
  }}
/>
```

---

## 🎬 Advanced Animations

### Example 1: Custom Easing
```jsx
// utils/easing.ts
export const customEasings = {
  // Smooth, natural motion
  smooth: [0.25, 0.46, 0.45, 0.94],
  
  // Fast entrance, slow exit
  easeOutElastic: [0.175, 0.885, 0.32, 1.275],
  
  // Bouncy effect
  bounce: [0.68, -0.55, 0.265, 1.55],
  
  // Sharp, snappy
  snappy: [0.12, 0.4, 0.29, 1.46],
};

// Usage in Framer Motion
<motion.div
  transition={{ ease: customEasings.smooth }}
/>
```

### Example 2: Scroll-Based Scale
```jsx
// components/ScrollytellingVideo.tsx
const [scale, setScale] = useState(1);

useEffect(() => {
  const unsubscribe = scrollYProgress.onChange((progress) => {
    // Scale effect: 1 at start, 1.1 at middle, 1 at end
    const midpoint = Math.abs(progress - 0.5);
    setScale(1 + (0.1 * (1 - midpoint * 2)));
  });
  
  return () => unsubscribe();
}, [scrollYProgress]);

return (
  <motion.video
    animate={{ scale }}
    transition={{ duration: 0.1 }}
  />
);
```

### Example 3: Multi-Stage Animation
```jsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{
    opacity: visibleOpacity,
    y: visibleOpacity > 0 ? 0 : 50,
  }}
  exit={{ opacity: 0, y: -50 }}
  transition={{
    duration: 0.6,
    delay: staggerDelay,
    ease: 'easeInOut',
  }}
/>
```

---

## 🛠️ Custom Components

### Example 1: Scene Marker Component
```jsx
// components/SceneMarker.tsx
interface SceneMarkerProps {
  progress: number;
  scenes: { progress: number; name: string }[];
}

export const SceneMarker: React.FC<SceneMarkerProps> = ({ progress, scenes }) => {
  const currentScene = scenes.reduce((closest, scene) => {
    const distance = Math.abs(progress - scene.progress);
    return distance < Math.abs(progress - closest.progress) ? scene : closest;
  });

  return (
    <div className="fixed bottom-8 right-8 text-white/60">
      <p className="text-sm">{currentScene.name}</p>
      <p className="text-xs text-white/40">
        {Math.round(progress * 100)}% Complete
      </p>
    </div>
  );
};
```

### Example 2: Video Controls Overlay
```jsx
// components/VideoControls.tsx
export const VideoControls: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="absolute top-8 right-8 z-50">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white/90 rounded-full text-sm"
      >
        {isPlaying ? 'Pause Scroll' : 'Resume Scroll'}
      </button>
    </div>
  );
};
```

### Example 3: Loading Progress
```jsx
// components/LoadingProgress.tsx
export const LoadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  return (
    <motion.div
      className="fixed bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: progress }}
      style={{ originX: 0 }}
    />
  );
};
```

---

## 🌐 Integration Examples

### Example 1: Analytics Integration
```jsx
// lib/analytics.ts
export const trackScroll = (scrollProgress: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag.event('scroll_progress', {
      value: Math.round(scrollProgress * 100),
    });
  }
};

// Usage in component
useEffect(() => {
  const unsubscribe = scrollYProgress.onChange(trackScroll);
  return () => unsubscribe();
}, [scrollYProgress]);
```

### Example 2: CMS Integration
```jsx
// lib/cms.ts
interface CmsContent {
  textOverlays: TextOverlay[];
  videoUrl: string;
  backgroundColor: string;
}

export const fetchContent = async (slug: string): Promise<CmsContent> => {
  const response = await fetch(`/api/content/${slug}`);
  return response.json();
};

// Usage
const [content, setContent] = useState<CmsContent | null>(null);

useEffect(() => {
  fetchContent('homepage').then(setContent);
}, []);

return content ? (
  <ScrollytellingVideo {...content} />
) : (
  <div>Loading...</div>
);
```

### Example 3: Dynamic Content Loading
```jsx
// pages/api/content/[slug].ts
export default async function handler(req, res) {
  const { slug } = req.query;

  // Fetch from database
  const content = await db.content.findUnique({
    where: { slug },
  });

  res.status(200).json(content);
}
```

---

## 📱 Mobile-Specific Enhancements

### Example 1: Touch Scroll Enhancement
```jsx
// hooks/useTouch.ts
export const useTouch = () => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientY);
  };

  const distance = touchStart - touchEnd;
  const isFlick = Math.abs(distance) > 50;

  return { isFlick, direction: distance > 0 ? 'down' : 'up' };
};
```

### Example 2: Mobile-Specific Video Format
```jsx
// utils/videoLoader.ts
export const getVideoSrc = () => {
  const isMobile = typeof window !== 'undefined' 
    && window.innerWidth < 768;

  return isMobile
    ? '/videos/janani-vikalakshi-mobile.mp4'
    : '/videos/janani-vikalakshi.mp4';
};
```

### Example 3: Haptic Feedback
```jsx
// hooks/useHaptic.ts
export const useHaptic = () => {
  const trigger = (duration = 10) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(duration);
    }
  };

  return { trigger };
};

// Usage
const { trigger } = useHaptic();

// On scroll milestone
if (scrollProgress === 0.5) {
  trigger(30);
}
```

---

## 🔒 Security & Privacy

### Example 1: Content Security Policy
```jsx
// next.config.ts
export default {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: `
            default-src 'self';
            script-src 'self' 'unsafe-inline';
            style-src 'self' 'unsafe-inline';
            media-src 'self' data:;
            font-src 'self' data:;
          `,
        },
      ],
    },
  ],
};
```

### Example 2: Rate Limiting
```jsx
// lib/rateLimit.ts
export const rateLimit = () => {
  const requests = new Map();

  return (identifier: string, limit = 100, window = 60000) => {
    const now = Date.now();
    const record = requests.get(identifier) || [];
    const filtered = record.filter((time: number) => now - time < window);

    if (filtered.length >= limit) {
      return false;
    }

    requests.set(identifier, [...filtered, now]);
    return true;
  };
};
```

---

## 🎓 Learning Resources

### Recommended Reading
1. **Framer Motion Deep Dive**: https://www.framer.com/motion
2. **Next.js Advanced Patterns**: https://nextjs.org/docs/app
3. **Web Performance Tips**: https://web.dev
4. **TypeScript for React**: https://react-typescript-cheatsheet.netlify.app

### Video Resources
1. Advanced Scroll Animations
2. Performance Optimization Techniques
3. React Performance Patterns
4. Next.js Deployment Strategies

---

## 🚀 Production Deployment Checklist

- [ ] All images optimized with Next.js Image
- [ ] Video compressed to <10MB
- [ ] Environment variables configured
- [ ] Analytics integrated
- [ ] Error tracking (Sentry) configured
- [ ] SEO metadata optimized
- [ ] Performance monitored
- [ ] Security headers configured
- [ ] CORS configured if needed
- [ ] Rate limiting enabled

---

**These examples demonstrate the flexibility and power of the Janani Vikalakshi scrollytelling platform!** 🎬✨
