"use client";

import React, { useState } from "react";
import {
  Server,
  Layers,
  GitBranch,
  Database,
  ShieldCheck,
  Activity,
  Bot,
  Boxes,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Filter,
  Compass,
  Cpu,
  Network,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CLOUD_ROLES_DATA, CloudRole } from "@/config/cloudRoles";

const iconMap: Record<string, any> = {
  Server,
  Layers,
  GitBranch,
  Database,
  ShieldCheck,
  Activity,
  Bot,
  Boxes,
};

export function CloudRolesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [highlightedRoleId, setHighlightedRoleId] = useState<string | null>(null);

  const categories = [
    { id: "ALL", label: "ALL" },
    { id: "INFRASTRUCTURE", label: "INFRASTRUCTURE" },
    { id: "ARCHITECTURE", label: "ARCHITECTURE" },
    { id: "DEVOPS", label: "DEVOPS" },
    { id: "DATA", label: "DATA" },
    { id: "SECURITY", label: "SECURITY" },
    { id: "RELIABILITY", label: "RELIABILITY" },
    { id: "AI / ML", label: "AI / ML" },
  ];

  const filteredRoles =
    activeCategory === "ALL"
      ? CLOUD_ROLES_DATA
      : CLOUD_ROLES_DATA.filter((r) => r.category === activeCategory);

  const handlePassionSelect = (roleId: string) => {
    setHighlightedRoleId(roleId);
    setActiveCategory("ALL");
    const el = document.getElementById(`role-${roleId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="cloud-roles" className="max-w-[1750px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-24 pb-20">
      {/* 1. SECTION HERO */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-aws-orange/15 text-aws-orange border border-aws-orange/30 shadow-lg shadow-aws-orange/5">
          <Compass className="w-3.5 h-3.5" />
          <span>CLOUD CAREER MAP</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          <span className="text-gradient-orange">Cloud Roles</span> in the Market
        </h2>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Cloud computing opens multiple career paths across infrastructure, architecture, DevOps, data, security, reliability and AI/ML.
        </p>

        {/* Pathway Subline */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs font-mono font-bold text-aws-orange pt-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-lg bg-navy-900/90 border border-white/10 text-white">LEARN</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-navy-900/90 border border-white/10 text-white">BUILD</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-navy-900/90 border border-white/10 text-white">SPECIALIZE</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-aws-orange/20 border border-aws-orange/40 text-aws-orange">DEPLOY</span>
        </div>
      </div>

      {/* 2. CATEGORY FILTER TABS */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setHighlightedRoleId(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
              activeCategory === cat.id
                ? "bg-aws-orange text-black font-bold shadow-lg shadow-aws-orange/20 scale-105"
                : "bg-navy-900/80 text-slate-300 border border-white/10 hover:border-aws-orange/40 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3. ROLES GRID (4x2 on desktop, 2-col on tablet, 1-col on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {filteredRoles.map((role) => {
          const Icon = iconMap[role.iconName] || Server;
          const isHighlighted = highlightedRoleId === role.id;

          return (
            <motion.div
              id={`role-${role.id}`}
              key={role.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`p-6 sm:p-7 rounded-3xl backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-xl ${
                isHighlighted
                  ? "bg-navy-900 border-aws-orange shadow-2xl shadow-aws-orange/25 ring-2 ring-aws-orange scale-102"
                  : "bg-navy-900/70 border-white/10 hover:border-aws-orange/50 hover:bg-navy-900/90"
              }`}
            >
              {/* Card Top: Number & Category */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-2xl font-display font-black text-slate-500 group-hover:text-aws-orange transition-colors">
                    {role.number}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold border ${role.badgeBorder}`}>
                    {role.categoryLabel}
                  </span>
                </div>

                {/* Role Icon & Title */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-navy-950/90 border border-white/10 flex items-center justify-center text-aws-orange group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-aws-orange transition-colors leading-tight">
                      {role.title}
                    </h3>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs text-slate-300 leading-relaxed mt-2 mb-4">
                  {role.tagline}
                </p>

                {/* Key Responsibilities List */}
                <div className="p-3.5 rounded-2xl bg-navy-950/80 border border-white/5 space-y-1.5 mb-4">
                  <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Key Responsibilities
                  </div>
                  {role.responsibilities.slice(0, 4).map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-1.5 text-[11px] text-slate-300 leading-snug">
                      <span className="text-aws-orange font-bold">•</span>
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Bottom: Core AWS Services & Explore Link */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                    {role.techType}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {role.coreTech.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs font-mono font-bold text-slate-400 group-hover:text-aws-orange transition-colors">
                  <span>EXPLORE ROLE</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 4. CAREER CONNECTIONS: HOW CLOUD CAREERS CONNECT */}
      <div className="mb-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-navy-900 to-navy-950 border border-aws-orange/30 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 mb-2">
            <Network className="w-3.5 h-3.5" />
            <span>INTERCONNECTED ECOSYSTEM</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How Cloud Careers Connect
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Cloud engineering roles don&apos;t exist in silos. They collaborate across architecture, automation, security, and data pipelines.
          </p>
        </div>

        {/* Visual Connectivity Hierarchy Diagram */}
        <div className="flex flex-col items-center max-w-3xl mx-auto space-y-4">
          {/* Top Node: Cloud Architect */}
          <div className="p-3.5 px-6 rounded-2xl bg-navy-900 border-2 border-aws-orange shadow-lg shadow-aws-orange/20 text-center">
            <div className="text-[10px] font-mono text-aws-orange font-bold">SYSTEM BLUEPRINT</div>
            <div className="text-sm font-bold text-white">Cloud Architect</div>
          </div>

          <div className="w-0.5 h-5 bg-gradient-to-b from-aws-orange to-white/40" />

          {/* Tier 2: Cloud Engineer, DevOps / SRE, Security */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            <div className="p-3 rounded-xl bg-navy-950/90 border border-white/15 text-center">
              <div className="text-[9px] font-mono text-amber-400">INFRASTRUCTURE</div>
              <div className="text-xs font-bold text-white">Cloud Engineer</div>
            </div>
            <div className="p-3 rounded-xl bg-navy-950/90 border border-white/15 text-center">
              <div className="text-[9px] font-mono text-emerald-400">AUTOMATION & RELIABILITY</div>
              <div className="text-xs font-bold text-white">DevOps / SRE</div>
            </div>
            <div className="p-3 rounded-xl bg-navy-950/90 border border-white/15 text-center">
              <div className="text-[9px] font-mono text-rose-400">DEFENSE & COMPLIANCE</div>
              <div className="text-xs font-bold text-white">Cloud Security</div>
            </div>
          </div>

          <div className="w-0.5 h-5 bg-gradient-to-b from-white/40 to-aws-orange" />

          {/* Tier 3: Data Engineer, ML Engineer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full sm:w-2/3">
            <div className="p-3 rounded-xl bg-navy-950/90 border border-white/15 text-center">
              <div className="text-[9px] font-mono text-purple-400">DATA PIPELINES</div>
              <div className="text-xs font-bold text-white">Cloud Data Engineer</div>
            </div>
            <div className="p-3 rounded-xl bg-navy-950/90 border border-white/15 text-center">
              <div className="text-[9px] font-mono text-yellow-400">INTELLIGENT MODELS</div>
              <div className="text-xs font-bold text-white">Cloud ML Engineer</div>
            </div>
          </div>

          <div className="w-0.5 h-5 bg-gradient-to-b from-aws-orange to-indigo-400" />

          {/* Bottom Tier: Solutions Architect */}
          <div className="p-3.5 px-6 rounded-2xl bg-navy-900 border-2 border-indigo-500/60 shadow-lg text-center">
            <div className="text-[10px] font-mono text-indigo-400 font-bold">ENTERPRISE DELIVERY & VALUE</div>
            <div className="text-sm font-bold text-white">Cloud Solutions Architect</div>
          </div>
        </div>
      </div>

      {/* 5. "WHICH ROLE FITS YOU?" INTERACTIVE CAREER SELECTOR */}
      <div className="p-8 sm:p-12 rounded-3xl bg-navy-900/80 border border-white/15 shadow-2xl backdrop-blur-2xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>PERSONALIZED PATHFINDER</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Which Cloud Path Fits You?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Click your core interest below to highlight and jump to your optimal cloud specialization above.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CLOUD_ROLES_DATA.map((role) => (
            <button
              key={role.id}
              onClick={() => handlePassionSelect(role.id)}
              className="p-4 rounded-2xl bg-navy-950/80 border border-white/10 hover:border-aws-orange hover:bg-navy-950 transition-all text-left group flex flex-col justify-between cursor-pointer"
            >
              <div className="text-xs text-slate-300 group-hover:text-white leading-relaxed mb-3">
                &ldquo;{role.userPassion}&rdquo;
              </div>

              <div className="flex items-center justify-between text-xs font-mono font-bold text-aws-orange pt-2 border-t border-white/5">
                <span>→ {role.title}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
