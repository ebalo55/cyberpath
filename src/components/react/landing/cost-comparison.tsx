"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight, TrendingDown, TrendingUp, DollarSign } from "lucide-react";
import type { Locale } from "@/lib/i18n/translations";

interface CostComparisonProps {
    locale: Locale;
}

const translations = {
    en: {
        title: "Cost Comparison",
        subtitle: "How much would it cost to have the same level of visibility with a dedicated security team?",
        description: "For many businesses, building internally or purchasing separate monitoring, analysis tools and reports would mean much higher costs.",
        traditional: {
            title: "Traditional Approach",
            items: [
                "Dedicated cybersecurity consultant or team",
                "Separate monitoring and analysis tools",
                "Setup, management and maintenance costs", 
                "Coordination with IT, compliance and vendors",
                "Higher time and costs for continuous visibility",
            ],
            price: "€2,000 - €6,000+",
            period: "/month",
            note: "Variable based on provider, assets, services.",
        },
        bastion: {
            title: "CyberPath Bastion",
            subtitle: "Continuous visibility, more accessible",
            items: [
                "Continuous monitoring of main risk signals",
                "Alerts, reports and evidence in one service",
                "Light and progressive activation",
                "No internal cyber structure to build",
                "More control with sustainable costs",
            ],
            price: "€150",
            period: "/month",
            note: "Cost varies by structure and devices.",
            savings: "Save up to 80-95%",
        },
        cta: "Discover if Bastion is right for you →",
        disclaimer: "* Comparison is indicative. Real costs may vary.",
    },
    it: {
        title: "Confronto Costi",
        subtitle: "Quanto costerebbe avere lo stesso livello di visibilità con un team dedicato?",
        description: "Per molte aziende, costruire internamente o acquistare separatamente questi servizi significherebbe costi molto più alti.",
        traditional: {
            title: "Approccio Tradizionale",
            items: [
                "Consulente o team cybersecurity dedicato",
                "Strumenti di monitoraggio e analisi separati",
                "Costi di setup, gestione e manutenzione", 
                "Coordinamento con IT, compliance e fornitori",
                "Tempi e costi più elevati per visibilità",
            ],
            price: "€2.000 - €6.000+",
            period: "/mese",
            note: "Variabile in base a fornitore, asset, servizi.",
        },
        bastion: {
            title: "CyberPath Bastion",
            subtitle: "Visibilità continua, più accessibile",
            items: [
                "Monitoraggio continuo dei principali segnali di rischio",
                "Alert, report ed evidenze in un servizio",
                "Attivazione leggera e progressiva",
                "Nessuna struttura cyber interna",
                "Più controllo con costi sostenibili",
            ],
            price: "€150",
            period: "/mese",
            note: "Il costo varia per struttura e dispositivi.",
            savings: "Risparmia fino al 80-95%",
        },
        cta: "Scopri se Bastion è adatto a te →",
        disclaimer: "* Confronto indicativo. I costi reali possono variare.",
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 },
};

function AnimatedOrbs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-60"
            />
            <motion.div
                animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-100 to-violet-100 rounded-full blur-3xl opacity-50"
            />
        </div>
    );
}

function PriceTag({ price, period, large }: { price: string; period: string; large?: boolean }) {
    return (
        <div className="flex items-baseline gap-1">
            <DollarSign className={`${large ? 'w-6 h-6' : 'w-4 h-4'} text-neutral-400`} />
            <span className={`${large ? 'text-5xl' : 'text-3xl'} font-extrabold text-neutral-900`}>
                {price}
            </span>
            <span className="text-sm text-neutral-500">{period}</span>
        </div>
    );
}

export function CostComparison({ locale }: CostComparisonProps) {
    const t = translations[locale];

    return (
        <section className="relative py-28 bg-neutral-50 overflow-hidden" id="pricing">
            <AnimatedOrbs />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.p variants={itemVariants} className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">
                        {t.subtitle}
                    </motion.p>
                    <motion.h2 variants={itemVariants} className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-neutral-900 mb-4">
                        {t.title}
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-base text-neutral-600 max-w-xl mx-auto">
                        {t.description}
                    </motion.p>
                </motion.div>

                {/* Comparison cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Traditional */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.div 
                            variants={itemVariants}
                            className="relative bg-white rounded-3xl shadow-lg border border-neutral-100 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-white" />
                            <div className="relative p-8 lg:p-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-neutral-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-900">{t.traditional.title}</h3>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {t.traditional.items.map((item: string, idx: number) => (
                                        <motion.li
                                            key={idx}
                                            variants={itemVariants}
                                            className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl"
                                        >
                                            <X className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                                            <span className="text-sm text-neutral-600">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <div className="pt-6 border-t border-neutral-100">
                                    <PriceTag price={t.traditional.price} period={t.traditional.period} />
                                    <p className="text-xs text-neutral-400 mt-2">{t.traditional.note}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Bastion - Highlighted */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.div 
                            variants={itemVariants}
                            className="relative bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden"
                        >
                            {/* Animated glow */}
                            <motion.div
                                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
                            />

                            <div className="relative p-8 lg:p-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                        <TrendingDown className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{t.bastion.title}</h3>
                                        <p className="text-sm text-blue-400">{t.bastion.subtitle}</p>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {t.bastion.items.map((item: string, idx: number) => (
                                        <motion.li
                                            key={idx}
                                            variants={itemVariants}
                                            className="flex items-center gap-3 p-3 bg-white/5 rounded-xl"
                                        >
                                            <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                                            <span className="text-sm text-neutral-200">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-extrabold text-white">€150</span>
                                        <span className="text-sm text-neutral-400">/month</span>
                                    </div>
                                    <p className="text-xs text-neutral-400 mt-2">{t.bastion.note}</p>
                                    <motion.p
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 text-sm font-bold rounded-full"
                                    >
                                        <TrendingDown className="w-4 h-4" />
                                        {t.bastion.savings}
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* CTA */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="text-center mt-12"
                >
                    <motion.a
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        href="#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25"
                    >
                        {t.cta}
                        <ArrowRight className="w-5 h-5" />
                    </motion.a>
                    <motion.p variants={itemVariants} className="text-xs text-neutral-400 mt-4 italic">
                        {t.disclaimer}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}