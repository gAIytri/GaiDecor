# GaiDecor - Modern Home Decor E-Commerce

A sophisticated e-commerce platform for home decor products built with React, TypeScript, and Tailwind CSS. Features AI-enriched product descriptions, dynamic filtering, and a beautiful responsive design.

![GaiDecor](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)

## Features

- **6 Product Categories**: Furniture, Rugs, Lighting, Decor, Art & Mirrors, Bedding
- **AI-Enriched Descriptions**: Product descriptions generated using GPT-4 Vision
- **Dynamic Filtering**: Filter by color, material, style, price range, and more
- **URL-Based Filters**: Shareable filtered views via URL parameters
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Shopping Cart**: Persistent cart with slide-out drawer
- **Product Detail Pages**: Expandable descriptions, care instructions, dimensions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/gAIytri/GaiDecor.git
cd GaiDecor
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Build outputs to `dist/` folder. Deploy to Vercel, Netlify, or any static host.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| React Router v6 | Client-side routing |
| Zustand | State management |
| Framer Motion | Animations |
| Lucide React | Icons |
| Radix UI | Accessible components |

## Project Structure

```
src/
├── App.tsx                 # Main app with routing
├── main.tsx               # Entry point
├── index.css              # Global styles + Tailwind
├── assets/                # Static images by category
│   ├── furniture/
│   ├── rugs/
│   ├── lighting/
│   ├── decor/
│   ├── art/
│   └── bedding/
├── components/            # Reusable components
│   ├── cart/             # Cart drawer
│   ├── common/           # Toast, ScrollToTop
│   ├── landing/          # Landing page sections
│   ├── layout/           # Navbar, Footer, MegaMenu
│   ├── product/          # ProductGrid, ProductCard, FilterSidebar
│   └── ui/               # Button, Badge, Dialog, etc.
├── data/                  # Product JSON data & image mappings
│   ├── furniture.json
│   ├── rugs.json
│   ├── lighting.json
│   ├── decor.json
│   ├── art.json
│   ├── bedding.json
│   └── images/           # Image import mappings
├── design-system/         # Custom SX-based design system
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── pages/                 # Page components
│   ├── category/         # Category hub & listing pages
│   ├── ProductDetail.tsx
│   ├── Search.tsx
│   └── LandingConcept1.tsx
├── services/              # Product service layer
├── store/                 # Zustand stores (cart, recently viewed)
└── types/                 # TypeScript type definitions
```

## Product Categories

| Category | URL | Products |
|----------|-----|----------|
| Furniture | `/category/furniture` | Sofas, chairs, tables, TV stands |
| Rugs | `/category/rugs` | Area rugs, runners, outdoor rugs |
| Lighting | `/category/lighting` | Ceiling lights, floor/table lamps, sconces |
| Decor | `/category/decor` | Vases, candles, decorative objects, pillows |
| Art & Mirrors | `/category/art` | Wall art, mirrors |
| Bedding | `/category/bedding` | Bedding sets, curtains, throw blankets |

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with featured products |
| `/category/:category` | Category hub or product listing |
| `/category/:category?subcategory=X` | Filtered product listing |
| `/product/:id` | Product detail page |
| `/search?q=query` | Search results |

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production (includes TypeScript check)
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## License

MIT
