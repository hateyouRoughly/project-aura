'use client';

import React from 'react';

const FeatureCard = ({ title, description, icon, delay }: { title: string; description: string; icon: React.ReactNode; delay: string }) => (
    <div className="section-fade-in relative overflow-hidden rounded-xl border border-emerald-500/20 bg-slate-800/50 p-8 backdrop-blur-sm glow-effect" style={{ transitionDelay: delay }}>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-slate-300">{description}</p>
    </div>
);

export default FeatureCard;
