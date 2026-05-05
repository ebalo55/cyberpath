"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, Shield, CheckCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n/translations";

interface ReservationSectionProps {
    locale: Locale;
}

const translations = {
    en: {
        title: "Ready to Get Protected?",
        subtitle: "Book a free introductory call with our security team.",
        description: "No commitment. No sales pressure. Just a conversation about your security needs and how Bastion can help.",
        button: "Book Your Free Call",
        benefits: [
            "We listen to your needs",
            "No hard selling",
            "Clear recommendations",
            "Your decision, no pressure",
        ],
    },
    it: {
        title: "Pronto a Farti Proteggere?",
        subtitle: "Prenota una call introduttiva gratuita con il nostro team di sicurezza.",
        description: "Nessun impegno. Nessuna pressione commerciale. Solo una conversazione sulle tue esigenze di sicurezza e su come Bastion può aiutarti.",
        button: "Prenota la Tua Chiamata Gratuita",
        benefits: [
            "Ascoltiamo le tue esigenze",
            "Nessuna vendita aggressiva",
            "Raccomandazioni chiare",
            "La tua decisione, senza pressione",
        ],
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export function ReservationSection({ locale }: ReservationSectionProps) {
    const t = translations[locale];

    return (
        <section className="py-28 bg-neutral-50 relative overflow-hidden" id="reservation">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="absolute inset-0 pointer-events-none"
            >
                <motion.div
                    animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-100/50 rounded-full blur-3xl"
                />
            </motion.div>

            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                    <div className="grid lg:grid-cols-2">
                        <div className="p-8 lg:p-12">
                            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900">{t.title}</h3>
                                    <p className="text-sm text-neutral-600">{t.subtitle}</p>
                                </div>
                            </motion.div>

                            <motion.p variants={itemVariants} className="text-neutral-600 mb-8">
                                {t.description}
                            </motion.p>

                            <motion.div variants={itemVariants} className="space-y-3 mb-8">
                                {t.benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span className="text-neutral-700">{benefit}</span>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.a
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href="https://cal.com/cyberpath/bastion-intro"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25"
                            >
                                {t.button}
                                <ArrowRight className="w-5 h-5" />
                            </motion.a>
                        </div>

                        <div className="bg-neutral-900 p-8 lg:p-12 flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-center"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
                                    <Shield className="w-10 h-10 text-blue-400" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">30 Minutes</h4>
                                <p className="text-neutral-400 text-sm">Free introductory call</p>
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <p className="text-neutral-500 text-sm">See how Bastion can protect your business—without any obligation.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}