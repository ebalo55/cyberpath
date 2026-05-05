"use client";

import { motion } from "framer-motion";
import { Check, Shield, Zap, Building } from "lucide-react";
import type { Locale } from "@/lib/i18n/translations";

interface PricingProps {
    locale: Locale;
}

const translations = {
    en: {
        title: "Simple, Transparent Pricing",
        subtitle: "Choose the plan that fits your business",
        plans: {
            scudo: {
                name: "SCUDO",
                description: "For micro businesses starting their security journey",
                price: "€190",
                period: "/month",
                endpoints: "5 endpoints included",
                features: [
                    "24/7 SOC monitoring",
                    "Monthly vulnerability scans",
                    "Quarterly security reports",
                    "Email & chat support",
                    "Incident alert notifications",
                    "Compliance assistance",
                ],
                cta: "Start Free Trial",
            },
            fortezza: {
                name: "FORTEZZA",
                description: "For small businesses requiring comprehensive protection",
                price: "€400",
                period: "/month",
                endpoints: "10 endpoints included",
                features: [
                    "24/7 SOC monitoring",
                    "Weekly vulnerability scans",
                    "Monthly security reports",
                    "Priority support",
                    "Incident response guidance",
                    "Regulatory compliance help",
                    "Threat hunting on request",
                ],
                cta: "Start Free Trial",
            },
            bastione: {
                name: "BASTIONE",
                description: "For businesses needing full-scale security operations",
                price: "€750",
                period: "/month",
                endpoints: "15 endpoints included",
                features: [
                    "24/7 SOC priority monitoring",
                    "Real-time vulnerability scanning",
                    "Weekly security reports",
                    "Dedicated security analyst",
                    "Full incident response",
                    "Proactive threat hunting",
                    "Custom compliance reporting",
                ],
                cta: "Start Free Trial",
            },
        },
        note: "* All prices exclude VAT. Endpoint packages available for additional devices.",
    },
    it: {
        title: "Prezzi Semplici e Trasparenti",
        subtitle: "Scegli il piano che si adatta alla tua azienda",
        plans: {
            scudo: {
                name: "SCUDO",
                description: "Per micro aziende che iniziano il percorso di sicurezza",
                price: "€190",
                period: "/mese",
                endpoints: "5 endpoint inclusi",
                features: [
                    "Monitoraggio SOC 24/7",
                    "Scansioni mensili delle vulnerabilità",
                    "Report trimestrali sulla sicurezza",
                    "Supporto email e chat",
                    "Notifiche di alert sugli incidenti",
                    "Assistenza conformità",
                ],
                cta: "Inizia Trial Gratuito",
            },
            fortezza: {
                name: "FORTEZZA",
                description: "Per piccole aziende che richiedono protezione completa",
                price: "€400",
                period: "/mese",
                endpoints: "10 endpoint inclusi",
                features: [
                    "Monitoraggio SOC 24/7",
                    "Scansioni settimanali delle vulnerabilità",
                    "Report mensili sulla sicurezza",
                    "Supporto prioritario",
                    "Guida alla risposta agli incidenti",
                    "Aiuto per la conformità normativa",
                    "Threat hunting su richiesta",
                ],
                cta: "Inizia Trial Gratuito",
            },
            bastione: {
                name: "BASTIONE",
                description: "Per aziende che necessitano di operazioni di sicurezza complete",
                price: "€750",
                period: "/mese",
                endpoints: "15 endpoint inclusi",
                features: [
                    "Monitoraggio SOC prioritario 24/7",
                    "Scansione delle vulnerabilità in tempo reale",
                    "Report settimanali sulla sicurezza",
                    "Analista di sicurezza dedicato",
                    "Risposta completa agli incidenti",
                    "Threat hunting proattivo",
                    "Report sulla conformità personalizzati",
                ],
                cta: "Inizia Trial Gratuito",
            },
        },
        note: "* I prezzi sono IVA esclusi. Pacchetti endpoint disponibili per dispositivi aggiuntivi.",
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

function PricingBackground() {
    return (
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <motion.div
                animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px]"
            />
            <motion.div
                animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px]"
            />
        </div>
    );
}

export function Pricing({ locale }: PricingProps) {
    const t = translations[locale];
    const plans = t.plans as Record<"scudo" | "fortezza" | "bastione", typeof translations.en.plans.scudo>;
    const planKeys = ["scudo", "fortezza", "bastione"] as const;

    const icons = {
        scudo: Shield,
        fortezza: Zap,
        bastione: Building,
    };

    return (
        <section className="py-32 bg-white relative overflow-hidden" id="pricing">
            <PricingBackground />

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.p variants={itemVariants} className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">
                        {t.subtitle}
                    </motion.p>
                    <motion.h2 variants={itemVariants} className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-neutral-900">
                        {t.title}
                    </motion.h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {planKeys.map((key, idx) => {
                        const plan = plans[key];
                        const Icon = icons[key];
                        const isHighlighted = key === "fortezza";

                        return (
                            <motion.div
                                key={key}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                variants={itemVariants}
                                className={`relative flex flex-col p-6 lg:p-8 rounded-2xl transition-all duration-300 ${
                                    isHighlighted
                                        ? "bg-neutral-900 text-white shadow-2xl scale-[1.02] z-10"
                                        : "bg-white border border-neutral-200 shadow-lg hover:shadow-xl"
                                }`}
                            >
                                {isHighlighted && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="px-4 py-1.5 bg-blue-500 text-white text-xs font-bold rounded-full">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                                        isHighlighted ? "bg-blue-500/20" : "bg-blue-50"
                                    }`}>
                                        <Icon className={`w-6 h-6 ${isHighlighted ? "text-blue-400" : "text-blue-600"}`} />
                                    </div>
                                    <h3 className={`text-xl font-bold mb-2 ${isHighlighted ? "text-white" : "text-neutral-900"}`}>
                                        {plan.name}
                                    </h3>
                                    <p className={`text-sm ${isHighlighted ? "text-neutral-400" : "text-neutral-500"}`}>
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="mb-2">
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-4xl lg:text-5xl font-extrabold ${isHighlighted ? "text-white" : "text-neutral-900"}`}>
                                            {plan.price}
                                        </span>
                                        <span className={`text-sm ${isHighlighted ? "text-neutral-400" : "text-neutral-500"}`}>
                                            {plan.period}
                                        </span>
                                    </div>
                                    <p className={`text-xs mt-2 ${isHighlighted ? "text-blue-400" : "text-blue-600"}`}>
                                        {plan.endpoints}
                                    </p>
                                </div>

                                <ul className="flex-1 space-y-3 my-6">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                                isHighlighted ? "bg-blue-500" : "bg-blue-100"
                                            }`}>
                                                <Check className={`w-3 h-3 ${isHighlighted ? "text-white" : "text-blue-600"}`} />
                                            </div>
                                            <span className={`text-sm ${isHighlighted ? "text-neutral-300" : "text-neutral-600"}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="#reservation"
                                    className={`w-full py-4 rounded-full text-center font-bold transition-all hover:scale-[1.02] ${
                                        isHighlighted
                                            ? "bg-white text-neutral-900 hover:bg-neutral-100"
                                            : "bg-neutral-900 text-white hover:bg-neutral-800"
                                    }`}
                                >
                                    {plan.cta}
                                </a>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-10 text-center text-sm text-neutral-500"
                >
                    {t.note}
                </motion.p>
            </div>
        </section>
    );
}