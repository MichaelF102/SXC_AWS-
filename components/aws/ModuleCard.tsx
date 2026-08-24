import React from "react";
import Link from "next/link";
import { Server, Zap, Box, HardDrive, Database, Layers, Network, Globe, Shield, Cpu, BarChart3, ArrowUpRight, BookOpen } from "lucide-react";
import { AWSModuleData } from "@/lib/data/initialData";

interface ModuleCardProps {
  module: AWSModuleData;
}

const iconMap: Record<string, any> = {
  Server,
  Zap,
  Box,
  HardDrive,
  Database,
  Layers,
  Network,
  Globe,
  Shield,
  Cpu,
  BarChart3,
};

export function ModuleCard({ module }: ModuleCardProps) {
  const IconComponent = iconMap[module.iconName] || Server;

  const difficultyColors = {
    BEGINNER: "text-emerald-400 bg-emerald-950/60 border-emerald-500/30",
    INTERMEDIATE: "text-amber-400 bg-amber-950/60 border-amber-500/30",
    ADVANCED: "text-red-400 bg-red-950/60 border-red-500/30",
  };

  return (
    <div className="group relative rounded-2xl p-6 bg-navy-900/70 border border-white/10 hover:border-aws-orange/50 transition-all duration-300 flex flex-col justify-between shadow-xl">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-aws-orange/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-navy-800 border border-white/15 flex items-center justify-center text-aws-orange group-hover:scale-110 group-hover:border-aws-orange/40 transition-all shadow-inner">
            <IconComponent className="w-6 h-6 stroke-[2]" />
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              {module.category}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[9px] font-mono border ${
                difficultyColors[module.difficulty] || "text-slate-400 border-white/10"
              }`}
            >
              {module.difficulty}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/aws-modules/${module.slug}`}>
          <h3 className="text-lg font-bold text-white group-hover:text-aws-orange transition-colors flex items-center gap-2">
            <span>{module.title}</span>
            <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-white/5 text-aws-orange border border-white/10 font-normal">
              {module.serviceCode}
            </span>
          </h3>
        </Link>

        {/* Short Desc */}
        <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
          {module.shortDesc}
        </p>

        {/* Key Concepts Preview */}
        <div className="mt-4 pt-3 border-t border-white/5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
            Key Concepts
          </div>
          <ul className="space-y-1 text-[11px] text-slate-300">
            {module.keyConcepts.slice(0, 3).map((concept, idx) => (
              <li key={idx} className="flex items-start gap-1.5 truncate">
                <span className="text-aws-orange font-bold">•</span>
                <span className="truncate">{concept}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-aws-orange" />
          <span>Lab & CLI Tutorial</span>
        </span>

        <Link
          href={`/aws-modules/${module.slug}`}
          className="px-3 py-1.5 rounded-xl bg-navy-800 hover:bg-aws-orange text-slate-200 hover:text-black font-bold text-xs border border-white/10 hover:border-aws-orange transition-all flex items-center gap-1"
        >
          <span>Explore</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
