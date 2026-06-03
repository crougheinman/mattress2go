import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Layout from '../Layout';
import Reveal from '../components/Reveal';
import financingHeader from '../assets/financing-header.jpg';

const benefits = [
    { icon: 'mdi:percent-outline', label: '0% Interest', detail: 'On qualifying plans' },
    { icon: 'mdi:cash-remove', label: '$0 Down', detail: 'Get started today' },
    { icon: 'mdi:calendar-month-outline', label: 'Up to 48 Months', detail: 'Flexible terms' },
];

const options = [
    {
        icon: 'mdi:credit-card-outline',
        title: 'Synchrony Financing',
        description: '0% Interest, $0 Down Payment. Apply online for an instant decision on a plan that fits your budget.',
        href: 'https://www.synchrony.com/financing/credit-cards',
        cta: 'Apply with Synchrony',
        external: true,
    },
    {
        icon: 'mdi:calendar-check-outline',
        title: 'Up to 48 Months, 0% Interest',
        description: 'Spread your purchase over longer terms with no interest. Contact us and we’ll walk you through the details.',
        href: '/contact',
        cta: 'Contact Us',
        external: false,
    },
];

const FinancingPage: React.FC = () => {
    return (
        <Layout title="Financing">
            {/* Hero */}
            <section className="relative overflow-hidden bg-copa-blue-900">
                <img src={financingHeader} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-copa-blue-950/40" />
                <div className="absolute inset-0 bg-linear-to-t from-copa-blue-950/80 via-copa-blue-900/30 to-transparent" />
                <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:py-24">
                    <span className="inline-flex items-center gap-2 rounded-full bg-copa-blue-950/70 px-4 py-1.5 text-sm font-semibold text-white shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
                        <Icon icon="mdi:hand-coin-outline" className="h-4 w-4" />
                        Buy now, pay over time
                    </span>
                    <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl">
                        Flexible Financing
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-white [text-shadow:_0_2px_8px_rgb(0_0_0_/_70%)]">
                        Everyone deserves a good night’s sleep without breaking the bank. We’ve partnered with trusted lenders to make your dream mattress or furniture a reality.
                    </p>
                </div>
            </section>

            {/* Benefit highlights */}
            <section className="relative z-10 mx-auto -mt-12 max-w-5xl px-4">
                <div className="grid gap-4 sm:grid-cols-3">
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.label}
                            className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-lg shadow-copa-blue-900/5"
                        >
                            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-copa-blue-50 text-copa-blue-600">
                                <Icon icon={benefit.icon} className="h-6 w-6" />
                            </span>
                            <div>
                                <p className="text-lg font-bold text-gray-900">{benefit.label}</p>
                                <p className="text-sm text-gray-500">{benefit.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Intro */}
            <Reveal><section className="mx-auto max-w-3xl px-4 pt-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Flexible Financing at Mattress2Go Outlet
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                    Our flexible financing plans are designed to accommodate various budgets and preferences, ensuring you can enjoy your new purchase without financial stress.
                </p>
            </section></Reveal>

            {/* Financing options */}
            <Reveal><section className="mx-auto max-w-5xl px-4 py-12">
                <div className="grid gap-6 md:grid-cols-2">
                    {options.map((option) => (
                        <div
                            key={option.title}
                            className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl hover:shadow-copa-blue-900/10"
                        >
                            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-copa-blue-600 text-white transition-transform group-hover:scale-105">
                                <Icon icon={option.icon} className="h-7 w-7" />
                            </span>
                            <h3 className="mt-5 text-xl font-bold text-gray-900">{option.title}</h3>
                            <p className="mt-3 flex-1 text-base leading-relaxed text-gray-600">{option.description}</p>
                            {option.external ? (
                                <a
                                    href={option.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-copa-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-copa-blue-700"
                                >
                                    {option.cta}
                                    <Icon icon="mdi:open-in-new" className="h-4 w-4" />
                                </a>
                            ) : (
                                <Link
                                    to={option.href}
                                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-copa-blue-600 px-6 py-3 text-sm font-semibold text-copa-blue-700 transition-colors hover:bg-copa-blue-50"
                                >
                                    {option.cta}
                                    <Icon icon="mdi:arrow-right" className="h-4 w-4" />
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </section></Reveal>

            {/* Closing CTA */}
            <Reveal><section className="mx-auto max-w-5xl px-4 pb-20">
                <div className="overflow-hidden rounded-3xl bg-linear-to-br from-copa-blue-700 to-copa-blue-900 px-6 py-12 text-center sm:px-12">
                    <Icon icon="mdi:bed-king-outline" className="mx-auto h-10 w-10 text-copa-blue-200" />
                    <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                        Start Your Journey to Better Sleep Today
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-copa-blue-100">
                        Visit our showroom to explore our collection and discuss financing in person, or conveniently apply online for pre-approval on the plan that best suits your needs.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            to="/shop"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-copa-blue-700 transition-colors hover:bg-copa-blue-50 sm:w-auto"
                        >
                            <Icon icon="mdi:shopping-outline" className="h-4 w-4" />
                            Shop Mattresses
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-copa-blue-700 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-copa-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copa-blue-800 sm:w-auto"
                        >
                            <Icon icon="mdi:phone-outline" className="h-4 w-4" />
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section></Reveal>
        </Layout>
    );
};

export default FinancingPage;
