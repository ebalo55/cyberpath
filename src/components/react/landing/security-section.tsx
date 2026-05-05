"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Shield, Eye, Clock, FileCheck, Users, CheckCircle } from "lucide-react";
import { translations } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/i18n/translations";

interface SecuritySectionProps {
    locale: Locale;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

function SecurityBackground() {
    return (
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <motion.div
                animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-[400px] h-[400px] bg-red-50/80 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-orange-50/80 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ rotate: [0, 180] }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/4 w-20 h-20 border border-red-200/30 rotate-12"
            />
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 right-1/4 w-40 h-40 bg-red-100/20 rounded-full blur-2xl"
            />
        </div>
    );
}

export function SecuritySection({ locale }: SecuritySectionProps) {
    const t = translations[locale].security;
    const icons = [AlertTriangle, Clock, FileCheck, Users, Eye, Shield];

    return (
        <section className="py-20 md:py-28 bg-white relative overflow-hidden" id="security">
            <SecurityBackground />

            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="text-center mb-12 md:mb-16"
                >
                    <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-3 md:mb-4 px-4">
                        {t.title}
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
                        {t.subtitle}
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 md:gap-5 mb-16 md:mb-20"
                >
                    {t.problems.items.map((item, idx) => {
                        const Icon = icons[idx];
                        return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="flex gap-3 md:gap-4 p-4 md:p-5 bg-neutral-50 rounded-xl md:rounded-2xl hover:bg-red-50/50 transition-colors"
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-5 md:w-6 text-red-600" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-bold text-neutral-900 text-sm md:text-base mb-1">{item.title}</h4>
                                    <p className="text-xs md:text-sm text-neutral-600 leading-tight">{item.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="bg-neutral-900 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 text-center"
                >
                    <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
                        <div className="w-14 md:w-16 h-14 md:h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4 md:mb-6">
                            <Shield className="w-7 md:w-8 text-blue-400" />
                        </div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
                            {t.solution.title}
                        </h3>
                        <p className="text-neutral-400 mb-6 md:mb-8 text-sm md:text-base">
                            {t.solution.subtitle}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 text-left">
                            {t.solution.features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    className="flex items-center gap-2 md:gap-3"
                                >
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-3 md:w-4 text-green-400" />
                                    </div>
                                    <span className="text-neutral-300 text-sm">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}