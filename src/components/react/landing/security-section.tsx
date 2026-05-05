"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Shield, Eye, Clock, FileCheck, Users } from "lucide-react";
import type { Locale } from "@/lib/i18n/translations";

interface SecuritySectionProps {
    locale: Locale;
}

const translations = {
    en: {
        title: "Security Isn't Optional—It's Essential",
        subtitle: "Every day, small and medium businesses face cyber threats that can devastate years of hard work. Are you protected?",
        problems: {
            title: "What Could Happen Without Proper Security",
            items: [
                { icon: AlertTriangle, title: "Financial Loss", description: "Ransomware attacks can lock you out of your systems until you pay—or lose everything." },
                { icon: Clock, title: "Business Disruption", description: "A single breach can halt operations for days or weeks, costing you clients and revenue." },
                { icon: FileCheck, title: "Legal Consequences", description: "Data breaches trigger GDPR notifications, fines, and potential lawsuits." },
                { icon: Users, title: "Reputation Damage", description: "Clients trust you with their data. A breach can destroy that trust permanently." },
                { icon: Eye, title: "Lost Access", description: "Hackers can steal credentials, locking you out of your own accounts and systems." },
                { icon: Shield, title: "Supply Chain Risk", description: "If attackers compromise you, they can reach your clients and partners too." },
            ],
        },
        solution: {
            title: "This is Where Bastion Comes In",
            subtitle: "We're your security team, watching over your business around the clock so you can focus on what you do best.",
            features: [
                "We monitor your systems 24/7/365—every day, all day",
                "We detect threats before they become breaches",
                "We respond immediately when something suspicious happens",
                "We provide clear reports you can understand",
                "We help you stay compliant with regulations",
            ],
        },
    },
    it: {
        title: "La Sicurezza Non È Opzionale—È Essenziale",
        subtitle: "Ogni giorno, le piccole e medie aziende affrontano minacce informatiche che possono devastare anni di lavoro. Sei protetto?",
        problems: {
            title: "Cosa Potrebbe Accadere Senza una Sicurezza Adeguata",
            items: [
                { icon: AlertTriangle, title: "Perdita Finanziaria", description: "Gli attacchi ransomware possono bloccarti fuori dai sistemi fino a quando paghi—o perdere tutto." },
                { icon: Clock, title: "Interruzione del Business", description: "Una singola violazione può bloccare le operazioni per giorni o settimane, costandoti clienti e fatturato." },
                { icon: FileCheck, title: "Conseguenze Legali", description: "Le violazioni dei dati attivano notifiche GDPR, multe e potenziali cause legali." },
                { icon: Users, title: "Danno Reputazionale", description: "I clienti ti affidano i loro dati. Una violazione può distruggere questa fiducia per sempre." },
                { icon: Eye, title: "Accesso Perso", description: "Gli hacker possono rubare le credenziali, bloccandoti fuori dai tuoi stessi account e sistemi." },
                { icon: Shield, title: "Rischio Catena di Fornitura", description: "Se gli attaccanti compromettono te, possono raggiungere anche i tuoi clienti e partner." },
            ],
        },
        solution: {
            title: "È Qui che Entra in Gioco Bastion",
            subtitle: "Siamo il tuo team di sicurezza, a protezione della tua azienda 24 ore su 24 così puoi concentrarti su ciò che sai fare meglio.",
            features: [
                "Monitoriamo i tuoi sistemi 24/7/365—ogni giorno, tutto il giorno",
                "Rileviamo le minacce prima che diventino violazioni",
                "Rispondiamo immediatamente quando qualcosa di sospetto succede",
                "Forniamo report chiari che puoi capire",
                "Ti aiutiamo a rimanere conforme alle normative",
            ],
        },
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export function SecuritySection({ locale }: SecuritySectionProps) {
    const t = translations[locale];

    return (
        <section className="py-28 bg-white relative overflow-hidden" id="security">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="absolute inset-0 pointer-events-none"
            >
                <motion.div
                    animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-red-50 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute bottom-1/4 right-0 w-[350px] h-[350px] bg-orange-50 rounded-full blur-3xl"
                />
            </motion.div>

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={itemVariants} className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-neutral-900 mb-4">
                        {t.title}
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        {t.subtitle}
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20"
                >
                    {t.problems.items.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="flex gap-4 p-5 bg-neutral-50 rounded-2xl hover:bg-red-50/50 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-neutral-900 mb-1">{item.title}</h4>
                                    <p className="text-sm text-neutral-600">{item.description}</p>
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
                    className="bg-neutral-900 rounded-3xl p-8 lg:p-12 text-center"
                >
                    <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
                            <Shield className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white mb-4">
                            {t.solution.title}
                        </h3>
                        <p className="text-neutral-400 mb-8">
                            {t.solution.subtitle}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                            {t.solution.features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
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