'use client';

import React from 'react';
import MailIcon from '../MailIcon';

const Hero = ({ typedTitle, handleFormSubmit }: { typedTitle: string; handleFormSubmit: (e: React.FormEvent) => void; }) => (
    <section id="hero" className="py-24 sm:py-32 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest">Project Aura</h1>
            <h2 className="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight text-white h-24 sm:h-36">
                {typedTitle}<span className="blinking-cursor text-emerald-400">|</span>
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-300">Our AI Co-Pilot is preparing for launch. Soon, you&apos;ll be able to delegate your most complex digital tasks with simple natural language. Be the first to know when we go live.</p>
            <div className="mt-12 max-w-lg mx-auto">
                <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><MailIcon /></div>
                        <input type="email" required className="block w-full rounded-md border-0 bg-slate-800 py-3 pl-10 pr-3 text-white ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 transition-all" placeholder="Enter your email" />
                    </div>
                    <button type="submit" className="rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors glow-effect">Notify Me</button>
                </form>
            </div>
        </div>
    </section>
);

export default Hero;
