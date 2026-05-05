"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Bug, GraduationCap, HardDrive, Search, Check, ArrowRight, Clock, ChevronDown, ChevronUp, Layers } from "lucide-react";
import { translations } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/i18n/translations";

interface ServiceItem {
    id: string;
    name: string;
    category: string;
    tagline: string;
    shortDesc: string;
    longDesc: string;
    features: readonly string[];
    addons: readonly { name: string; desc: string }[];
    cta: string;
    cta_link?: string;
    popular: boolean;
    comingSoon?: boolean;
}

interface ServicesSectionProps {
    locale: Locale;
}

const serviceIcons: Record<string, React.ElementType> = {
    bastion: Shield,
    pentest: Bug,
    training: GraduationCap,
    backup: HardDrive,
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

function ServicesBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <motion.div
                animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl"
            />
            <svg className="absolute inset-0 w-full h-full opacity-[0.015]" preserveAspectRatio="none">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
    );
}

function ServiceCard({ 
    service, 
    locale, 
    isExpanded, 
    onToggle 
}: { 
    service: ServiceItem; 
    locale: Locale;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const Icon = serviceIcons[service.id] || Shield;
    
    return (
        <motion.div
            variants={itemVariants}
            className={`relative ${service.comingSoon ? 'opacity-75! grayscale-75' : ''}`}
        >
            <div 
                onClick={onToggle}
                className={`
                    relative p-5 md:p-6 rounded-2xl border cursor-pointer transition-all duration-300
                    ${service.popular 
                        ? 'bg-gradient-to-b from-blue-50/80 to-white border-blue-200/50 shadow-md shadow-blue-100/30' 
                        : 'bg-white/80 backdrop-blur-sm border-slate-200/50 hover:border-blue-300/40 hover:shadow-md'
                    }
                    ${isExpanded ? 'ring-2 ring-blue-500/20' : ''}
                `}
            >
                {service.popular && !service.comingSoon && (
                    <div className="absolute -top-2.5 left-4 px-2.5 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {locale === 'en' ? 'Popular' : 'Popolare'}
                    </div>
                )}
                
                {service.comingSoon && (
                    <div className="absolute -top-2.5 left-4 px-2.5 py-0.5 bg-slate-500 text-white text-xs font-semibold rounded-full">
                        {locale === 'en' ? 'Coming Soon' : 'In Arrivo'}
                    </div>
                )}

                <div className="flex items-start gap-4 mb-3">
                    <div className={`
                        flex-shrink-0 p-2.5 rounded-xl
                        ${service.popular ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}
                    `}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-lg leading-tight">{service.name}</h3>
                        <p className="text-sm text-slate-500 mt-0.5">{service.tagline}</p>
                    </div>
                    {!service.comingSoon && (
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    )}
                </div>

                <p className="text-sm text-slate-600 line-clamp-2">{service.shortDesc}</p>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 mt-4 border-t border-slate-200">
                                <p className="text-sm text-slate-600 mb-3">{service.longDesc}</p>
                                
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {service.features.slice(0, 4).map((feature, i) => (
                                        <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                                            <Check className="w-3 h-3 text-green-500" />
                                            {feature}
                                        </span>
                                    ))}
                                    {service.features.length > 4 && (
                                        <span className="inline-flex px-2 py-1 text-xs text-slate-400">
                                            +{service.features.length - 4}
                                        </span>
                                    )}
                                </div>

                                {service.addons && service.addons.length > 0 && (
                                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/50 mb-4">
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                            {locale === 'en' ? 'Add-ons' : 'Add-on'}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {service.addons.map((addon, i) => (
                                                <span key={i} className="text-xs text-slate-600 bg-white px-2 py-1 rounded-md border border-slate-200">
                                                    {addon.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <a
                                    aria-disabled={service.comingSoon}
                                    className={`
                                        w-full py-2.5 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2
                                        ${service.popular 
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                                        }
                                        ${service.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}
                                    `}
                                    href={service.cta_link ?? `#`}
                                    target={(service.cta_link ?? `#`).startsWith(`/`) ? `_self` : `_blank`}
                                >
                                    {service.cta}
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export function ServicesSection({ locale }: ServicesSectionProps) {
    const t = translations[locale].services;
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const filteredServices = useMemo(() => {
        return t.items;
    }, [t.items]);

    return (
        <section 
            id="services"
            className="relative py-16 md:py-24"
        >
            <ServicesBackground />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                        {t.title}
                    </h2>
                    <p className="text-base text-slate-600 max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                >
                    {filteredServices.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service as unknown as ServiceItem}
                            locale={locale}
                            isExpanded={expandedId === service.id}
                            onToggle={() => setExpandedId(expandedId === service.id ? null : service.id)}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}