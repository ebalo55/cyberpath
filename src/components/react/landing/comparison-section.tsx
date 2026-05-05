"use client";

import { motion } from "framer-motion";
import {
    Building, TrendingDown, ArrowRight, Check
} from "lucide-react";
import { translations } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/i18n/translations";

interface ComparisonSectionProps {
    locale: Locale
}

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

function ComparisonBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none">
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
            <motion.div
                animate={{
                    rotate: [
                        0,
                        360,
                    ],
                }}
                transition={{
                    duration: 70,
                    repeat:   Infinity,
                    ease:     `linear`,
                }}
                className="absolute top-1/4 right-1/4 w-24 h-24 border border-neutral-200/30 rotate-45"
            />
            <motion.div
                animate={{
                    scale: [
                        1,
                        1.3,
                        1,
                    ],
                    opacity: [
                        0.3,
                        0.5,
                        0.3,
                    ],
                }}
                transition={{
                    duration: 4,
                    repeat:   Infinity,
                    ease:     `easeInOut`,
                }}
                className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-blue-100/30 rounded-full blur-2xl"
            />
        </div>
    );
}

export function ComparisonSection({
    locale,
}: ComparisonSectionProps) {
    const t = translations[locale].comparison;

    return (
        <section className="py-20 md:py-28 relative" id="comparison">
            <ComparisonBackground />

            <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                    }}
                    variants={containerVariants}
                    className="text-center mb-12 md:mb-16"
                >
                    <motion.p variants={itemVariants} className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">
                        {t.subtitle}
                    </motion.p>
                    <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-3 md:mb-4 px-4">
                        {t.title}
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-base text-neutral-600 max-w-xl mx-auto px-4">
                        {t.description}
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
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
                            className="bg-neutral-50 rounded-xl md:rounded-2xl p-5 md:p-8 border border-neutral-200"
                        >
                            <div className="flex items-center gap-3 mb-5 md:mb-6">
                                <div className="w-10 h-10 rounded-xl bg-neutral-200 flex items-center justify-center">
                                    <Building className="w-5 h-5 text-neutral-600" />
                                </div>
                                <h3 className="text-lg font-bold text-neutral-900">{t.traditional.title}</h3>
                            </div>

                            <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                                {t.traditional.items.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-neutral-600 text-sm md:text-base">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-4 md:pt-6 border-t border-neutral-200">
                                <span className="text-2xl md:text-3xl font-bold text-neutral-900">{t.traditional.price}</span>
                                <p className="text-xs md:text-sm text-neutral-500 mt-1">{t.traditional.note}</p>
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
                            className="relative bg-neutral-900 rounded-xl md:rounded-2xl p-5 md:p-8 shadow-2xl"
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
                                <div className="flex items-center gap-3 mb-5 md:mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                        <TrendingDown className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{t.bastion.title}</h3>
                                        <p className="text-sm text-blue-400">{locale === `it` ? `Più accessibile` : `More affordable`}</p>
                                    </div>
                                </div>

                                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                                    {t.bastion.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-neutral-300 text-sm md:text-base">
                                            <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-4 md:pt-6 border-t border-white/10 flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl md:text-3xl font-bold text-white">{t.bastion.price}</span>
                                        <p className="text-xs md:text-sm text-neutral-400 mt-1">{t.bastion.note}</p>
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
                                        className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-green-500/20 text-green-400 text-xs md:text-sm font-bold rounded-full"
                                    >
                                        <TrendingDown className="w-3 md:w-4" />
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
                    className="text-center mt-10 md:mt-12"
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
                        className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 text-sm md:text-base"
                    >
                        {t.cta}
                        <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
