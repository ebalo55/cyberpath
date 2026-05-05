"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Zap, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n/translations";

interface ServicesProps {
    locale: Locale;
}

const translations = {
    en: {
        subtitle: "Our Services",
        title: "Comprehensive cybersecurity solutions",
        description: "24/7 security operations center with expert analysts monitoring your infrastructure, detecting threats, and responding to incidents in real-time.",
        features: {
            title: "What's Included",
            items: [
                { icon: Eye, label: "24/7 SOC Monitoring" },
                { icon: AlertTriangle, label: "Threat Detection & Hunting" },
                { icon: Zap, label: "Incident Response" },
                { icon: Shield, label: "Vulnerability Assessment" },
                { icon: FileText, label: "Security Reporting" },
                { icon: CheckCircle, label: "Compliance Assistance" },
            ],
        },
    },
    it: {
        subtitle: "I Nostri Servizi",
        title: "Soluzioni di cybersecurity complete",
        description: "Centro operativo di sicurezza 24/7 con analisti esperti che monitorano la tua infrastruttura, rilevano minacce e rispondono agli incidenti in tempo reale.",
        features: {
            title: "Cosa Include",
            items: [
                { icon: Eye, label: "Monitoraggio SOC 24/7" },
                { icon: AlertTriangle, label: "Rilevamento e caccia alle minacce" },
                { icon: Zap, label: "Risposta agli incidenti" },
                { icon: Shield, label: "Valutazione delle vulnerabilità" },
                { icon: FileText, label: "Reportistica sulla sicurezza" },
                { icon: CheckCircle, label: "Assistenza conformità" },
            ],
        },
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

function AnimatedShapes() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-20 right-[10%] w-40 h-40 border border-blue-200/50 rounded-2xl"
            />
            <motion.div
                animate={{ scale: [1.2, 1, 1.2], rotate: [180, 90, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-40 left-[5%] w-24 h-24 border border-indigo-200/40 rounded-full"
            />
            <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-32 right-[20%] w-4 h-4 bg-blue-400/20 rounded-full"
            />
            <motion.div
                animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-[25%] w-2 h-2 bg-violet-400/30 rounded-full"
            />
        </div>
    );
}

export function Services({ locale }: ServicesProps) {
    const t = translations[locale];

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <AnimatedShapes />

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="text-center mb-20"
                >
                    <motion.p variants={itemVariants} className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
                        {t.subtitle}
                    </motion.p>
                    <motion.h2 variants={itemVariants} className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-neutral-900">
                        {t.title}
                    </motion.h2>
                </motion.div>

                {/* Main service card */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="relative max-w-4xl mx-auto"
                >
                    {/* Decorative elements */}
                    <motion.div
                        variants={itemVariants}
                        className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-2xl -z-10"
                    />
                    <motion.div
                        variants={itemVariants}
                        className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-100 rounded-full -z-10"
                    />

                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-3xl border border-neutral-200 shadow-xl p-8 md:p-12"
                    >
                        {/* Card header */}
                        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                                <Shield className="w-10 h-10 text-white" />
                            </div>
                            <div className="flex-1">
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-2">
                                    SOCaaS
                                </span>
                                <h3 className="text-3xl font-bold text-neutral-900">Bastion</h3>
                            </div>
                            <a
                                href={`/${locale}/pricing`}
                                className="group px-6 py-3 bg-neutral-900 text-white rounded-full font-bold hover:bg-neutral-800 transition-all hover:scale-105"
                            >
                                <span className="flex items-center gap-2">
                                    {t.features.title}
                                    <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </span>
                            </a>
                        </div>

                        <p className="text-lg text-neutral-600 mb-10 max-w-2xl">
                            {t.description}
                        </p>

                        {/* Features grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {t.features.items.map((feature: { icon: typeof Shield; label: string }, idx: number) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.03, y: -4 }}
                                    className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-100"
                                >
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                        <feature.icon className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="font-semibold text-neutral-700">{feature.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}