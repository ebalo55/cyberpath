"use client";

import { motion } from "framer-motion";
import { Activity, Server, Monitor, Cloud, AppWindow, Globe, Clock, Shield, Zap } from "lucide-react";
import { translations } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/i18n/translations";

interface MonitoringSectionProps {
    locale: Locale;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

function MonitoringBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none -z-1">
            <motion.div
                animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px]"
            />
            <motion.div
                animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px]"
            />
            <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/3 right-1/3 w-32 h-32 border border-blue-100/30 rotate-45"
            />
            <motion.div
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/3 left-1/3 w-24 h-24 border border-indigo-100/30 rounded-full"
            />
        </div>
    );
}

export function MonitoringSection({ locale }: MonitoringSectionProps) {
    const t = translations[locale].monitoring;

    return (
        <section className="py-20 md:py-28 relative overflow-hidden" id="monitoring">
            <MonitoringBackground />

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="text-center mb-12 md:mb-16"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 rounded-full mb-6">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">{t.badge}</span>
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-3 md:mb-4">
                        {t.title}
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-xl md:text-2xl font-semibold text-blue-600 mb-4 md:mb-6">
                        {t.subtitle}
                    </motion.p>
                    <motion.p variants={itemVariants} className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
                        {t.description}
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
                >
                    {t.features.items.map((item, idx) => {
                        const Icon = [Activity, Server, Monitor, Cloud, AppWindow, Globe][idx];
                        return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl md:rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-5 md:w-6 text-blue-600" />
                                </div>
                                <div className="text-left min-w-0">
                                    <h4 className="font-bold text-neutral-900 text-sm md:text-base truncate">{item.title}</h4>
                                    <p className="text-xs md:text-sm text-neutral-500 truncate">{item.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 md:mt-16 text-center"
                >
                    <div className="hidden md:inline-flex items-center gap-4 md:gap-6 px-6 md:px-8 py-3 md:py-4 bg-white rounded-full border border-neutral-200 shadow-lg flex-wrap justify-center">
                        <div className="flex items-center gap-2">
                            <motion.div
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-2 md:w-3 h-2 md:h-3 bg-green-500 rounded-full"
                            />
                            <span className="text-xs md:text-sm font-medium text-neutral-700">{t.live_monitoring}</span>
                        </div>
                        <div className="w-px h-4 md:h-6 bg-neutral-200 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 md:w-5 h-4 md:h-5 text-yellow-500" />
                            <span className="text-xs md:text-sm font-medium text-neutral-700">24/7/365</span>
                        </div>
                        <div className="w-px h-4 md:h-6 bg-neutral-200 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 md:w-5 h-4 md:h-5 text-blue-500" />
                            <span className="text-xs md:text-sm font-medium text-neutral-700">{t.proactive_defense}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}