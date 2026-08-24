import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
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
  ArrowLeft,
  Terminal,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { db } from "@/lib/db";
import { ModuleDetailClient } from "@/components/aws/ModuleDetailClient";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const modules = db.getModules();
  return modules.map((m) => ({ slug: m.slug }));
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

export default function AWSModuleDetailPage({ params }: Props) {
  const module = db.getModuleBySlug(params.slug);

  if (!module) {
    notFound();
  }

  const IconComponent = iconMap[module.iconName] || Server;
  const allModules = db.getModules();
  const relatedModules = allModules.filter((m) => m.id !== module.id && m.category === module.category).slice(0, 3);

  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      {/* Back button */}
      <div className="max-w-[1750px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 mb-6">
        <Link
          href="/aws-modules"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-navy-900/80 hover:bg-navy-800 text-slate-300 hover:text-aws-orange border border-white/10 text-xs font-mono transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All AWS Modules</span>
        </Link>
      </div>

      {/* Module Header Banner */}
      <section className="max-w-[1750px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="p-8 sm:p-10 rounded-3xl bg-navy-900/80 border border-aws-orange/30 backdrop-blur-2xl shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-aws-orange/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-aws-orange to-amber-600 flex items-center justify-center text-navy-950 font-bold shadow-xl shadow-aws-orange/20 shrink-0">
                <IconComponent className="w-8 h-8 text-black stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-aws-orange uppercase tracking-wider">
                    AWS {module.category}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                    {module.serviceCode}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                  {module.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-navy-950 text-aws-orange border border-aws-orange/40">
                {module.difficulty} TIER
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed relative z-10">
            {module.description}
          </p>
        </div>
      </section>

      {/* Main Grid: Concepts, CLI, Labs & Interactive Client Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Core Architecture & Hands-on Lab */}
          <div className="lg:col-span-8 space-y-10">
            {/* Key Concepts */}
            <div className="p-8 rounded-3xl bg-navy-900/70 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-aws-orange" />
                <span>Fundamental Architectural Concepts</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {module.keyConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-navy-950/80 border border-white/5 flex items-start gap-2.5 text-xs text-slate-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-aws-orange shrink-0 mt-1.5" />
                    <span>{concept}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AWS CLI Examples Interactive Sandbox */}
            {module.cliExamples && (
              <div className="p-8 rounded-3xl bg-navy-900/70 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-aws-orange" />
                  <span>Essential AWS CLI Commands</span>
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Copy and run these in your AWS CLI or CloudShell terminal.
                </p>

                <div className="space-y-4 pt-2">
                  {(module.cliExamples as any[]).map((cli, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-navy-950 border border-white/10 font-mono text-xs space-y-2"
                    >
                      <div className="text-[11px] text-aws-orange-light font-sans">{cli.description}</div>
                      <div className="p-3 rounded-xl bg-black/70 text-emerald-400 overflow-x-auto select-all border border-emerald-500/20">
                        <code>{cli.command}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step-by-Step Hands-On Lab Walkthrough */}
            {module.labGuide && (
              <div className="p-8 rounded-3xl bg-navy-900/70 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-aws-orange" />
                  <span>Hands-On Step-by-Step Lab Guide</span>
                </h2>
                <div className="p-5 rounded-2xl bg-navy-950/80 border border-white/10 whitespace-pre-line text-xs font-mono leading-relaxed text-slate-300">
                  {module.labGuide}
                </div>
              </div>
            )}

            {/* Interactive Knowledge Quiz Checkpoint (Client) */}
            <ModuleDetailClient moduleTitle={module.title} />
          </div>

          {/* Right Column: Resources & Related Modules */}
          <div className="lg:col-span-4 space-y-6">
            {/* Learning Resources */}
            <div className="p-6 rounded-3xl bg-navy-900/80 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Official Docs & Tutorials
              </h3>
              <div className="space-y-2.5">
                {module.resources.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-navy-950/80 border border-white/5 hover:border-aws-orange/40 transition-colors flex items-center justify-between text-xs text-slate-200 hover:text-aws-orange group"
                  >
                    <div className="truncate pr-2">
                      <span className="font-semibold block truncate">{res.title}</span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{res.type}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-aws-orange shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Related Modules in same Category */}
            {relatedModules.length > 0 && (
              <div className="p-6 rounded-3xl bg-navy-900/80 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  More in {module.category}
                </h3>
                <div className="space-y-2.5">
                  {relatedModules.map((rm) => (
                    <Link
                      key={rm.id}
                      href={`/aws-modules/${rm.slug}`}
                      className="block p-3 rounded-2xl bg-navy-950/80 border border-white/5 hover:border-aws-orange/40 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white group-hover:text-aws-orange transition-colors">
                          {rm.title}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-aws-orange">
                          {rm.serviceCode}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{rm.shortDesc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
