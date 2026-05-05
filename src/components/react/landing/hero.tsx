"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Shield, Zap, ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/i18n/translations";

interface HeroProps {
    locale: Locale;
}

const translations = {
    en: {
        badge: "A CyberPath Product",
        title: "Bastion",
        tagline: "SOC as a Service",
        description: "Enterprise-grade security operations for small and medium businesses. Continuous monitoring, threat detection, and incident response—at a fraction of the cost of an in-house SOC.",
        cta: { primary: "Get Started", secondary: "View Pricing" },
    },
    it: {
        badge: "Un prodotto CyberPath",
        title: "Bastion",
        tagline: "SOC come Servizio",
        description: "Operazioni di sicurezza di livello enterprise per piccole e medie aziende. Monitoraggio continuo, rilevamento minacce e risposta agli incidenti—a una frazione del costo di un SOC interno.",
        cta: { primary: "Inizia Ora", secondary: "Vedi Prezzi" },
    },
};

function ParticleField() {
    const particles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 8,
        size: Math.random() * 4 + 2,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 0.6, 0],
                        scale: [0, 1, 0],
                        y: [0, -150],
                        x: [0, Math.random() * 60 - 30],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: p.delay,
                    }}
                    className="absolute bg-blue-400/40 rounded-full"
                    style={{
                        left: `${p.x}%`,
                        bottom: "10%",
                        width: p.size,
                        height: p.size,
                    }}
                />
            ))}
        </div>
    );
}

function FloatingShape({ className, delay = 0 }: { className?: string; delay?: number }) {
    return (
        <motion.div
            animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
            }}
            transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
            className={className}
        />
    );
}

function GradientMesh() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-200/50 via-blue-300/30 to-indigo-200/40 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    x: [0, -40, 0],
                    y: [0, 40, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -top-1/3 -right-1/4 w-[700px] h-[700px] bg-gradient-to-bl from-indigo-200/40 via-violet-200/30 to-blue-200/40 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    x: [0, 30, 0],
                    y: [0, -50, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                className="absolute -bottom-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-violet-200/30 to-blue-200/30 rounded-full blur-3xl"
            />
            
            {/* Subtle grid */}
            <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />
        </div>
    );
}

export function Hero({ locale }: HeroProps) {
    const t = translations[locale];
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 250], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
    const springY = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-white">
            <GradientMesh />
            <ParticleField />

            {/* Floating decorative elements */}
            <FloatingShape className="absolute top-[15%] right-[8%] w-16 h-16 border-2 border-blue-200/30 rounded-2xl" delay={0} />
            <FloatingShape className="absolute top-[25%] left-[5%] w-12 h-12 border-2 border-indigo-200/30 rounded-full" delay={1} />
            <FloatingShape className="absolute bottom-[30%] right-[12%] w-20 h-20 border-2 border-violet-200/20 rounded-3xl rotate-12" delay={2} />
            <FloatingShape className="absolute bottom-[20%] left-[8%] w-8 h-8 bg-blue-300/20 rounded-full" delay={0.5} />

            <motion.div
                style={{ y: springY, opacity, scale }}
                className="relative z-10 max-w-5xl mx-auto px-6 text-center"
            >
                {/* Badge with subtle animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-blue-100 shadow-sm mb-8"
                >
                    <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                    <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase">
                        {t.badge}
                    </span>
                </motion.div>

                {/* Main title - huge, bold, memorable */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="text-[clamp(4.5rem,14vw,11rem)] font-extrabold text-neutral-900 leading-[0.92] tracking-tight mb-1"
                >
                    {t.title}
                </motion.h1>

                {/* Tagline with accent color */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-blue-600 mb-6"
                >
                    {t.tagline}
                </motion.p>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="text-[clamp(1rem,1.3vw,1.25rem)] text-neutral-600 max-w-xl mx-auto leading-relaxed mb-12"
                >
                    {t.description}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        href={`/${locale}/pricing`}
                        className="group px-9 py-4.5 text-base font-bold text-white bg-neutral-900 rounded-full hover:bg-neutral-800 shadow-xl shadow-neutral-900/15 transition-all flex items-center gap-2"
                    >
                        {t.cta.primary}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.02 }}
                        href={`/${locale}/pricing`}
                        className="px-9 py-4.5 text-base font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                        {t.cta.secondary}
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest">Scroll</span>
                    <div className="w-6 h-10 rounded-full border-2 border-neutral-300 flex items-start justify-center p-1.5">
                        <motion.div className="w-1 h-2 bg-neutral-400 rounded-full" />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}