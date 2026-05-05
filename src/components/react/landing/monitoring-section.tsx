"use client";

import { motion } from "framer-motion";
import { Activity, Server, Monitor, Cloud, AppWindow, Globe, Clock, Shield, Zap } from "lucide-react";
import type { Locale } from "@/lib/i18n/translations";

interface MonitoringSectionProps {
    locale: Locale;
}

const translations = {
    en: {
        title: "24/7/365 Monitoring",
        subtitle: "Security never sleeps. Neither do we.",
        description: "Cyber threats don't follow business hours. That's why Bastion monitors your infrastructure continuously—every minute of every day, 365 days a year.",
        features: {
            title: "What We Monitor",
            items: [
                { icon: Activity, title: "Network Traffic", description: "All incoming and outgoing connections" },
                { icon: Server, title: "Endpoint Activity", description: "Devices, servers, and workstations" },
                { icon: Monitor, title: "User Behavior", description: "Login patterns and access attempts" },
                { icon: Cloud, title: "Cloud Services", description: "AWS, Azure, Google Cloud environments" },
                { icon: AppWindow, title: "Applications", description: "Your critical business software" },
                { icon: Globe, title: "Threat Intelligence", description: "Global threat feeds and emerging risks" },
            ],
        },
        badge: "Always On",
    },
    it: {
        title: "Monitoraggio 24/7/365",
 subtitle: "La sicurezza non dorme. Noi nemmeno.",
        description: "Le minacce informatiche non seguono l'orario d'ufficio. Per questo Bastion monitora la tua infrastruttura continuamente—ogni minuto di ogni giorno, 365 giorni l'anno.",
        features: {
            title: "Cosa Monitoriamo",
            items: [
                { icon: Activity, title: "Traffico di Rete", description: "Tutte le connessioni in entrata e uscita" },
                { icon: Server, title: "Attività Endpoint", description: "Dispositivi, server e workstation" },
                { icon: Monitor, title: "Comportamento Utente", description: "Pattern di accesso e tentativi di login" },
                { icon: Cloud, title: "Servizi Cloud", description: "Ambienti AWS, Azure, Google Cloud" },
                { icon: AppWindow, title: "Applicazioni", description: "Il tuo software aziendale critico" },
                { icon: Globe, title: "Intelligence sulle Minacce", description: "Feed globali e rischi emergenti" },
            ],
        },
        badge: "Sempre Attivo",
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

function MonitoringBackground() {
    return (
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
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
        </div>
    );
}

export function MonitoringSection({ locale }: MonitoringSectionProps) {
    const t = translations[locale];

    return (
        <section className="py-28 bg-neutral-50 relative overflow-hidden" id="monitoring">
            <MonitoringBackground />

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 rounded-full mb-6">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">{t.badge}</span>
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-neutral-900 mb-4">
                        {t.title}
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-2xl font-semibold text-blue-600 mb-6">
                        {t.subtitle}
                    </motion.p>
                    <motion.p variants={itemVariants} className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        {t.description}
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {t.features.items.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-neutral-900">{item.title}</h4>
                                    <p className="text-sm text-neutral-500">{item.description}</p>
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
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-6 px-8 py-4 bg-white rounded-full border border-neutral-200 shadow-lg">
                        <div className="flex items-center gap-2">
                            <motion.div
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-3 h-3 bg-green-500 rounded-full"
                            />
                            <span className="text-sm font-medium text-neutral-700">Live Monitoring</span>
                        </div>
                        <div className="w-px h-6 bg-neutral-200" />
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium text-neutral-700">24/7/365</span>
                        </div>
                        <div className="w-px h-6 bg-neutral-200" />
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-neutral-700">Proactive Defense</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}