"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Terminal,
  Cpu,
  Layers,
  ShieldCheck,
  Server,
  Zap,
  Box,
  RotateCcw,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import confetti from "canvas-confetti";
import { CloudRolesSection } from "@/components/roadmap/CloudRolesSection";

interface RoadmapStage {
  id: string;
  stageNumber: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  difficultyBadge: string;
  careerRelevance: string;
  icon: any;
  summary: string;
  topics: string[];
  recommendedModules: { name: string; slug: string }[];
}

export default function AWSLearningPathPage() {
  const roadmapStages: RoadmapStage[] = [
    {
      id: "stage-1",
      stageNumber: "01",
      title: "Cloud Fundamentals & Virtualization",
      category: "Foundations",
      difficulty: "Beginner",
      difficultyBadge: "bg-emerald-950/60 text-emerald-400 border-emerald-500/30",
      careerRelevance: "Cloud Engineer • Solutions Architect",
      icon: Layers,
      summary: "Understand distributed systems, multi-tenant cloud economics, client-server models, and CapEx vs OpEx principles.",
      topics: [
        "What is Cloud Computing & Global Infrastructure (Regions, AZs, Edge)",
        "Shared Responsibility Model",
        "Public vs Private vs Hybrid Clouds",
        "Virtualization, Hypervisors, and Hardware Abstraction",
      ],
      recommendedModules: [{ name: "Cloud Overview", slug: "ec2" }],
    },
    {
      id: "stage-2",
      stageNumber: "02",
      title: "AWS Identity, Security & IAM",
      category: "Core Security",
      difficulty: "Beginner",
      difficultyBadge: "bg-emerald-950/60 text-emerald-400 border-emerald-500/30",
      careerRelevance: "Cloud Security Engineer • Cloud Engineer",
      icon: ShieldCheck,
      summary: "Master the Principle of Least Privilege, root security, IAM users, groups, roles, policies, and MFA.",
      topics: [
        "AWS Root Account Hardening & MFA",
        "IAM Users, Groups, Roles & Policies (JSON format)",
        "Identity-based vs Resource-based Policies",
        "AWS STS (Security Token Service) & IAM Instance Profiles",
      ],
      recommendedModules: [{ name: "AWS IAM & Security", slug: "iam" }],
    },
    {
      id: "stage-3",
      stageNumber: "03",
      title: "Virtual Private Cloud (VPC) & Networking",
      category: "Networking",
      difficulty: "Beginner",
      difficultyBadge: "bg-emerald-950/60 text-emerald-400 border-emerald-500/30",
      careerRelevance: "Cloud Network Engineer • Cloud Architect",
      icon: Compass,
      summary: "Design isolated cloud network topologies with custom CIDRs, subnets, route tables, and gateways.",
      topics: [
        "CIDR IP Subnetting & IPv4/IPv6 allocation",
        "Public Subnets, Private Subnets, & Route Tables",
        "Internet Gateways (IGW) & NAT Gateways",
        "Security Groups (Stateful) vs Network ACLs (Stateless)",
        "VPC Peering, Endpoints, & PrivateLink",
      ],
      recommendedModules: [
        { name: "Amazon VPC", slug: "vpc" },
        { name: "Amazon CloudFront & Route 53", slug: "cloudfront-route53" },
      ],
    },
    {
      id: "stage-4",
      stageNumber: "04",
      title: "Elastic Compute (EC2) & Auto-Scaling",
      category: "Compute",
      difficulty: "Intermediate",
      difficultyBadge: "bg-blue-950/60 text-blue-400 border-blue-500/30",
      careerRelevance: "Cloud Systems Admin • Cloud Engineer",
      icon: Server,
      summary: "Launch virtual machines, configure AMIs, EBS storage volumes, Elastic Load Balancing, and Auto-Scaling groups.",
      topics: [
        "EC2 Instance Families (General, Compute, Memory, GPU)",
        "Amazon Machine Images (AMIs) & User Data Bootstrap scripts",
        "Application Load Balancer (ALB) & Target Groups",
        "Auto Scaling Groups (ASG) & Health Checks",
        "Spot Instances vs On-Demand vs Savings Plans",
      ],
      recommendedModules: [{ name: "Amazon EC2", slug: "ec2" }],
    },
    {
      id: "stage-5",
      stageNumber: "05",
      title: "Storage & Database Services",
      category: "Data Tier",
      difficulty: "Intermediate",
      difficultyBadge: "bg-blue-950/60 text-blue-400 border-blue-500/30",
      careerRelevance: "Cloud Data Engineer • Database Architect",
      icon: Layers,
      summary: "Manage scalable object storage in S3 and configure managed relational (RDS/Aurora) and NoSQL (DynamoDB) databases.",
      topics: [
        "Amazon S3 Buckets, Lifecycle Policies, & Versioning",
        "Amazon EBS Block Storage (gp3, io2) & EFS File Systems",
        "Amazon RDS Multi-AZ Failover & Read Replicas",
        "Amazon DynamoDB Partition/Sort Keys & Single Table Design",
      ],
      recommendedModules: [
        { name: "Amazon S3", slug: "s3" },
        { name: "Amazon RDS & Aurora", slug: "rds-aurora" },
        { name: "Amazon DynamoDB", slug: "dynamodb" },
      ],
    },
    {
      id: "stage-6",
      stageNumber: "06",
      title: "Serverless Microservices Architecture",
      category: "Modern Cloud",
      difficulty: "Intermediate",
      difficultyBadge: "bg-blue-950/60 text-blue-400 border-blue-500/30",
      careerRelevance: "Serverless Developer • Cloud Solutions Architect",
      icon: Zap,
      summary: "Eliminate server management using AWS Lambda, Amazon API Gateway, EventBridge, and DynamoDB Streams.",
      topics: [
        "AWS Lambda Function Handlers, Runtimes, & Cold Starts",
        "Amazon API Gateway REST & HTTP APIs with CORS",
        "EventBridge Buses & Event-Driven triggers",
        "Asynchronous Decoupling with Amazon SQS & SNS",
      ],
      recommendedModules: [{ name: "AWS Lambda", slug: "lambda" }],
    },
    {
      id: "stage-7",
      stageNumber: "07",
      title: "Containers & Kubernetes at Scale",
      category: "Containers",
      difficulty: "Advanced",
      difficultyBadge: "bg-purple-950/60 text-purple-400 border-purple-500/30",
      careerRelevance: "DevOps Engineer • Cloud SRE",
      icon: Box,
      summary: "Package applications in Docker containers and orchestrate microservices across Amazon ECS & EKS with AWS Fargate.",
      topics: [
        "Multi-stage Dockerfile builds & Amazon ECR registries",
        "Amazon ECS Task Definitions, Services, & Fargate Launch Types",
        "Amazon EKS Managed Control Plane & Worker Nodes",
        "Kubernetes Ingress, Helm Charts, & Horizontal Pod Autoscaler",
      ],
      recommendedModules: [{ name: "Amazon ECS & EKS", slug: "ecs-eks" }],
    },
    {
      id: "stage-8",
      stageNumber: "08",
      title: "DevOps & Infrastructure as Code (IaC)",
      category: "Automation",
      difficulty: "Advanced",
      difficultyBadge: "bg-purple-950/60 text-purple-400 border-purple-500/30",
      careerRelevance: "DevOps Engineer • Cloud Platform Engineer",
      icon: Terminal,
      summary: "Automate entire cloud environments with Terraform, AWS CDK, GitHub Actions, and GitOps pipelines.",
      topics: [
        "Declarative Infrastructure as Code with Terraform & AWS CDK",
        "Continuous Integration & Continuous Deployment (CI/CD) pipelines",
        "CloudWatch Dashboards, Alarms, & AWS X-Ray Distributed Tracing",
        "FinOps Cloud Cost Optimization & Budget Alerts",
      ],
      recommendedModules: [{ name: "AWS Glue & Analytics", slug: "glue-athena" }],
    },
    {
      id: "stage-9",
      stageNumber: "09",
      title: "Generative AI & Real-World Capstone",
      category: "Advanced Mastery",
      difficulty: "Expert",
      difficultyBadge: "bg-amber-950/60 text-amber-400 border-amber-500/30",
      careerRelevance: "Cloud ML Engineer • Senior Cloud Architect",
      icon: Sparkles,
      summary: "Architect production AI systems using Amazon Bedrock, SageMaker, Vector Databases, and deploy capstone projects.",
      topics: [
        "Amazon Bedrock Foundation Models (Claude 3.5, Llama 3)",
        "Retrieval-Augmented Generation (RAG) with Vector Databases",
        "Multi-Region Active-Active High Availability Architectures",
        "Real-World Production Capstone Deployment",
      ],
      recommendedModules: [{ name: "Amazon Bedrock & AI", slug: "bedrock-sagemaker" }],
    },
  ];

  const [completedStages, setCompletedStages] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sxc_aws_roadmap_progress");
      if (saved) {
        setCompletedStages(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const toggleStage = (stageId: string) => {
    let updated: string[];
    if (completedStages.includes(stageId)) {
      updated = completedStages.filter((id) => id !== stageId);
    } else {
      updated = [...completedStages, stageId];
      if (updated.length === roadmapStages.length) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#FF9900", "#0073BB", "#00E5FF", "#10B981"],
        });
      }
    }
    setCompletedStages(updated);
    try {
      localStorage.setItem("sxc_aws_roadmap_progress", JSON.stringify(updated));
    } catch (e) {}
  };

  const resetProgress = () => {
    setCompletedStages([]);
    try {
      localStorage.removeItem("sxc_aws_roadmap_progress");
    } catch (e) {}
  };

  const progressPercent = Math.round((completedStages.length / roadmapStages.length) * 100);

  const scrollToCareers = () => {
    const el = document.getElementById("cloud-roles");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      {/* ================= PART 1: AWS CLOUD ARCHITECT LEARNING PATH ================= */}
      <section className="max-w-[1750px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-8 pb-12">
        {/* 1. HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-aws-orange/15 text-aws-orange border border-aws-orange/30 shadow-lg shadow-aws-orange/5">
            <Compass className="w-3.5 h-3.5" />
            <span>INTERACTIVE CLOUD ROADMAP</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            AWS Cloud Architect <br />
            <span className="text-gradient-orange">Learning Path</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            A structured journey from cloud fundamentals to production-ready AWS architectures, DevOps, data, security and AI.
          </p>

          {/* Visual Indicator Underneath */}
          <div className="flex items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2 flex-wrap">
            <span className="flex items-center gap-1.5 text-white font-semibold">
              <span className="w-2 h-2 rounded-full bg-aws-orange" />
              <span>9 STAGES</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-white font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>HANDS-ON LABS</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-white font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>REAL-WORLD PROJECTS</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. ROADMAP TIMELINE & STAGE CARDS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative mb-20">
        <div className="relative border-l-2 border-aws-orange/30 ml-4 sm:ml-8 space-y-10 pb-6">
          {roadmapStages.map((stage) => {
            const Icon = stage.icon;
            const isCompleted = completedStages.includes(stage.id);

            return (
              <div key={stage.id} className="relative pl-8 sm:pl-10 group">
                {/* Checkbox Node on timeline */}
                <button
                  onClick={() => toggleStage(stage.id)}
                  className={`absolute -left-[14px] top-5 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isCompleted
                      ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 scale-110"
                      : "bg-navy-950 border-2 border-aws-orange text-aws-orange hover:bg-aws-orange hover:text-black"
                  }`}
                  title={isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4 stroke-[3]" /> : <Circle className="w-3.5 h-3.5" />}
                </button>

                {/* Stage Card */}
                <div
                  className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 backdrop-blur-xl shadow-xl ${
                    isCompleted
                      ? "bg-navy-900/90 border-emerald-500/40 shadow-emerald-950/20"
                      : "bg-navy-900/70 border-white/10 hover:border-aws-orange/45 hover:bg-navy-900/90"
                  }`}
                >
                  {/* Card Header: Stage Number, Category, Difficulty & Completion Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-navy-950 border border-white/15 flex items-center justify-center text-aws-orange shrink-0 shadow-inner">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono font-bold text-aws-orange uppercase tracking-wider">
                            STAGE {stage.stageNumber} • {stage.category}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${stage.difficultyBadge}`}>
                            {stage.difficulty}
                          </span>
                          {isCompleted && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                              ✓ COMPLETE
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 leading-snug">
                          {stage.title}
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleStage(stage.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all self-start sm:self-auto cursor-pointer ${
                        isCompleted
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40 shadow-md"
                          : "bg-navy-950 text-slate-300 border border-white/10 hover:border-aws-orange hover:text-aws-orange"
                      }`}
                    >
                      {isCompleted ? "✓ Stage Complete" : "+ Check Stage"}
                    </button>
                  </div>

                  {/* One-Line Purpose Summary */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                    {stage.summary}
                  </p>

                  {/* Career Relevance Indicator */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 mb-4">
                    <Briefcase className="w-3.5 h-3.5 text-aws-orange shrink-0" />
                    <span>Builds skills for: <strong className="text-white">{stage.careerRelevance}</strong></span>
                  </div>

                  {/* Key Competencies List */}
                  <div className="p-4 rounded-2xl bg-navy-950/80 border border-white/5 space-y-1.5 mb-4">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">
                      Key Competencies
                    </div>
                    {stage.topics.map((t, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <span className="text-aws-orange font-bold">•</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recommended Labs Links */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] font-mono text-slate-400">Recommended Labs:</span>
                    {stage.recommendedModules.map((rm, idx) => (
                      <Link
                        key={idx}
                        href={`/aws-modules/${rm.slug}`}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-aws-orange text-slate-300 hover:text-black text-xs font-mono border border-white/10 hover:border-aws-orange transition-all flex items-center gap-1"
                      >
                        <span>{rm.name}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= SECTION SEPARATOR / TRANSITION BRIDGE ================= */}
      <section className="max-w-[1750px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 my-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-950 to-navy-900 border-2 border-aws-orange/40 text-center shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-aws-orange/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-aws-orange/20 text-aws-orange border border-aws-orange/40 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>READY FOR THE NEXT STEP?</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            You&apos;ve explored the AWS cloud journey. <br />
            <span className="text-gradient-orange">Now discover where these skills can take you.</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2 mb-6">
            Understand industry demand, daily engineering responsibilities, and high-impact cloud career paths.
          </p>

          <button
            onClick={scrollToCareers}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-aws-orange to-amber-600 hover:from-amber-500 hover:to-aws-orange text-black font-bold text-xs font-mono shadow-xl shadow-aws-orange/20 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>EXPLORE CLOUD CAREERS</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ================= PART 2: CLOUD ROLES IN THE MARKET ================= */}
      <CloudRolesSection />
    </div>
  );
}
