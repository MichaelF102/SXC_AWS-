# ☁️ SXC AWS Club — Official Web Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![AWS](https://img.shields.io/badge/AWS-Cloud-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=for-the-badge&logo=cloudflare)

**Empowering St. Xavier's College builders to Architect, Deploy, and Scale on the AWS Cloud.**

[Explore Platform](http://localhost:3000) • [Upcoming Events](http://localhost:3000/events) • [Our Teams](http://localhost:3000/teams) • [About Us](http://localhost:3000/about)

</div>

---

## 🌟 Overview

The **SXC AWS Club Platform** is a modern, high-performance web application engineered for the official student AWS Cloud community at **St. Xavier's College**. Built with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS**, and **Three.js**, it bridges the gap between theoretical computer science and enterprise cloud architecture.

---
## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) + Custom Glassmorphism & Cyber Gradients |
| **3D & Animation** | [Three.js](https://threejs.org/) + [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database & Auth** | [Supabase (PostgreSQL)](https://supabase.com/) + In-Memory Fallback Store |
| **Effects** | `canvas-confetti` |
| **Deployment Target** | [Cloudflare Pages](https://pages.cloudflare.com/) / [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

```text
SXC_AWS/
├── app/                        # Next.js 15 App Router Pages
│   ├── about/                  # About Page (Mission, Vision, Member Perks)
│   ├── admin/                  # Admin Management Portal
│   ├── api/                    # API Endpoints (events, register, contact)
│   ├── contact/                # Contact & FAQ Portal
│   ├── events/                 # Flagship Community Events
│   ├── gallery/                # Moments & Keynotes Gallery
│   ├── projects/               # Student Innovation Lab
│   ├── teams/                  # Organizational Hierarchy Tree
│   ├── globals.css             # Tailwind Styles & Theme Overrides
│   ├── layout.tsx              # Root Layout & Metadata
│   ├── not-found.tsx           # Custom 404 Page
│   ├── robots.ts               # SEO Robots Configuration
│   └── sitemap.ts              # Automated XML Sitemap
├── components/                 # Reusable UI Components
│   ├── events/                 # Event Cards & Registration Modal
│   ├── footer/                 # Platform Footer & Links
│   ├── gallery/                # Gallery Grid & Lightbox
│   ├── home/                   # Hero, 3D Cloud, Feature Grids
│   ├── navbar/                 # Global Navigation & Search Modal
│   └── teams/                  # Organizational Command Tree Nodes
├── config/                     # Configuration Schemas
│   ├── navigation.ts           # Global Nav Items
│   ├── site.ts                 # Metadata & Social Links
│   └── teamHierarchy.ts        # Leadership & Department Tree Data
├── lib/                        # Data Stores & Utilities
│   ├── data/initialData.ts     # Initial Datasets & Seed Content
│   └── db/index.ts             # In-Memory & Database Adapter
├── public/                     # Static Assets & Icons
└── next.config.mjs             # Next.js Config (Edge & Unoptimized Image Support)
```

---

## ⚡ Getting Started

### Prerequisites
* **Node.js**: `v18.17.0` or higher (Recommended: `v20.x`)
* **npm**, **pnpm**, or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/sxc-aws-club.git
   cd sxc-aws-club
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/sxc_aws?schema=public"
   ADMIN_SECRET_KEY="your-secure-admin-key"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Production Build & Deployment

### Local Production Build
Verify type checks and build output:
```bash
npm run build
npm run start
```

## 🤝 Contributing

Contributions from students and community builders are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.
