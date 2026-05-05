"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Shield, Zap, TrendingDown, Crown, Star } from "lucide-react";
import type { Locale } from "@/lib/i18n/translations";

interface PlansProps {
    locale: Locale;
}

const translations = {
    en: {
        subtitle: "Choose Your Plan",
        scudo: {
            name: "SCUDO",
            tagline: "Essential defense for professionals",
            description: "The protection designed for micro businesses that want to start protecting themselves.",
            price: "150",
            period: "/month",
            features: [
                "24/7 SOC Monitoring",
                "Threat Detection & Hunting",
                "Monthly vulnerability scans",
                "Email support",
                "Quarterly security reports",
                "Up to 10 endpoints",
            ],
            gain: [
                "€10+ avoided risk per €1 invested",
                "Attacks blocked",
                "Insurance savings",
            ],
            cta: "Start Free Trial",
            popular: false,
        },
        fortezza: {
            name: "FORTEZZA",
            tagline: "Complete security for growth",
            description: "Complete protection for small businesses that want to grow protected.",
            price: "490",
            period: "/month",
            features: [
                "Extended SOC (7am-10pm)",
                "Weekly vulnerability scans",
                "Priority support",
                "Monthly security reports",
                "Dashboard with history",
                "Up to 20 endpoints",
                "1 hour/month consultant",
            ],
            gain: [
                "€50K+ potential savings/year",
                "-50% cyber insurance",
                "90%+ risk reduction",
            ],
            cta: "Start Free Trial",
            popular: true,
        },
        bastione: {
            name: "BASTIONE",
            tagline: "Enterprise SOC",
            description: "The protection for businesses that can't afford to stop.",
            price: "750",
            period: "/month",
            features: [
                "24/7 SOC + AI Threat Hunting",
                "Suricata IDS/IPS",
                "Compliance (NIS2, GDPR)",
                "Priority support",
                "Cloud Monitoring (1 platform)",
                "Automated Forensics",
                "3 hours/month specialist",
            ],
            gain: [
                "<15min MTTD with AI",
                "vs 155 days without AI",
                "€1.56M avg breach savings",
            ],
            cta: "Contact Sales",
            popular: false,
        },
    },
    it: {
        subtitle: "Scegli il Tuo Piano",
        scudo: {
            name: "SCUDO",
            tagline: "Difesa essenziale per professionisti",
            description: "La protezione pensata per microimprese che vogliono iniziare a proteggersi.",
            price: "150",
            period: "/mese",
            features: [
                "Monitoraggio SOC 24/7",
                "Rilevamento e caccia alle minacce",
                "Scansioni mensili vulnerabilità",
                "Supporto email",
                "Report trimestrali",
                "Fino a 10 endpoint",
            ],
            gain: [
                "€10+ rischio evitato per €1 investito",
                "Attacchi bloccati",
                "Risparmio assicurativo",
            ],
            cta: "Inizia Trial Gratuito",
            popular: false,
        },
        fortezza: {
            name: "FORTEZZA",
            tagline: "Sicurezza completa per crescita",
            description: "Protezione completa per piccole imprese che vogliono crescere protette.",
            price: "490",
            period: "/mese",
            features: [
                "SOC esteso (7-22)",
                "Scansioni settimanali",
                "Supporto prioritario",
                "Report mensili",
                "Dashboard con storico",
                "Fino a 20 endpoint",
                "1 ora/mese consulenza",
            ],
            gain: [
                "€50K+ risparmio potenziale/anno",
                "-50% polizza cyber",
                "90%+ riduzione rischio",
            ],
            cta: "Inizia Trial Gratuito",
            popular: true,
        },
        bastione: {
            name: "BASTIONE",
            tagline: "SOC Enterprise",
            description: "La protezione per aziende che non possono fermarsi.",
            price: "750",
            period: "/mese",
            features: [
                "SOC 24/7 + AI Threat Hunting",
                "Suricata IDS/IPS",
                "Compliance (NIS2, GDPR)",
                "Supporto prioritario",
                "Monitoraggio Cloud (1 piattaforma)",
                "Forensics automatizzata",
                "3 ore/mese specialista",
            ],
            gain: [
                "<15min MTTD con AI",
                "vs 155 giorni senza AI",
                "€1,56M risparmio medio breach",
            ],
            cta: "Contatta le Vendite",
            popular: false,
        },
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

function AnimatedBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-50"
            />
            <motion.div
                animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-50 to-violet-50 rounded-full blur-3xl opacity-40"
            />
        </div>
    );
}

export function Plans({ locale }: PlansProps) {
    const t = translations[locale];
    const plans = ["scudo", "fortezza", "bastione"] as const;

    return (
        <section className="relative py-28 bg-white overflow-hidden">
            <AnimatedBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.p variants={itemVariants} className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">
                        {t.subtitle}
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {plans.map((planKey, idx) => {
                        const plan = t[planKey];
                        const isPopular = plan.popular;

                        return (
                            <motion.div
                                key={planKey}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                variants={itemVariants}
                                className={`relative flex flex-col rounded-3xl transition-all hover:-translate-y-2 ${
                                    isPopular
                                        ? "bg-neutral-900 shadow-2xl scale-[1.02] z-10"
                                        : "bg-white border border-neutral-100 shadow-xl"
                                }`}
                            >
                                {isPopular && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ delay: 0.3, type: "spring" }}
                                        className="absolute -top-3 left-1/2 -translate-x-1/2"
                                    >
                                        <span className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-500 text-white text-xs font-bold rounded-full">
                                            <Star className="w-3 h-3 fill-current" />
                                            Most Popular
                                        </span>
                                    </motion.div>
                                )}

                                {/* Glow effect for popular */}
                                {isPopular && (
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="absolute -inset-px bg-gradient-to-br from-blue-500/30 to-indigo-500/30 rounded-3xl blur-xl -z-10"
                                    />
                                )}

                                <div className={`p-8 ${isPopular ? "bg-neutral-900/50 rounded-t-3xl" : ""}`}>
                                    <div className="text-center mb-6">
                                        <h3 className={`text-2xl font-bold ${isPopular ? "text-white" : "text-neutral-900"}`}>
                                            {plan.name}
                                        </h3>
                                        <p className={`text-sm mt-1 ${isPopular ? "text-blue-400" : "text-blue-600"}`}>
                                            {plan.tagline}
                                        </p>
                                    </div>

                                    <div className="text-center mb-4">
                                        <div className="flex items-baseline justify-center gap-1">
                                            <span className={`text-5xl font-extrabold ${isPopular ? "text-white" : "text-neutral-900"}`}>
                                                €{plan.price}
                                            </span>
                                            <span className={`text-sm ${isPopular ? "text-neutral-400" : "text-neutral-500"}`}>
                                                {plan.period}
                                            </span>
                                        </div>
                                    </div>

                                    <p className={`text-center text-sm ${isPopular ? "text-neutral-400" : "text-neutral-600"} mb-6`}>
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="flex-1 px-8 pb-8">
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature: string, fIdx: number) => (
                                            <li key={fIdx} className="flex items-start gap-3">
                                                <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isPopular ? "text-green-400" : "text-blue-600"}`} />
                                                <span className={`text-sm ${isPopular ? "text-neutral-300" : "text-neutral-600"}`}>
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Gain box */}
                                    <div className={`p-4 rounded-xl ${isPopular ? "bg-white/5" : "bg-green-50"}`}>
                                        <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${isPopular ? "text-green-400" : "text-green-700"}`}>
                                            Your Gain
                                        </p>
                                        <div className="space-y-1">
                                            {plan.gain.slice(0, 2).map((gain: string, gIdx: number) => (
                                                <p key={gIdx} className={`text-sm ${isPopular ? "text-neutral-300" : "text-neutral-600"}`}>
                                                    {gain}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="px-8 pb-8">
                                    <motion.a
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        href="#contact"
                                        className={`block w-full py-4 rounded-full text-center font-bold transition-all ${
                                            isPopular
                                                ? "bg-white text-neutral-900 hover:bg-neutral-100"
                                                : "bg-neutral-900 text-white hover:bg-neutral-800"
                                        }`}
                                    >
                                        {plan.cta}
                                    </motion.a>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-xs text-neutral-400 mt-10"
                >
                    {locale === "en" 
                        ? "Custom pricing available for additional endpoints" 
                        : "Pricing personalizzato per endpoint aggiuntivi"}
                </motion.p>
            </div>
        </section>
    );
}