"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n/translations";

interface FAQSectionProps {
    locale: Locale;
}

const translations = {
    en: {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about Bastion",
        items: [
            {
                question: "What is SOCaaS?",
                answer: "SOCaaS (Security Operations Center as a Service) means we provide the same enterprise-grade security monitoring that large companies have—without the cost of building it yourself. Our expert analysts monitor your systems, detect threats, and respond to incidents in real-time.",
            },
            {
                question: "How long does setup take?",
                answer: "Most environments are up and running within a few days. We work with your existing infrastructure—no complex installations or disruptions to your business.",
            },
            {
                question: "What happens if there's a breach?",
                answer: "If we detect suspicious activity, we immediately alert you and guide you through the response process. Our analysts stay with you until the situation is resolved.",
            },
            {
                question: "Can I upgrade my plan later?",
                answer: "Absolutely. As your business grows, you can easily upgrade to a higher plan. There's no friction, no penalties—just more protection when you need it.",
            },
            {
                question: "Do you work with small businesses?",
                answer: "Yes! That's exactly who we serve. We understand SMBs don't have the resources for a full internal security team—but you still need protection.",
            },
        ],
    },
    it: {
        title: "Domande Frequenti",
        subtitle: "Tutto ciò che devi sapere su Bastion",
        items: [
            {
                question: "Che cos'è SOCaaS?",
                answer: "SOCaaS (Security Operations Center as a Service) significa che forniamo il monitoraggio di sicurezza di livello enterprise che hanno le grandi aziende—senza il costo di costruirlo tu stesso. I nostri analisti esperti monitorano i tuoi sistemi, rilevano minacce e rispondono agli incidenti in tempo reale.",
            },
            {
                question: "Quanto tempo richiede l'installazione?",
                answer: "La maggior parte degli ambienti sono operativi in pochi giorni. Lavoriamo con la tua infrastruttura esistente—nessuna installazione complessa o interruzione del tuo business.",
            },
            {
                question: "Cosa succede se c'è una violazione?",
                answer: "Se rileviamo attività sospette, ti avvisiamo immediatamente e ti guidiamo attraverso il processo di risposta. I nostri analisti restano con te fino a quando la situazione non è risolta.",
            },
            {
                question: "Posso aggiornare il mio piano successivamente?",
                answer: "Certo. Man mano che la tua azienda cresce, puoi facilmente passare a un piano superiore. Nessuna frizione, nessuna penalità—solo più protezione quando ne hai bisogno.",
            },
            {
                question: "Lavorate con le piccole aziende?",
                answer: "Sì! È esattamente chi serviamo. Capiamo che le PMI non hanno le risorse per un team di sicurezza interno—ma hai comunque bisogno di protezione.",
            },
        ],
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

function FAQItem({ item, isOpen, onToggle }: { item: { question: string; answer: string }; isOpen: boolean; onToggle: () => void }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="border border-neutral-200 rounded-2xl overflow-hidden"
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors"
            >
                <span className="font-semibold text-neutral-900 pr-4">{item.question}</span>
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
                        <p className="px-5 pb-5 text-neutral-600">{item.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQSection({ locale }: FAQSectionProps) {
    const t = translations[locale];
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-28 bg-white" id="faq">
            <div className="max-w-3xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                        <HelpCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-neutral-900 mb-3">
                        {t.title}
                    </h2>
                    <p className="text-neutral-600">{t.subtitle}</p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-3"
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