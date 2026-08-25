export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

export const mainNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Events", href: "/events" },
  { title: "Gallery", href: "/gallery" },
  { title: "Projects", href: "/projects" },
  { title: "AWS Modules", href: "/aws-modules", badge: "Hub" },
  { title: "Learning Path", href: "/aws-learning-path" },
  { title: "Contact", href: "/contact" },
];

export const footerNavItems = {
  explore: [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Events & Workshops", href: "/events" },
    { title: "Showcase Projects", href: "/projects" },
    { title: "Photo Gallery", href: "/gallery" },
  ],
  learn: [
    { title: "Cloud Fundamentals", href: "/#cloud-evolution" },
    { title: "AWS Modules Hub", href: "/aws-modules" },
    { title: "Interactive Roadmap", href: "/aws-learning-path" },
    { title: "AWS Foundations", href: "/events/aws-foundations" },
  ],
  community: [
    { title: "Join SXC AWS Club", href: "/contact" },
    { title: "Learning Roadmap", href: "/aws-learning-path" },
  ],
};
