'use client';

import React from 'react';

const Architecture = () => (
    <section id="architecture" className="py-20 sm:py-24 scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">How It Works</h2>
                <p className="mt-4 text-lg text-slate-400">An event-driven architecture for real-time feedback and secure execution.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-4 gap-y-12 lg:gap-x-8 items-start text-center">
                <div className="section-fade-in diagram-arrow group relative p-6 bg-slate-800/50 border border-slate-700 rounded-lg hover-glitch" style={{ transitionDelay: '0s' }}><h4 className="font-bold text-emerald-400">1. Frontend</h4><p className="text-sm text-slate-400">Next.js & React</p></div>
                <div className="section-fade-in diagram-arrow group relative p-6 bg-slate-800/50 border border-slate-700 rounded-lg hover-glitch" style={{ transitionDelay: '0.1s' }}><h4 className="font-bold text-emerald-400">2. Backend Server</h4><p className="text-sm text-slate-400">Node.js, Socket.io</p></div>
                <div className="section-fade-in diagram-arrow group relative p-6 bg-slate-800/50 border border-slate-700 rounded-lg hover-glitch" style={{ transitionDelay: '0.2s' }}><h4 className="font-bold text-emerald-400">3. Automation Core</h4><p className="text-sm text-slate-400">Playwright</p></div>
                <div className="section-fade-in group relative p-6 bg-slate-800/50 border border-slate-700 rounded-lg hover-glitch" style={{ transitionDelay: '0.3s' }}><h4 className="font-bold text-emerald-400">4. Gemini AI</h4><p className="text-sm text-slate-400">Multimodal Model</p></div>
            </div>
        </div>
    </section>
);

export default Architecture;
