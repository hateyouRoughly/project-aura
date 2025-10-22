'use client';

import React from 'react';
import VideoPlayer from './VideoPlayer';

const Demo = () => (
    <section id="demo" className="py-20 sm:py-24 scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">See Aura in Action</h2>
                <p className="mt-4 text-lg text-slate-400">Watch how Aura transforms natural language into automated actions.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <VideoPlayer
                    title="Project Aura: Our Vision for the Future"
                    description="Discover the motivation behind Aura and how we plan to revolutionize web automation for everyone."
                    youtubeId="xYBECfP1eBk" 
                    delay="0s"
                />
                <VideoPlayer
                    title="Exploring the Aura Prototype"
                    description="Take a tour of the Aura prototype. This video walks through the user interface and simulates the core workflow."
                    youtubeId="xYBECfP1eBk" 
                    delay="0.1s"
                />
            </div>
        </div>
    </section>
);

export default Demo;
