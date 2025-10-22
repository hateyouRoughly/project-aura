'use client';

import React from 'react';

const Roadmap = () => (
    <section id="roadmap" className="py-20 sm:py-24 scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Launch Roadmap</h2>
                <p className="mt-4 text-lg text-slate-400">Our iterative plan to build a comprehensive automation platform.</p>
            </div>
            <div className="mt-16 max-w-3xl mx-auto">
                <div className="space-y-12">
                    <div className="section-fade-in relative pl-8 timeline-item">
                        <div className="timeline-dot"></div>
                        <h3 className="text-lg font-bold text-white">Phase 1: MVP Launch</h3>
                        <p className="mt-1 text-slate-400">Implement all core features, including the real-time co-pilot view and the &quot;Bring Your Own Key&quot; model.</p>
                    </div>
                    <div className="section-fade-in relative pl-8 timeline-item" style={{ transitionDelay: '0.1s' }}>
                        <div className="timeline-dot"></div>
                        <h3 className="text-lg font-bold text-white">Phase 2: Enhancements</h3>
                        <p className="mt-1 text-slate-400">Introduce session history (&quot;macros&quot;), support for advanced actions like file uploads, and AI-powered error recovery.</p>
                    </div>
                    <div className="section-fade-in relative pl-8 timeline-item" style={{ transitionDelay: '0.2s' }}>
                        <div className="timeline-dot"></div>
                        <h3 className="text-lg font-bold text-white">Phase 3: Expansion</h3>
                        <p className="mt-1 text-slate-400">Develop a Chrome Extension for easier activation and introduce team collaboration features for sharing workflows.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Roadmap;
