# Bots Overkill - Premium ROV Website

A premium, Apple-inspired React website showcasing underwater ROVs and robotic solutions. Market-ready with professional design, smooth animations, and fully responsive layout.

## Features

- 🎨 Dark mode theme with Apple-inspired design
- 📹 Full-screen hero video background
- 🎬 Hover-to-play video on product cards
- 📱 Fully responsive design for all devices
- ✨ Smooth animations and transitions
- 🎯 Horizontal scrolling product grids
- 🌊 Four product categories: Underwater, Surfacewater, Land, and Air

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
BotsOverKill/
├── public/
│   ├── home.mp4
│   ├── Air/              # Air product images
│   ├── Land/             # Land product images
│   ├── Underwater/       # Underwater product images
│   └── Surfacewater/     # Surfacewater product images
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navigation bar component
│   │   ├── Footer.jsx              # Footer component
│   │   ├── ProductCard.jsx         # Individual product card
│   │   └── HorizontalProductGrid.jsx # Horizontal scrolling grid
│   ├── pages/
│   │   └── Home.jsx                # Home page with hero and products
│   ├── App.jsx                     # Main application component
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Tailwind CSS imports
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Product Categories

The website displays products in four categories:

1. **Underwater** - Alpha (with video on hover), ROV, Luna, ARVi, Boxfish AUV
2. **Surfacewater** - APACHE4 USV, Mariner X USV, Tactical AMY USV, Hound Reckless USV
3. **Land** - Husky A300, Warthog, Dingo, Jackal
4. **Air** - Five aerial platform products

## Customization

To add videos for product cards, update the `videoUrl` property in the `productCategories` array in `src/pages/Home.jsx`.

## Technologies

- React 18
- Vite
- Tailwind CSS
- Inter Font

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

