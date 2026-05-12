"use client";

import {
    motion, useScroll, useTransform, useSpring
} from "framer-motion";
import {
    Shield, ArrowRight
} from "lucide-react";
import { translations } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/i18n/translations";

interface ServicesHeroProps {
    locale: Locale
}

function ParticleField() {
    const particles = Array.from({
        length: 12,
    }, (_, i) => ({
        id:       i,
        x:        Math.random() * 100,
        delay:    Math.random() * 6,
        duration: Math.random() * 10 + 10,
        size:     Math.random() * 4 + 2,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{
                        opacity: 0,
                        scale:   0,
                    }}
                    animate={{
                        opacity: [
                            0,
                            0.5,
                            0,
                        ],
                        scale:   [
                            0,
                            1,
                            0,
                        ],
                        y:       [
                            0,
                            -120,
                        ],
                        x:       [
                            0,
                            Math.random() * 50 - 25,
                        ],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat:   Infinity,
                        ease:     `easeInOut`,
                        delay:    p.delay,
                    }}
                    className="absolute bg-blue-400/50 rounded-full"
                    style={{
                        left:   `${ p.x }%`,
                        bottom: `10%`,
                        width:  p.size,
                        height: p.size,
                    }}
                />
            ))}
        </div>
    );
}

function GradientMesh() {
    return (
        <div className="absolute inset-0">
            <motion.div
                animate={{
                    x:     [
                        0,
                        60,
                        0,
                    ],
                    y:     [
                        0,
                        -40,
                        0,
                    ],
                    scale: [
                        1,
                        1.2,
                        1,
                    ],
                }}
                transition={{
                    duration: 14,
                    repeat:   Infinity,
                    ease:     `easeInOut`,
                }}
                className="absolute -top-1/4 -left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-blue-200/60 via-indigo-300/40 to-violet-200/50 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    x:     [
                        0,
                        -50,
                        0,
                    ],
                    y:     [
                        0,
                        50,
                        0,
                    ],
                    scale: [
                        1,
                        1.15,
                        1,
                    ],
                }}
                transition={{
                    duration: 18,
                    repeat:   Infinity,
                    ease:     `easeInOut`,
                    delay:    3,
                }}
                className="absolute -top-1/3 -right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-200/50 via-violet-200/40 to-blue-200/50 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    x: [
                        0,
                        40,
                        0,
                    ],
                    y: [
                        0,
                        -60,
                        0,
                    ],
                }}
                transition={{
                    duration: 20,
                    repeat:   Infinity,
                    ease:     `easeInOut`,
                    delay:    5,
                }}
                className="absolute -bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-violet-200/40 to-blue-200/40 rounded-full blur-3xl"
            />
            <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)'`,
                backgroundSize:  `20px 20px`,
            }} />
        </div>
    );
}

function FloatingShape({
    className, delay = 0,
}: { className?: string
    delay?:      number }) {
    return (
        <motion.div
            animate={{
                y:      [
                    0,
                    -15,
                    0,
                ],
                rotate: [
                    0,
                    8,
                    0,
                ],
            }}
            transition={{
                duration: 5,
                repeat:   Infinity,
                ease:     `easeInOut`,
                delay,
            }}
            className={className}
        />
    );
}

export function ServicesHero({
    locale,
}: ServicesHeroProps) {
    const t = translations[locale].services;
    const {
        scrollY,
    } = useScroll();
    const y1 = useSpring(useTransform(scrollY, [
        0,
        500,
    ], [
        0,
        150,
    ]), {
        stiffness: 100,
        damping:   20,
    });
    const y2 = useSpring(useTransform(scrollY, [
        0,
        500,
    ], [
        0,
        -100,
    ]), {
        stiffness: 100,
        damping:   20,
    });

    const scrollToServices = () => {
        document.getElementById(`services`)?.scrollIntoView({
            behavior: `smooth`,
        });
    };

    return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <GradientMesh />
            <ParticleField />

            <motion.div style={{
                y: y1,
            }} className="absolute top-20 left-10 md:left-20 opacity-20">
                <FloatingShape className="w-16 h-16 border border-blue-400/40 rotate-12 rounded-lg" delay={0} />
            </motion.div>
            <motion.div style={{
                y: y2,
            }} className="absolute bottom-20 right-10 md:right-20 opacity-20">
                <FloatingShape className="w-20 h-20 border border-indigo-400/40 -rotate-12 rounded-full" delay={1} />
            </motion.div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{
                        opacity: 0,
                        y:       30,
                    }}
                    animate={{
                        opacity: 1,
                        y:       0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="mb-6"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
                        <Shield className="w-4 h-4" />
                        {t.hero.tagline}
                    </span>
                </motion.div>

                <motion.h1
                    initial={{
                        opacity: 0,
                        y:       30,
                    }}
                    animate={{
                        opacity: 1,
                        y:       0,
                    }}
                    transition={{
                        duration: 0.6,
                        delay:    0.1,
                    }}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
                >
                    {t.title}
                </motion.h1>

                <motion.p
                    initial={{
                        opacity: 0,
                        y:       30,
                    }}
                    animate={{
                        opacity: 1,
                        y:       0,
                    }}
                    transition={{
                        duration: 0.6,
                        delay:    0.2,
                    }}
                    className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8"
                >
                    {t.subtitle}
                </motion.p>

                <motion.div
                    initial={{
                        opacity: 0,
                        y:       30,
                    }}
                    animate={{
                        opacity: 1,
                        y:       0,
                    }}
                    transition={{
                        duration: 0.6,
                        delay:    0.3,
                    }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button
                        onClick={scrollToServices}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25"
                    >
                        {t.hero.cta}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <a
                        href={`/${ locale }/#reservation`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all duration-200"
                    >
                        {t.hero.cta_secondary}
                    </a>
                </motion.div>
            </div>

            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 1,
                    delay:    0.8,
                }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{
                        y: [
                            0,
                            8,
                            0,
                        ],
                    }}
                    transition={{
                        duration: 2,
                        repeat:   Infinity,
                        ease:     `easeInOut`,
                    }}
                    className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center p-1"
                >
                    <motion.div className="w-1.5 h-3 bg-slate-400 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
