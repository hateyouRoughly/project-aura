'use client';

import React from 'react';
import FeatureCard from './FeatureCard';

const Features = () => (
    <section id="features" className="py-20 sm:py-24 scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">A Sneak Peek at What&apos;s Coming</h2>
                <p className="mt-4 text-lg text-slate-400">Aura combines three powerful concepts into one seamless experience.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard delay="0s" title="Natural Language Control" description="Simply tell Aura what you want to do in plain English. No code, no complex rules." icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 6.1H3"/><path d="M21 12.1H3"/><path d="M15.1 18.1H3"/></svg>} />
                <FeatureCard delay="0.1s" title="Live Co-Pilot View" description="Watch your instructions being carried out in real-time through a live visual feed." icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>} />
                <FeatureCard delay="0.2s" title="Secure & User-Controlled" description="Operates on a 'Bring Your Own Key' model. Your credentials are never stored." icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>} />
            </div>
        </div>
    </section>
);

export default Features;
