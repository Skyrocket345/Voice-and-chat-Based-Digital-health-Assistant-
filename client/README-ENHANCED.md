# MediSage - Enhanced Features

## 🌟 New Features Added

### 1. **Namaste Welcome Screen**
A beautiful animated welcome screen featuring:
- Shuffle text animation for "🙏 Namaste"
- Smooth transition to main landing page (3.5 seconds)
- Animated gradient orbs background
- Responsive design for all devices

### 2. **ScrollStack Component**
An advanced scroll-based card stacking effect featuring:
- Smooth Lenis scroll implementation
- Cards that stack and scale as you scroll
- Configurable animation parameters
- Responsive and mobile-optimized
- GPU-accelerated animations

### 3. **Enhanced Pages with ScrollStack**

#### **Doctor Page** (`Doctor.jsx`)
- Beautiful card-based doctor profiles
- Detailed information: experience, ratings, education, languages
- Areas of expertise with tags
- Interactive book appointment buttons
- Scroll-triggered stacking animations

#### **Lab Tests Page** (`Lab Tests.js`)
- Categorized test listings (Blood Tests, Imaging, Packages, Specialized)
- Detailed test information with prices and turnaround times
- NABL certified badge, home collection, fast reports
- Why Choose section with benefits
- Engaging visual hierarchy

#### **NinjaX AI Assistant Page** (`NinjaX.js`)
- Hero section with shuffle text animation
- Feature showcase with benefits
- Statistics section (50K+ users, 95% accuracy)
- User testimonials with ratings
- Call-to-action section

## 📦 Components Created

### Shuffle Component
**Location:** `client/src/components/Shuffle.jsx`

**Features:**
- GSAP-powered shuffle text animation
- Customizable direction, duration, easing
- Multiple animation modes (evenodd, random)
- Scroll trigger integration
- Hover trigger support
- Accessibility (respects reduced motion)

**Usage:**
```jsx
import Shuffle from './components/Shuffle';

<Shuffle
  text="Hello World"
  shuffleDirection="right"
  duration={0.35}
  animationMode="evenodd"
  shuffleTimes={1}
  ease="power3.out"
  stagger={0.03}
  threshold={0.1}
  triggerOnce={true}
  triggerOnHover={false}
  respectReducedMotion={true}
/>
```

### ScrollStack Component
**Location:** `client/src/components/ScrollStack.jsx`

**Features:**
- Lenis smooth scroll
- Card pinning and stacking
- Scale and rotation animations
- Blur effects (optional)
- Window or container scroll modes
- Performance optimized

**Usage:**
```jsx
import ScrollStack, { ScrollStackItem } from './components/ScrollStack';

<ScrollStack useWindowScroll={true}>
  <ScrollStackItem>
    <h2>Card 1</h2>
    <p>Your content here</p>
  </ScrollStackItem>
  <ScrollStackItem>
    <h2>Card 2</h2>
    <p>More content</p>
  </ScrollStackItem>
</ScrollStack>
```

## 🎨 Styling

### Color Palette
- **Apollo Green:** `#138808` - Primary action color
- **Apollo Blue:** `#0090d9` - Secondary color
- **Apollo Orange:** `#ff6f3d` - Accent color
- **Background:** Dark gradient `#000000` to `#1a1a1a`

### Effects
- Glass morphism cards with backdrop blur
- Gradient borders with animation
- Smooth hover transitions
- 3D transforms for depth
- Box shadows with brand colors

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
cd client
npm install
```

Dependencies installed:
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing
- `gsap` - Animation library
- `lenis` - Smooth scroll
- `@gsap/react` - GSAP React hooks

### 2. Configure Routing
Update your main app router to include the Welcome screen as the entry point:

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import DoctorPage from './pages/Doctor';
import LabTestsPage from './pages/Lab Tests';
import NinjaXPage from './pages/NinjaX';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Navigate to="/doctors" />} />
        <Route path="/doctors" element={<DoctorPage />} />
        <Route path="/lab-tests" element={<LabTestsPage />} />
        <Route path="/ninjax" element={<NinjaXPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 3. Add Bootstrap Icons
Make sure Bootstrap Icons are included in your HTML:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
```

### 4. GSAP Club Plugins (Optional)
For the full Shuffle effect, you need GSAP's `SplitText` plugin (Club GreenSock membership required).

**Alternative:** If you don't have Club GreenSock access, you can:
- Use the component without SplitText (it will still work with basic animations)
- Implement a custom text splitting solution
- Use the shuffle effect on single words instead

## 🎯 Features Breakdown

### Welcome Screen Flow
1. User opens the website
2. Namaste shuffle animation plays (1.5s)
3. "Welcome to MediSage" subtitle fades in
4. After 3.5 seconds total, auto-navigates to `/home`
5. Gradient orbs animate in background

### ScrollStack Behavior
1. Cards start off-screen below viewport
2. As user scrolls, cards move up and stack
3. Each card scales down slightly based on depth
4. Cards pin at configured position (`stackPosition`)
5. Last card releases when reaching end marker
6. Smooth Lenis scroll enhances experience

### Performance Optimizations
- GPU-accelerated transforms (`translate3d`, `scale`)
- RequestAnimationFrame for smooth 60fps
- Transform caching to minimize recalculations
- `will-change` hints for browser optimization
- Debounced scroll handlers
- Conditional rendering based on viewport

## 📱 Responsive Design

### Breakpoints
- **Desktop:** Full experience with all animations
- **Tablet (768px):** Adjusted padding and font sizes
- **Mobile (480px):** Optimized touch interactions, reduced animation complexity

### Mobile Considerations
- Touch-friendly button sizes
- Readable font sizes (minimum 16px)
- Reduced motion for performance
- Simplified gradient effects
- Stack spacing adjustments

## 🎨 Customization

### Shuffle Component Props
```jsx
{
  text: string;                    // Text to animate
  shuffleDirection: 'left'|'right'; // Animation direction
  duration: number;                // Animation duration (seconds)
  animationMode: 'evenodd'|'random'; // Stagger pattern
  shuffleTimes: number;            // Number of shuffle rolls
  ease: string;                    // GSAP easing function
  stagger: number;                 // Delay between characters
  threshold: number;               // Scroll trigger threshold
  triggerOnce: boolean;            // Trigger only once
  triggerOnHover: boolean;         // Re-trigger on hover
  scrambleCharset: string;         // Custom scramble characters
  colorFrom/colorTo: string;       // Color transition
}
```

### ScrollStack Component Props
```jsx
{
  itemDistance: number;            // Space between cards (px)
  itemScale: number;               // Scale decrement per card
  itemStackDistance: number;       // Stack offset (px)
  stackPosition: string;           // Pin position (% or px)
  scaleEndPosition: string;        // Scale animation end
  baseScale: number;               // Minimum scale value
  rotationAmount: number;          // Rotation per card (deg)
  blurAmount: number;              // Blur per depth level (px)
  useWindowScroll: boolean;        // Window vs container scroll
  onStackComplete: function;       // Callback when stacking completes
}
```

## 🐛 Troubleshooting

### Shuffle Animation Not Working
- Ensure GSAP and @gsap/react are installed
- Check if fonts are loaded before animation
- Verify ScrollTrigger is registered
- Check browser console for errors

### ScrollStack Cards Not Stacking
- Confirm Lenis is installed
- Check useWindowScroll prop matches your layout
- Verify cards have proper ScrollStackItem wrapper
- Ensure sufficient content height for scrolling

### Performance Issues
- Reduce number of cards in view
- Disable blur effects on mobile
- Lower animation complexity
- Check for other heavy scripts

## 📄 File Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Shuffle.jsx       # Shuffle text animation component
│   │   ├── Shuffle.css        # Shuffle styling
│   │   ├── ScrollStack.jsx    # ScrollStack component
│   │   └── ScrollStack.css    # ScrollStack styling
│   ├── pages/
│   │   ├── Welcome.jsx        # Namaste welcome screen
│   │   ├── Welcome.css        # Welcome styling
│   │   ├── Doctor.jsx         # Enhanced doctor page
│   │   ├── Lab Tests.js       # Enhanced lab tests page
│   │   └── NinjaX.js          # Enhanced AI assistant page
│   └── App.jsx                # Main app with routing
├── package.json
└── README-ENHANCED.md         # This file
```

## 🎓 Learning Resources

### GSAP
- Official Docs: https://greensock.com/docs/
- ScrollTrigger: https://greensock.com/docs/v3/Plugins/ScrollTrigger
- Club GreenSock: https://greensock.com/club/

### Lenis
- GitHub: https://github.com/studio-freight/lenis
- Documentation: https://lenis.studiofreight.com/

### React Router
- Docs: https://reactrouter.com/

## 💡 Future Enhancements

- [ ] Add Health Records page with ScrollStack
- [ ] Implement voice interaction for NinjaX
- [ ] Add real-time appointment booking
- [ ] Integrate payment gateway for lab tests
- [ ] Add user authentication and profiles
- [ ] Implement chat history for NinjaX
- [ ] Add dark/light mode toggle
- [ ] Multi-language support for content

## 📞 Support

For questions or issues with the enhanced features:
1. Check this README first
2. Review component source code and comments
3. Check browser console for errors
4. Refer to official library documentation

---

**Built with ❤️ for MediSage** - Your Digital Health Companion
