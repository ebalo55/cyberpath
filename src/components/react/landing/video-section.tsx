"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Locale } from "@/lib/i18n/translations";

interface VideoSectionProps {
    locale: Locale;
}

const translations = {
    en: {
        title: "See How Bastion Protects Your Business",
        subtitle: "Watch a brief introduction to our SOCaaS and understand how we defend your infrastructure 24/7.",
    },
    it: {
        title: "Scopri Come Bastion Protegge la Tua Azienda",
        subtitle: "Guarda una breve introduzione al nostro SOCaaS e capisci come difendiamo la tua infrastruttura 24/7.",
    },
};

export function VideoSection({ locale }: VideoSectionProps) {
    const t = translations[locale];

    return (
        <section className="py-24 bg-neutral-50 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="absolute inset-0 pointer-events-none"
            >
                <motion.div
                    animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-3xl"
                />
            </motion.div>

            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-neutral-900 mb-4">
                        {t.title}
                    </h2>
                    <p className="text-neutral-600 max-w-xl mx-auto">
                        {t.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 group cursor-pointer"
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all"
                        >
                            <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                        </motion.div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <span className="text-white/60 text-sm font-medium">CyberPath Bastion - SOCaaS Introduction</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}