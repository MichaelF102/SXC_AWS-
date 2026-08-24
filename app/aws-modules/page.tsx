"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Cpu, Server, HardDrive, Database, Network, Shield, BarChart3, Sparkles, Search, Compass } from "lucide-react";
import { INITIAL_AWS_MODULES } from "@/lib/data/initialData";
import { ModuleCard } from "@/components/aws/ModuleCard";
import { ServiceOrbit } from "@/components/animations/ServiceOrbit";

export default function AWSModulesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "ALL", label: "All Services", icon: Cpu },
    { id: "COMPUTE", label: "Compute", icon: Server },
    { id: "STORAGE", label: "Storage", icon: HardDrive },
    { id: "DATABASE", label: "Databases", icon: Database },
    { id: "NETWORKING", label: "Networking", icon: Network },
    { id: "SECURITY", label: "Security & IAM", icon: Shield },
    { id: "AIML", label: "AI & ML", icon: Sparkles },
    { id: "ANALYTICS", label: "Analytics", icon: BarChart3 },
  ];

  const filteredModules = INITIAL_AWS_MODULES.filter((mod) => {
    const matchesSearch =
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.serviceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.keyConcepts.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "ALL" || mod.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "ALL" || mod.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      {/* Header & Service Orbit Visualizer */}
      <section className="max-w-[1750px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-8 pb-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-aws-orange/15 text-aws-orange border border-aws-orange/30">
            <Compass className="w-3.5 h-3.5" />
            <span>AWS LEARNING HUB</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Interactive AWS <span className="text-gradient-orange">Module Catalog</span>
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            Master core Amazon Web Services through hands-on architecture deep-dives, CLI commands, security best practices, and guided labs.
          </p>

          <div className="pt-2">
            <Link
              href="/aws-learning-path"
              className="inline-flex items-center gap-2 text-xs font-mono text-aws-orange hover:text-white underline underline-offset-4"
            >
              <span>View structured Cloud Architect Roadmap →</span>
            </Link>
          </div>
        </div>

        {/* 3D Planetary Service Orbit Component */}
        <div className="mt-8 mb-4">
          <ServiceOrbit />
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto pt-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by AWS service, CLI command, or concept..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-navy-900/90 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-aws-orange text-xs backdrop-blur-md"
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-[1750px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pb-10 space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  isSelected
                    ? "bg-aws-orange text-black font-bold shadow-lg shadow-aws-orange/20"
                    : "bg-navy-900/80 text-slate-300 border border-white/10 hover:border-aws-orange/40 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Difficulty:</span>
          {["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED"].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-2.5 py-0.5 rounded-lg border ${
                selectedDifficulty === diff
                  ? "bg-navy-700 text-aws-orange border-aws-orange font-bold"
                  : "bg-navy-950/60 text-slate-400 border-white/5 hover:text-white"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </section>

      {/* Modules Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-20 bg-navy-900/40 rounded-3xl border border-white/5 space-y-2">
            <Cpu className="w-8 h-8 text-slate-500 mx-auto" />
            <div className="text-sm font-bold text-white">No AWS modules found</div>
            <p className="text-xs text-slate-400 font-mono">Try adjusting your category or search term.</p>
          </div>
        )}
      </section>
    </div>
  );
}
