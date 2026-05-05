"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Locale } from "@/lib/i18n/translations";

interface PricingProps {
    locale: Locale;
}

const translations = {
    en: {
        title: "Pricing",
        subtitle: "Flexible plans",
        plans: {
            starter: {
                name: "Starter",
                description: "Perfect for micro businesses",
                price: "€490",
                period: "/month",
                features: [
                    "Basic SOC monitoring (business hours)",
                    "Monthly vulnerability scans",
                    "Email support",
                    "Quarterly security reports",
                    "Up to 10 endpoints",
                ],
                cta: "Start Free Trial",
            },
            professional: {
                name: "Professional",
                description: "Ideal for small businesses",
                price: "€990",
                period: "/month",
                features: [
                    "Extended SOC monitoring (7am-10pm)",
                    "Weekly vulnerability scans",
                    "Priority email & chat support",
                    "Monthly security reports",
                    "Up to 50 endpoints",
                    "Basic incident response",
                ],
                cta: "Start Free Trial",
            },
            enterprise: {
                name: "Enterprise",
                description: "For larger organizations",
                price: "Custom",
                period: "",
                features: [
                    "24/7 SOC monitoring",
                    "Real-time vulnerability scanning",
                    "Dedicated security analyst",
                    "Weekly security reports",
                    "Unlimited endpoints",
                    "Full incident response",
                    "Compliance assistance",
                ],
                cta: "Contact Sales",
            },
        },
        note: "* All prices exclude VAT.",
    },
    it: {
        title: "Prezzi",
        subtitle: "Piani flessibili",
        plans: {
            starter: {
                name: "Starter",
                description: "Perfetto per micro imprese",
                price: "€490",
                period: "/mese",
                features: [
                    "Monitoraggio SOC di base (orario lavorativo)",
                    "Scansioni mensili delle vulnerabilità",
                    "Supporto email",
                    "Report trimestrali sulla sicurezza",
                    "Fino a 10 endpoint",
                ],
                cta: "Inizia Trial Gratuito",
            },
            professional: {
                name: "Professional",
                description: "Ideale per piccole imprese",
                price: "€990",
                period: "/mese",
                features: [
                    "Monitoraggio SOC esteso (7-22)",
                    "Scansioni settimanali delle vulnerabilità",
                    "Supporto email e chat prioritario",
                    "Report mensili sulla sicurezza",
                    "Fino a 50 endpoint",
                    "Risposta base agli incidenti",
                ],
                cta: "Inizia Trial Gratuito",
            },
            enterprise: {
                name: "Enterprise",
                description: "Per organizzazioni più grandi",
                price: "Personalizzato",
                period: "",
                features: [
                    "Monitoraggio SOC 24/7",
                    "Scansione delle vulnerabilità in tempo reale",
                    "Analista di sicurezza dedicato",
                    "Report settimanali sulla sicurezza",
                    "Endpoint illimitati",
                    "Risposta completa agli incidenti",
                    "Assistenza conformità",
                ],
                cta: "Contatta le Vendite",
            },
        },
        note: "* I prezzi sono IVA esclusa.",
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
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
            {/* Accent lines */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-50" />
        </div>
    );
}

export function Pricing({ locale }: PricingProps) {
    const t = translations[locale];
    const plans = t.plans as Record<"starter" | "professional" | "enterprise", typeof translations.en.plans.starter>;
    const planKeys = ["starter", "professional", "enterprise"] as const;

    return (
        <section className="py-32 bg-neutral-50 relative overflow-hidden" id="pricing">
            <PricingBackground />

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.p variants={itemVariants} className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
                        {t.subtitle}
                    </motion.p>
                    <motion.h2 variants={itemVariants} className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-neutral-900">
                        {t.title}
                    </motion.h2>
                </motion.div>

                {/* Pricing cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {planKeys.map((key, idx) => {
                        const plan = plans[key];
                        const isHighlighted = key === "professional";

                        return (
                            <motion.div
                                key={key}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                variants={itemVariants}
                                className={`relative flex flex-col p-8 rounded-3xl transition-all hover:shadow-2xl ${
                                    isHighlighted
                                        ? "bg-neutral-900 text-white shadow-2xl scale-105 z-10"
                                        : "bg-white border border-neutral-200 shadow-lg"
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
                                    <h3 className={`text-xl font-bold mb-2 ${isHighlighted ? "text-white" : "text-neutral-900"}`}>
                                        {plan.name}
                                    </h3>
                                    <p className={`text-sm ${isHighlighted ? "text-neutral-400" : "text-neutral-500"}`}>
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-5xl font-extrabold ${isHighlighted ? "text-white" : "text-neutral-900"}`}>
                                            {plan.price}
                                        </span>
                                        <span className={`text-sm ${isHighlighted ? "text-neutral-400" : "text-neutral-500"}`}>
                                            {plan.period}
                                        </span>
                                    </div>
                                </div>

                                <ul className="flex-1 space-y-3 mb-8">
                                    {plan.features.map((feature: string, fIdx: number) => (
                                        <li key={fIdx} className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isHighlighted ? "bg-blue-500" : "bg-blue-100"}`}>
                                                <Check className={`w-3 h-3 ${isHighlighted ? "text-white" : "text-blue-600"}`} />
                                            </div>
                                            <span className={`text-sm ${isHighlighted ? "text-neutral-300" : "text-neutral-600"}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="#contact"
                                    className={`w-full py-4 rounded-full text-center font-bold transition-all hover:scale-105 ${
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
                    className="mt-12 text-center text-sm text-neutral-500"
                >
                    {t.note}
                </motion.p>
            </div>
        </section>
    );
}