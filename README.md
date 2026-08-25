# ☁️ SXC AWS Club — Official Web Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![AWS](https://img.shields.io/badge/AWS-Cloud-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=for-the-badge&logo=cloudflare)

**Empowering St. Xavier's College builders to Architect, Deploy, and Scale on the AWS Cloud.**

[Explore Platform](http://localhost:3000) • [Learning Path](http://localhost:3000/aws-learning-path) • [Upcoming Events](http://localhost:3000/events) • [AWS Modules](http://localhost:3000/aws-modules)

</div>

---

## 🌟 Overview

The **SXC AWS Club Platform** is a modern, high-performance web application engineered for the official student AWS Cloud community at **St. Xavier's College**. Built with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS**, and **Three.js**, it bridges the gap between theoretical computer science and enterprise cloud architecture.

---

## 🚀 Key Features

### 1. 🌌 Futuristic Cloud Architecture Hero & 3D Visualizer
* **Three.js Particle Cloud**: Dynamic 3D interactive particle cloud background with real-time mouse tracking.
* **Interactive Architecture Explorer**: Live preview tabs for **Serverless Microservices**, **Multi-Region Resiliency**, and **GenAI on Bedrock**.
* **Global Command Search (`⌘K`)**: Instant fuzzy search modal across all events, learning stages, and AWS services.

### 2. 🗺️ AWS Cloud Architect Learning Path & Market Roles
* **9-Stage Interactive Roadmap**: Structured progression from *Cloud Fundamentals* and *Compute & Storage* to *Multi-Region IaC* and *Generative AI*.
* **8 Market Career Roles**: Dedicated breakdowns for Cloud Architect, DevOps Engineer, Cloud Security, SRE, and AI/ML Engineer.
* **Interactive Path Finder**: Dynamic role selector based on student interests (Coding, Infra, Security, AI, Data).

### 3. 📅 Flagship Events & Instant RSVP
* **AWS Foundations Event**: Complete schedule, speaker panel, venue details (*Bonet Lab*), and curriculum outline.
* **Registration Form**: Streamlined student registration validating:
  * Name & Surname
  * Student UID / Roll Number
  * Email Address
  * Academic Year (*FY, SY, TY, PG Part 1, PG Part 2*)
  * Stream (*BSc, BSc IT, BSc AI, BCom, BMS, BA, BAF, MSc BDA, MSc*)

### 5. 📚 11 Deep-Dive AWS Service Modules
* Interactive technical modules with architecture diagrams, cost calculators, CLI cheat sheets, and best practices for:
  * **Compute & Containers**: EC2, Lambda, ECS/EKS
  * **Storage & Databases**: S3, DynamoDB, RDS Aurora
  * **Networking & Security**: VPC, IAM, CloudFront
  * **AI & Analytics**: Amazon Bedrock, AWS Glue & Athena

### 6. 📸 Media Archive & 🛠️ Innovation Lab
* Filterable **Photo & Moment Gallery** archive with status tracking.
* **Open-Source Project Showcase** under active development for the 2026 cohort.

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
│   ├── aws-learning-path/      # 9-Stage Roadmap & Cloud Roles
│   ├── aws-modules/            # 11 AWS Architecture Modules
│   ├── contact/                # Contact & FAQ Portal
│   ├── events/                 # Flagship Community Events
│   ├── gallery/                # Moments & Keynotes Gallery
│   ├── projects/               # Student Innovation Lab
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
│   └── roadmap/                # Roadmap Stages & Cloud Roles Section
├── config/                     # Configuration Schemas
│   ├── cloudRoles.ts           # 8 Market Career Paths Schema
│   ├── navigation.ts           # Global Nav Items
│   └── site.ts                 # Metadata & Social Links
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

### Deploying to Cloudflare Pages
1. Push your code to **GitHub** or **GitLab**.
2. Go to **Cloudflare Dashboard** > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Configure the build settings:
   * **Framework preset**: `Next.js`
   * **Build command**: `npm run build`
   * **Build output directory**: `.next`
   * **Environment Variables**:
     * `NODE_VERSION`: `20`

---

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

---

<div align="center">
  <sub>Built with ❤️ by the student cloud architects at <strong>St. Xavier's College AWS Club</strong>.</sub>
</div>
