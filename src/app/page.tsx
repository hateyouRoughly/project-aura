/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef, useState } from 'react';

// --- Helper Components & Icons ---

const NavLink = ({ section, children }: { section: string; children: React.ReactNode }) => (
    <a 
        href={`#${section}`} 
        data-section={section}
        className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-300 transition-all duration-200 ease-in-out border-b-2 border-transparent hover:text-white"
    >
        {children}
    </a>
);

const FeatureCard = ({ title, description, icon, delay }: { title: string; description: string; icon: React.ReactNode; delay: string }) => (
    <div className="section-fade-in relative overflow-hidden rounded-xl border border-emerald-500/20 bg-slate-800/50 p-8 backdrop-blur-sm glow-effect" style={{ transitionDelay: delay }}>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-slate-300">{description}</p>
    </div>
);

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-400">
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
);

const VideoPlayer = ({ title, description, youtubeId, delay }: { title: string; description: string; youtubeId: string; delay: string }) => (
    <div className="section-fade-in" style={{ transitionDelay: delay }}>
        <div className="video-container overflow-hidden rounded-lg border-2 border-slate-700 glow-effect">
            <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
            ></iframe>
        </div>
        <h4 className="mt-4 text-lg font-bold text-white">{title}</h4>
        <p className="mt-1 text-slate-400">{description}</p>
    </div>
);


// --- Main Page Component ---

export default function AuraShowcasePage() {
    const sectionsRef = useRef<Map<string, HTMLElement> | null>(null);
    const navLinksRef = useRef<Map<string, HTMLAnchorElement> | null>(null);
    const [typedTitle, setTypedTitle] = useState('');
    const fullTitle = "The Future of Web Automation is Coming";

    const getMap = (ref: React.MutableRefObject<Map<string, HTMLElement | HTMLAnchorElement> | null>) => {
        if (!ref.current) {
            ref.current = new Map();
        }
        return ref.current;
    }

    useEffect(() => {
        const sectionMap = getMap(sectionsRef as any);
        const navLinkMap = getMap(navLinksRef as any);

        document.querySelectorAll('section[id]').forEach((section: any) => sectionMap.set(section.id, section));
        document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach(link => {
            if (link.dataset.section) navLinkMap.set(link.dataset.section, link);
        });

        const observerOptions = { root: null, rootMargin: '-40% 0px -60% 0px', threshold: 0 };
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    navLinkMap.forEach((link, id: string) => {
                        link.classList.toggle('active', id === sectionId);
                    });
                }
            });
        }, observerOptions);

        sectionMap.forEach((section) => sectionObserver.observe(section));

        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section-fade-in').forEach(el => fadeObserver.observe(el));

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click',  (e) => {
                e.preventDefault();
                const href = (e.currentTarget as HTMLElement).getAttribute('href');
                if (href) {
                    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Typewriter effect logic
        let i = 0;
        setTypedTitle('');
        const typingInterval = setInterval(() => {
            if (i < fullTitle.length) {
                setTypedTitle(prev => prev + fullTitle.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
                 // Hide cursor after typing is done
                const cursor = document.querySelector('.blinking-cursor');
                if(cursor) cursor.classList.add('hidden');
            }
        }, 75);


        return () => {
            sectionMap.forEach((section: HTMLElement) => sectionObserver.unobserve(section));
            clearInterval(typingInterval);
        };
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for subscribing! We will notify you at launch.');
    };

    return (
        <div className="bg-slate-900 text-white antialiased">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap');
                body, html {
                    font-family: 'JetBrains Mono', monospace;
                }
                .nav-link.active, .nav-link:hover { color: #34d399; border-bottom-color: #34d399; }
                .section-fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
                .section-fade-in.visible { opacity: 1; transform: translateY(0); }
                .diagram-arrow { position: relative; }
                .diagram-arrow::after { content: '→'; position: absolute; right: -20px; top: 50%; transform: translateY(-50%); font-size: 1.5rem; color: #475569; }
                @media (max-width: 1023px) { .diagram-arrow::after { content: '↓'; right: 50%; top: 100%; transform: translateX(50%) translateY(5px); } }
                .timeline-item::before { content: ''; position: absolute; left: 11px; top: 1rem; bottom: -1rem; width: 2px; background-color: #334155; }
                .timeline-item:last-child::before { display: none; }
                .timeline-dot { position: absolute; left: 0; top: 0.75rem; height: 1.5rem; width: 1.5rem; border-radius: 9999px; border: 3px solid #0f172a; background-color: #475569; transition: background-color 0.3s ease; }
                .timeline-item.visible .timeline-dot { background-color: #10b981; }

                @keyframes blink { 50% { opacity: 0; } }
                .blinking-cursor { animation: blink 1s step-start infinite; }
                
                @keyframes background-pan { 100% { background-position: 14px 0, -14px 100%, 0 -24px, 100% 24px; } }
                .animated-grid { background: linear-gradient(to right, #8080800a 1px, transparent 1px), linear-gradient(to bottom, #8080800a 1px, transparent 1px); background-size: 14px 24px; animation: background-pan 5s linear infinite; }

                .glow-effect { box-shadow: 0 0 0px rgba(16, 185, 129, 0); transition: box-shadow 0.3s ease-in-out; }
                .glow-effect:hover { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }

                @keyframes glitch { 0%, 100% { transform: translate(0, 0); } 20% { transform: translate(-3px, 3px); } 40% { transform: translate(-3px, -3px); } 60% { transform: translate(3px, 3px); } 80% { transform: translate(3px, -3px); } }
                .hover-glitch:hover { animation: glitch 0.25s linear; }

                .video-container { position: relative; padding-bottom: 56.25%; /* 16:9 Aspect Ratio */ height: 0; }
                .video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
            `}</style>
            
            <header id="header" className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-700">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <a href="#hero" className="text-2xl font-extrabold text-white">Aura</a>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <NavLink section="features">Features</NavLink>
                                <NavLink section="demo">Demo</NavLink>
                                <NavLink section="architecture">Architecture</NavLink>
                                <NavLink section="roadmap">Roadmap</NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="relative overflow-hidden">
                <div className="absolute inset-0 -z-10 h-full w-full animated-grid"></div>
                <div className="absolute top-0 left-0 -z-10 h-1/2 w-1/2 rounded-full bg-[radial-gradient(circle_farthest-side,rgba(16,185,129,0.15),rgba(255,255,255,0))]"></div>
                
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
                
                 <footer className="w-full text-center py-12 text-slate-500">
                    <p>&copy; 2025 Project Aura. The countdown has begun.</p>
                </footer>
            </main>
        </div>
    );
}