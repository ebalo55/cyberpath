"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { translations } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/i18n/translations";
import videoSrc from "@assets/video.mp4";

interface VideoSectionProps {
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

function VideoBackground() {
    return (
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
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
            <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/3 left-1/4 w-32 h-32 border border-blue-200/30 rotate-45"
            />
            <motion.div
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 right-1/4 w-20 h-20 border border-indigo-200/30 rounded-full"
            />
        </div>
    );
}

export function VideoSection({ locale }: VideoSectionProps) {
    const t = translations[locale].video;

    return (
        <section className="py-16 md:py-24 bg-neutral-50 relative overflow-hidden">
            <VideoBackground />

            <div className="max-w-5xl mx-auto px-4 md:px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="text-center mb-8 md:mb-10"
                >
                    <motion.h2 variants={itemVariants} className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 mb-3 md:mb-4">
                        {t.title}
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-base md:text-lg text-neutral-600 max-w-xl mx-auto">
                        {t.subtitle}
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={itemVariants}
                    className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 group cursor-pointer"
                >
                    <video
                        src={videoSrc}
                        className="absolute inset-0 w-full h-full object-cover"
                        controls
                        preload="metadata"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 pointer-events-none">
                        <span className="text-white/80 text-sm font-medium">CyberPath Bastion - SOCaaS Introduction</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}