"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n/translations";

interface CtaProps {
    locale: Locale;
}

const translations = {
    en: {
        title: "Ready to secure your business?",
        description: "Get enterprise-grade security for your business at a fraction of the cost of an in-house SOC.",
        button: "Get Started Free",
    },
    it: {
        title: "Pronto a proteggere la tua azienda?",
        description: "Ottieni sicurezza di livello enterprise per la tua azienda a una frazione del costo di un SOC interno.",
        button: "Inizia Gratuitamente",
    },
};

function CtaBackground() {
    return (
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <motion.div
                animate={{ 
                    scale: [1, 1.1, 1],
                    x: [0, 20, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px]"
            />
            <motion.div
                animate={{ 
                    scale: [1.1, 1, 1.1],
                    x: [0, -30, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[120px]"
            />
            {/* Floating shapes */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-20 right-[15%] w-32 h-32 border border-blue-200/30 rounded-2xl"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-32 left-[10%] w-20 h-20 border border-indigo-200/30 rounded-full"
            />
            <motion.div
                animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full"
            />
            <motion.div
                animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/3 right-1/4 w-3 h-3 bg-indigo-400/30 rounded-full"
            />
        </div>
    );
}

export function Cta({ locale }: CtaProps) {
    const t = translations[locale];

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <CtaBackground />

            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { 
                            opacity: 1,
                            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                        },
                    }}
                >
                    <motion.h2
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-neutral-900 mb-6"
                    >
                        {t.title}
                    </motion.h2>
                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-neutral-600 max-w-2xl mx-auto mb-10"
                    >
                        {t.description}
                    </motion.p>
                    <motion.a
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ delay: 0.2 }}
                        href="#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-600/25"
                    >
                        {t.button}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}