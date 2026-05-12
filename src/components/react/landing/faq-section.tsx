"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { translations } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/i18n/translations";

interface FAQSectionProps {
    locale: Locale;
}

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

function FAQBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <motion.div
                animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50/80 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-50/80 rounded-full blur-3xl"
            />
        </div>
    );
}

function FAQItem({ item, isOpen, onToggle }: { item: { question: string; answer: string }; isOpen: boolean; onToggle: () => void }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="border border-neutral-200 rounded-xl"
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-neutral-50 transition-colors"
            >
                <span className="font-semibold text-neutral-900 text-sm md:text-base pr-4">{item.question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                >
                    <ChevronDown className="w-5 h-5 text-neutral-400" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <p className="px-4 md:px-5 pb-4 md:pb-5 text-neutral-600 text-sm md:text-base">{item.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQSection({ locale }: FAQSectionProps) {
    const t = translations[locale].faq;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 md:py-28 bg-white" id="faq">
            <FAQBackground />

            <div className="max-w-3xl mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-12"
                >
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                        <HelpCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 mb-2 md:mb-3">
                        {t.title}
                    </h2>
                    <p className="text-neutral-600 text-sm md:text-base">{t.subtitle}</p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-2 md:space-y-3"
                >
                    {t.items.map((item, idx) => (
                        <FAQItem
                            key={idx}
                            item={item}
                            isOpen={openIndex === idx}
                            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}