"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Shield, Brain, Zap, Activity, Volume2,
  Search, Bell, Settings, ChevronRight,
  Clock, Database, ArrowRight, User,
  Layout, MessageSquare, Calendar, Folder,
  Maximize2, TrendingUp, DollarSign, Timer,
  Info, HelpCircle, ShieldAlert, CheckCircle,
  Plus, Users, Lock, Radio, MousePointer2,
  Cpu, Server, Terminal, Layers, Globe,
  Twitter, Github, MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

// Register Plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Types ---
interface Message {
  role: 'agent' | 'user';
  text: string;
  timestamp: string;
}

interface ExtractedItem {
  key: string;
  value: string;
  icon: string;
}

// --- Mock Data ---
const ACTIVE_SESSIONS = [
  { id: 1, title: 'Speak with Confidence', desc: 'Active bank scam investigation.', date: '27 Apr 2025', active: true, color: 'bg-indigo-100', text: 'text-indigo-600' },
  { id: 2, title: 'Master the Basics', desc: 'Gift card fraud decoy operation.', date: '30 Apr 2025', active: false, color: 'bg-orange-100', text: 'text-orange-600' },
  { id: 3, title: 'Sound Like a Native', desc: 'Mimic tech support tactics.', date: '02 May 2025', active: false, color: 'bg-emerald-100', text: 'text-emerald-600' }
];

const INTEL_MATRIX = [
  { key: 'SCAMMER NAME', value: 'Anugrah Kashyap', icon: 'AK' },
  { key: 'UPI ID', value: 'anugrah@okhdfcbank', icon: 'UP' },
  { key: 'LOCATION', value: 'Delhi, India', icon: 'IN' },
  { key: 'BRANCH', value: 'State Bank of India', icon: 'SB' }
];

const FEATURES = [
  { title: 'Neural Intercept', desc: 'Real-time packet sniffing and decryption of scam calls.', icon: Radio, color: 'bg-indigo-500' },
  { title: 'Intel Extraction', desc: 'Automatic identification of names, banking IDs, and locations.', icon: Brain, color: 'bg-purple-500' },
  { title: 'Threat Scoring', desc: 'AI-driven assessment of danger levels in active sessions.', icon: ShieldAlert, color: 'bg-rose-500' },
  { title: 'Fatigue Monitoring', desc: 'Tracks scammer frustration levels to optimize baiting.', icon: Activity, color: 'bg-emerald-500' },
  { title: 'Ledger Protection', desc: 'Ensures no real funds are ever transferred or compromised.', icon: Lock, color: 'bg-amber-500' },
  { title: 'Global Database', desc: 'Syncs scamer profiles across the community network.', icon: Database, color: 'bg-blue-500' }
];

// --- Particle Background ---
const ParticleBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <svg width="100%" height="100%" className="absolute inset-0">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-indigo-400 rounded-full"
        initial={{ opacity: 0, x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
          x: (Math.random() - 0.5) * 100 + "%",
          y: (Math.random() - 0.5) * 100 + "%",
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

// --- Toast Component ---
const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-4 border border-white/10"
  >
    <span>{message}</span>
    <button onClick={onClose} className="hover:text-amber-400">✕</button>
  </motion.div>
);

// --- Sub-Components ---

const StatPill = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <div className={`flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-slate-100`}>
    <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white shadow-lg`}>
      <Icon size={14} />
    </div>
    <div className="flex flex-col">
      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      <span className="text-sm font-black text-slate-800 tracking-tight">{value}</span>
    </div>
  </div>
);

const SectionTitle = ({ title, subtitle, light = false }: { title: string, subtitle: string, light?: boolean }) => (
  <div className="mb-16">
    <h1 className={`text-6xl lg:text-7xl font-black ${light ? 'text-white' : 'text-slate-800'} tracking-tighter mb-4`}>{title}</h1>
    <p className={`text-xs font-black ${light ? 'text-white/40' : 'text-slate-400'} uppercase tracking-[0.4em]`}>{subtitle}</p>
  </div>
);

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const protocolRef = useRef<HTMLDivElement>(null);
  const dashPreviewRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (e: React.MouseEvent) => {
    e.preventDefault();
    setToast("Coming Soon :: System Alpha");
  };

  useEffect(() => {
    setMounted(true);
    if (!containerRef.current) return;

    // GSAP Animations
    const ctx = gsap.context(() => {

      // Hero Text Reveal
      gsap.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.2
      });

      // Floating Blobs Parallax
      gsap.to(".blob-1", {
        y: -300,
        scrollTrigger: { trigger: ".blob-1", scrub: 1 }
      });
      gsap.to(".blob-2", {
        y: 300,
        scrollTrigger: { trigger: ".blob-2", scrub: 1.5 }
      });

      // Features Fly-in
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      });

      // Dashboard Preview Pin & Animation
      ScrollTrigger.create({
        trigger: dashPreviewRef.current,
        start: "top top",
        end: "+=1500",
        pin: true,
        scrub: 1,
      });

      gsap.from(".dash-element", {
        scrollTrigger: {
          trigger: dashPreviewRef.current,
          start: "top center",
          scrub: 1,
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.2
      });

      // Floating Loop for Hero Cards
      gsap.to(".hero-card-float", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
          each: 0.5,
          from: "random"
        }
      });

      // Background & Text Color Shift for Support Section
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: supportRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
        backgroundColor: "#1e1e1e",
        color: "#ffffff"
      });

      // Specific color shift for the Support Heading
      gsap.fromTo(".support-heading",
        { color: "#1e293b" },
        {
          scrollTrigger: {
            trigger: supportRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
          color: "#ffffff"
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!mounted) return null;

  return (
    <main ref={containerRef} className="w-full bg-[#F8FAFC] overflow-x-hidden selection:bg-indigo-500 selection:text-white">

      {/* KINETIC BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <ParticleBackground />
        <div className="blob-1 absolute -top-20 -left-20 w-[600px] h-[600px] bg-indigo-200/30 blur-[120px] rounded-full"></div>
        <div className="blob-2 absolute top-[40%] -right-20 w-[500px] h-[500px] bg-purple-200/30 blur-[100px] rounded-full"></div>
        <div className="blob-3 absolute -bottom-20 left-[20%] w-[700px] h-[700px] bg-emerald-100/30 blur-[150px] rounded-full"></div>
      </div>

      {/* HEADER / NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full p-6 lg:p-10 flex justify-between items-center z-50">
        <div className="flex items-center gap-3 bg-white/50 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white shadow-sm">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg">
            <Shield size={18} strokeWidth={2.5} />
          </div>
          <span className="text-sm font-black tracking-tighter uppercase text-slate-800">Vigilante AI</span>
        </div>
        <div className="hidden lg:flex bg-white/50 backdrop-blur-xl px-8 py-3 rounded-full border border-white shadow-sm gap-8">
          {['Home', 'Features', 'Dashboard', 'Support'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-indigo-600 transition-all">{item}</a>
          ))}
        </div>
        <Link href="/console" className="px-8 py-4 bg-slate-900 text-white rounded-full text-[10px] font-black tracking-widest uppercase hover:scale-105 hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10">Launch Console</Link>
      </nav>

      <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center p-6 lg:p-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* LEFT SIDE: TYPOGRAPHY */}
          <div className="col-span-12 lg:col-span-7 order-1 lg:order-1 pt-12 lg:translate-x-[5%]">
            <div className="hero-text mb-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-50 border border-indigo-100 rounded-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
                <span className="text-[9px] font-black text-indigo-600 tracking-[0.3em] uppercase">System-01 :: Operational</span>
              </div>
            </div>

            <div className="relative">
              <h1 className="hero-text text-[10vw] lg:text-[7.5vw] font-black text-slate-900 leading-[0.8] tracking-tighter mb-10">
                STRIKE <br />
                <span className="inline-block translate-x-12 lg:translate-x-24 text-indigo-600 relative">
                  BACK
                  <div className="absolute -bottom-4 left-0 w-full h-[0.1em] bg-indigo-600"></div>
                </span>
              </h1>
            </div>

            <p className="hero-text max-w-xl text-lg lg:text-xl font-bold text-slate-400 leading-relaxed mb-12">
              The primary intercept protocol for autonomous scam neutralization. We don't just block; we dismantle.
            </p>

            <div className="hero-text flex flex-wrap gap-8 items-center">
              <Link href="/console" className="group px-12 py-6 bg-slate-900 text-white rounded-full font-black text-sm uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:scale-105 transition-all flex items-center">
                Initialize <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
              <div className="flex -space-x-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-50 bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-slate-50 bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black">+42k</div>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Vigilantes</span>
            </div>
          </div>

          {/* RIGHT SIDE: CARDS */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center items-center lg:items-start relative perspective-1000 order-2 lg:order-2 mt-20 lg:mt-0 lg:translate-x-[-15%]">
            <div className="relative w-full max-w-[400px]">
              {/* CARD STACK */}
              <div className="hero-card-float hero-text w-full max-w-[320px] bg-white p-8 rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/50 -rotate-3 translate-y-[-10%] backdrop-blur-xl bg-white/80 z-30 relative mx-auto lg:mr-0">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest">Spectral Audio</span>
                  <Volume2 size={14} className="text-indigo-400" />
                </div>
                <div className="flex items-end gap-1 h-12 mb-4">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-indigo-600 rounded-full"
                      animate={{ height: [10, 40, 15, 30, 12] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                    />
                  ))}
                </div>
                <div className="text-xl font-black text-slate-800 tracking-tight leading-none">DECRYPTING...</div>
              </div>

              <div className="hero-card-float hero-text w-full max-w-[280px] bg-white p-8 rounded-[2rem] border border-white shadow-xl shadow-slate-200/40 rotate-12 lg:translate-x-24 translate-y-20 backdrop-blur-xl bg-white/70 z-20 absolute top-0 left-0 lg:left-auto lg:right-0 mx-auto lg:mr-0">
                <div className="flex justify-between items-center mb-6">
                  <Radio size={14} className="text-emerald-500" />
                  <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Packet Trace</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded mb-2"></div>
                <div className="h-2 w-3/4 bg-slate-100 rounded mb-6"></div>
                <div className="text-sm font-black text-slate-800">IP: 192.168.1.1</div>
                <div className="text-[10px] font-bold text-emerald-500 uppercase mt-1 tracking-tighter">Locating Scamer</div>
              </div>

              <div className="hero-card-float hero-text w-full max-w-[260px] bg-slate-900 p-8 rounded-[2rem] shadow-2xl rotate-[-12deg] lg:translate-x-[-15%] translate-y-[110%] lg:translate-y-[80%] z-10 absolute top-0 left-0 lg:left-auto lg:right-0 mx-auto lg:mr-0 text-white">
                <div className="flex justify-between items-center mb-6">
                  <Zap size={14} className="text-amber-400 fill-amber-400" />
                  <Activity size={14} className="text-white/40" />
                </div>
                <div className="text-[8px] font-black text-white/40 uppercase mb-2">Threat Score</div>
                <div className="text-3xl font-black tracking-tighter">88.4</div>
                <div className="mt-4 flex gap-1">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-1 flex-1 bg-white/20 rounded"></div>)}
                  <div className="h-1 flex-1 bg-amber-400 rounded"></div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block absolute -top-12 -right-12 text-[15vw] font-black text-slate-100/60 -z-10 select-none pointer-events-none">AI</div>
          </div>

        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section id="features" ref={featuresRef} className="min-h-screen py-32 px-10 lg:px-24">
        <SectionTitle title="Neural Core" subtitle="Advanced Interception Capabilities" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card bg-white p-12 rounded-[3.5rem] border border-white shadow-xl shadow-slate-200/50 flex flex-col hover:shadow-2xl transition-all group">
              <div className={`w-16 h-16 rounded-[1.5rem] ${f.color} flex items-center justify-center text-white mb-10 shadow-xl shadow-${f.color.split('-')[1]}-500/30 group-hover:scale-110 transition-transform`}>
                <f.icon size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-6">{f.title}</h3>
              <p className="text-base font-bold text-slate-400 leading-relaxed">{f.desc}</p>
              <div className="mt-auto pt-10 flex items-center gap-2 text-indigo-600">
                <span className="text-xs font-black uppercase tracking-widest">Learn More</span>
                <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DASHBOARD PREVIEW (PINNED) */}
      <section id="dashboard" ref={dashPreviewRef} className="min-h-screen bg-[#F0F4F8] flex items-center justify-center overflow-hidden py-24">
        <div className="container mx-auto px-10 grid grid-cols-12 gap-16 items-center">
          <div className="col-span-12 lg:col-span-5">
            <SectionTitle title="The Console" subtitle="Command & Control Interface" />
            <p className="text-xl font-bold text-slate-500 leading-relaxed mb-10">
              Manage multiple intercepts simultaneously through a unified glassmorphic interface. Real-time metrics, live audio translation, and automatic PII masking.
            </p>
            <div className="space-y-6">
              {[
                { t: 'Live Audio Stream', i: Volume2 },
                { t: 'UPI Extraction', i: DollarSign },
                { t: 'Location Mapping', i: Database }
              ].map((item, i) => (
                <div key={i} className="dash-element flex items-center gap-6 p-6 bg-white/50 backdrop-blur-md rounded-[2rem] border border-white">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm"><item.i size={20} /></div>
                  <span className="text-lg font-black text-slate-800">{item.t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 relative">
            <div className="dash-element bg-white p-6 rounded-[3rem] shadow-2xl border border-white relative z-10 scale-110 rotate-3 translate-x-10">
              <header className="flex justify-between items-center mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Vigilante-OS v.Alpha</span>
              </header>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-3xl">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Threat Level</h4>
                  <div className="w-32 h-32 rounded-full border-[10px] border-indigo-600 flex items-center justify-center mb-2">
                    <span className="text-2xl font-black font-slate-800">88%</span>
                  </div>
                </div>
                <div className="bg-[#1e1e1e] p-6 rounded-3xl text-white">
                  <h4 className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-4">Intercept Log</h4>
                  <div className="space-y-3 opacity-50">
                    <div className="h-2 w-full bg-white/10 rounded"></div>
                    <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                    <div className="h-2 w-1/2 bg-white/10 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="mt-6 bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg animate-pulse"></div>
                  <span className="text-xs font-black text-indigo-800 uppercase tracking-widest">Active Intercept</span>
                </div>
                <TrendingUp size={16} className="text-indigo-600" />
              </div>
            </div>

            {/* Decorative background cards */}
            <div className="absolute top-0 right-0 w-full h-full bg-indigo-500 rounded-[3rem] blur-2xl opacity-10 rotate-6 translate-y-10"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white rounded-[2.5rem] shadow-xl border border-white z-0 rotate-12 opacity-50"></div>
          </div>
        </div>
      </section>

      <section id="features" ref={protocolRef} className="min-h-screen py-32 flex flex-col items-center justify-center px-10 relative">
        <div className="max-w-7xl mx-auto w-full">
          <SectionTitle title="The Protocol" subtitle="Internal Logic & Architecture" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: 'Neural Engine', d: 'Proprietary LLM trained on 10M+ scam transcripts to predict and manipulate scammer behavior.', i: Cpu, c: 'text-indigo-500' },
              { t: 'Packet Sniffer', d: 'Industrial-grade deep packet inspection to trace the source of calls and UPI transactions.', i: Server, c: 'text-emerald-500' },
              { t: 'PII Shield', d: 'Military-grade encryption layer that automatically masks your voice and sensitive data.', i: Lock, c: 'text-rose-500' },
              { t: 'Live Terminal', d: 'Low-latency console streaming intercepted data directly to your dashboard.', i: Terminal, c: 'text-amber-500' },
              { t: 'Multi-Layer AI', d: 'A cascade of specialized models handling extraction, sentiment, and decoy logic.', i: Layers, c: 'text-purple-500' },
              { t: 'Global Sync', d: 'Decentralized database sharing scammer fingerprints with our global vigilante network.', i: Globe, c: 'text-blue-500' }
            ].map((box, i) => {
              const BoxIcon = box.i;
              return (
                <div key={i} className="protocol-box group p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
                  <div className={`w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center ${box.c} mb-8 shadow-inner`}>
                    <BoxIcon size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-4">{box.t}</h3>
                  <p className="text-slate-400 font-bold leading-relaxed">{box.d}</p>
                  <div className="mt-8 pt-8 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Protocol v4.2</span>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-2 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SUPPORT SECION */}
      <section id="support" ref={supportRef} className="min-h-screen py-32 flex flex-col items-center justify-center px-10 text-center relative">
        <div className="max-w-6xl space-y-24">
          <div className="space-y-6">
            <h2 className="support-heading text-7xl lg:text-[10vw] font-black leading-none tracking-tighter mb-4">HELP US <br /> <span className="opacity-30">END SCAMS.</span></h2>
            <p className="text-xl font-bold text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Vigilante AI is a community-driven project. Every report and every intercept helps secure the digital world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3.5rem] flex flex-col items-center group hover:bg-white/10 transition-all cursor-pointer">
              <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <HelpCircle size={40} className="text-indigo-400" />
              </div>
              <h3 className="text-3xl font-black mb-4">Support Center</h3>
              <p className="opacity-40 font-bold mb-8 text-center max-w-xs leading-relaxed">Access our safety guides, technical docs, and community forums.</p>
              <button onClick={showToast} className="px-10 py-4 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest group-hover:scale-110 transition-transform">Explore Docs</button>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3.5rem] flex flex-col items-center group hover:bg-white/10 transition-all cursor-pointer">
              <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ShieldAlert size={40} className="text-rose-400" />
              </div>
              <h3 className="text-3xl font-black mb-4">Report Fraud</h3>
              <p className="opacity-40 font-bold mb-8 text-center max-w-xs leading-relaxed">Direct pipe to report scam numbers, UPI IDs, and fraudulent patterns.</p>
              <button onClick={showToast} className="px-10 py-4 bg-rose-500 text-white rounded-full font-black text-xs uppercase tracking-widest group-hover:scale-110 transition-transform">Report Now</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full bg-[#050505] border-t border-white/5 pt-20 pb-12 px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-y-12 lg:gap-x-12">
          {/* Logo & Brand */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <Shield size={32} className="text-indigo-500" />
              <span className="text-2xl font-black tracking-tighter text-white uppercase">Vigilante AI</span>
            </div>
            <p className="text-white/30 font-bold leading-relaxed max-w-sm">
              The world's first autonomous scam neutralization protocol. Built by vigilantes, for the community.
            </p>
            <div className="flex gap-4">
              {[
                { id: 'Twitter', icon: Twitter },
                { id: 'GitHub', icon: Github },
                { id: 'Discord', icon: MessageSquare }
              ].map(social => (
                <button key={social.id} onClick={showToast} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:border-indigo-500/50 group">
                  <social.icon size={18} className="text-white/40 group-hover:text-indigo-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-6 lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest opacity-30">Platform</h4>
            <ul className="space-y-4">
              {['Console', 'Network', 'Metrics', 'Safety'].map(l => (
                <li key={l}><a href="#" onClick={showToast} className="text-sm font-bold text-white/30 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest opacity-30">Resources</h4>
            <ul className="space-y-4">
              {['Guides', 'Whitepaper', 'Community', 'Status'].map(l => (
                <li key={l}><a href="#" onClick={showToast} className="text-sm font-bold text-white/30 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-10">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest opacity-30">Join the Protocol</h4>
              <p className="text-sm font-bold text-white/30">Get notified when we go live globally with version 1.0.</p>
            </div>
            <div className="flex gap-2">
              <input type="email" placeholder="email@address.com" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold outline-none focus:border-indigo-500 transition-all flex-1" />
              <button onClick={showToast} className="bg-indigo-600 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-colors">Join</button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-16 mt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">© 2026 Vigilante Protocol. All Rights Reserved.</span>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
              <a key={link} href="#" onClick={showToast} className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] hover:text-white transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* TOAST SYSTEM */}
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #F8FAFC; color: #1e1e1e; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}
