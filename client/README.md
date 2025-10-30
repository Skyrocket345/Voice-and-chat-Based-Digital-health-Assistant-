# MediSage Client - Quick Start Guide

## 🚀 How to Run the Project

### 1. Install Dependencies (if not already done)
```bash
cd client
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

This will:
- Start the Vite development server
- Open your browser automatically at `http://localhost:3000`
- Show the Namaste welcome screen
- Auto-navigate to the main pages after 3.5 seconds

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
client/
├── main.jsx                 # React entry point
├── app.jsx                  # Main App with routing
├── index.css                # Global styles
├── index-react.html         # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies & scripts
│
├── src/
│   ├── components/
│   │   ├── Shuffle.jsx      # Text shuffle animation
│   │   ├── Shuffle.css
│   │   ├── ScrollStack.jsx  # Card stacking effect
│   │   └── ScrollStack.css
│   │
│   └── pages/
│       ├── Welcome.jsx      # Namaste welcome screen
│       ├── Welcome.css
│       ├── Doctor.jsx       # Doctor listing page
│       ├── Lab Tests.js     # Lab tests page
│       └── NinjaX.js        # AI assistant page
│
└── node_modules/            # Dependencies (ignored by git)
```

## 🌐 Routes

- `/` - Namaste Welcome Screen (auto-navigates after 3.5s)
- `/home` - Redirects to `/doctors`
- `/doctors` - Find Expert Doctors
- `/lab-tests` - Lab Tests & Diagnostics
- `/ninjax` - NinjaX AI Assistant

## 🎨 Features

✅ Namaste welcome animation with Shuffle effect  
✅ ScrollStack card animations  
✅ Smooth Lenis scrolling  
✅ GSAP animations  
✅ Fully responsive design  
✅ Dark theme with gradient effects  
✅ Bootstrap Icons  

## 🛠️ Technologies Used

- **React 19** - UI library
- **React Router 7** - Routing
- **Vite 7** - Build tool & dev server
- **GSAP 3** - Animations
- **Lenis** - Smooth scroll
- **Bootstrap Icons** - Icon library

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will use the next available port (3001, 3002, etc.)

### Module Not Found
Make sure all dependencies are installed:
```bash
npm install
```

### Animations Not Working
Ensure you have internet connection for Google Fonts and Bootstrap Icons CDN.

### Hot Reload Not Working
Try restarting the dev server:
```bash
# Press Ctrl+C to stop
npm run dev
```

## 🎯 Next Steps

1. Run `npm run dev` to start the development server
2. Open browser at `http://localhost:3000`
3. See the Namaste animation
4. Explore the enhanced pages!

## 💡 Tips

- Use browser DevTools to inspect animations
- Check console for any errors
- The app uses React Router for navigation
- All pages use ScrollStack for card effects

---

**Happy Coding! 🎉**
