"use client";

import { motion } from "framer-motion";
import {
    Building, TrendingDown, ArrowRight
} from "lucide-react";
import type { Locale } from "@/lib/i18n/translations";

interface ComparisonSectionProps {
    locale: Locale
}

const translations = {
    en: {
        title:       `Cost Comparison`,
        subtitle:    `How much would it cost to have the same level of protection with an internal team?`,
        description: `Building a proprietary security operations center requires significant investment. See how Bastion compares.`,
        traditional: {
            title: `Traditional In-House SOC`,
            items: [
                `Hiring and training security analysts`,
                `24/7 shifts require 4-5 employees`,
                `SIEM, EDR, and monitoring tools`,
                `Infrastructure and maintenance`,
                `Continuous training and certs`,
            ],
            price: `€4,000 - €12,000`,
            note:  `Just for staffing alone.`,
        },
        bastion: {
            title: `Bastion SOCaaS`,
            items: [
                `Expert analysts monitoring your systems`,
                `24/7 coverage with our team`,
                `All tools included in service`,
                `No infrastructure needed`,
                `Continuous threat updates`,
            ],
            price:   `From €190`,
            note:    `Everything included.`,
            savings: `Save up to 95%`,
        },
        cta: `See if Bastion is right for you`,
    },
    it: {
        title:       `Confronto Costi`,
        subtitle:    `Quanto costerebbe avere lo stesso livello di protezione con un team interno?`,
        description: `Costruire un centro operativo di sicurezza proprietario richiede investimenti significativi. Vedi come Bastion si confronta.`,
        traditional: {
            title: `SOC Interno Tradizionale`,
            items: [
                `Assunzione e formazione di analisti di sicurezza`,
                `Il servizio 24/7 richiede 4-5 dipendenti`,
                `Strumenti SIEM, EDR e monitoraggio`,
                `Infrastruttura e manutenzione`,
                `Formazione e certificazioni continue`,
            ],
            price: `€4.000 - €12.000`,
            note:  `Solo per il personale.`,
        },
        bastion: {
            title: `Bastion SOCaaS`,
            items: [
                `Analisti esperti che monitorano i tuoi sistemi`,
                `Copertura 24/7 con il nostro team`,
                `Tutti gli strumenti inclusi nel servizio`,
                `Nessuna infrastruttura necessaria`,
                `Aggiornamenti continui sulle minacce`,
            ],
            price:   `Da €190`,
            note:    `Tutto incluso.`,
            savings: `Risparmia fino al 95%`,
        },
        cta: `Vedi se Bastion è adatto a te`,
    },
};

const containerVariants = {
    hidden:  {
        opacity: 0,
    },
    visible: {
        opacity:    1,
        transition: {
            staggerChildren: 0.08,
            delayChildren:   0.15,
        },
    },
};

const itemVariants = {
    hidden:  {
        opacity: 0,
        y:       20,
    },
    visible: {
        opacity: 1,
        y:       0,
    },
};

export function ComparisonSection({
    locale,
}: ComparisonSectionProps) {
    const t = translations[locale];

    return (
        <section className="py-28 bg-white relative overflow-hidden" id="comparison">
            <motion.div
                initial={{
                    opacity: 0,
                }}
                whileInView={{
                    opacity: 1,
                }}
                viewport={{
                    once: true,
                }}
                className="absolute inset-0 pointer-events-none"
            >
                <motion.div
                    animate={{
                        x: [
                            0,
                            20,
                            0,
                        ],
                        y: [
                            0,
                            -20,
                            0,
                        ],
                    }}
                    transition={{
                        duration: 12,
                        repeat:   Infinity,
                        ease:     `easeInOut`,
                    }}
                    className="absolute top-0 left-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [
                            0,
                            -20,
                            0,
                        ],
                        y: [
                            0,
                            20,
                            0,
                        ],
                    }}
                    transition={{
                        duration: 14,
                        repeat:   Infinity,
                        ease:     `easeInOut`,
                        delay:    2,
                    }}
                    className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl"
                />
            </motion.div>

            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                    }}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.p variants={itemVariants} className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">
                        {t.subtitle}
                    </motion.p>
                    <motion.h2 variants={itemVariants} className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-neutral-900 mb-4">
                        {t.title}
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-base text-neutral-600 max-w-xl mx-auto">
                        {t.description}
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                        }}
                        variants={containerVariants}
                    >
                        <motion.div
                            variants={itemVariants}
                            className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-neutral-200 flex items-center justify-center">
                                    <Building className="w-5 h-5 text-neutral-600" />
                                </div>
                                <h3 className="text-lg font-bold text-neutral-900">{t.traditional.title}</h3>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {t.traditional.items.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-neutral-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-6 border-t border-neutral-200">
                                <span className="text-3xl font-bold text-neutral-900">{t.traditional.price}</span>
                                <p className="text-xs text-neutral-500 mt-1">{t.traditional.note}</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                        }}
                        variants={containerVariants}
                    >
                        <motion.div
                            variants={itemVariants}
                            className="relative bg-neutral-900 rounded-2xl p-8 shadow-2xl"
                        >
                            <motion.div
                                animate={{
                                    scale: [
                                        1,
                                        1.2,
                                        1,
                                    ],
                                    opacity: [
                                        0.2,
                                        0.4,
                                        0.2,
                                    ],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat:   Infinity,
                                }}
                                className="absolute top-0 right-0 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl"
                            />

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                        <TrendingDown className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{t.bastion.title}</h3>
                                        <p className="text-sm text-blue-400">More affordable</p>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {t.bastion.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-neutral-300">
                                            <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                    <div>
                                        <span className="text-3xl font-bold text-white">{t.bastion.price}</span>
                                        <p className="text-xs text-neutral-400 mt-1">{t.bastion.note}</p>
                                    </div>
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale:   0.9,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            scale:   1,
                                        }}
                                        transition={{
                                            delay: 0.2,
                                        }}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 text-sm font-bold rounded-full"
                                    >
                                        <TrendingDown className="w-4 h-4" />
                                        {t.bastion.savings}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                    }}
                    variants={containerVariants}
                    className="text-center mt-12"
                >
                    <motion.a
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.03,
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                        href="#reservation"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25"
                    >
                        {t.cta}
                        <ArrowRight className="w-5 h-5" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
