'use client';

import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Demo from '../components/landing/Demo';
import Architecture from '../components/landing/Architecture';
import Roadmap from '../components/landing/Roadmap';
import Footer from '../components/landing/Footer';

export default function AuraShowcasePage() {
    const sectionsRef = useRef<Map<string, HTMLElement> | null>(null);
    const navLinksRef = useRef<Map<string, HTMLAnchorElement> | null>(null);
    const [typedTitle, setTypedTitle] = useState('');
        const fullTitle = "Thhe Future of Web Automation is Coming";

    const getMap = (ref: React.MutableRefObject<Map<string, HTMLElement | HTMLAnchorElement> | null>) => {
        if (!ref.current) {
            ref.current = new Map();
        }
        return ref.current;
    }

    useEffect(() => {
        const sectionMap = getMap(sectionsRef as React.MutableRefObject<Map<string, HTMLElement>>);
        const navLinkMap = getMap(navLinksRef as React.MutableRefObject<Map<string, HTMLAnchorElement>>);

        document.querySelectorAll('section[id]').forEach((section: Element) => sectionMap.set(section.id, section as HTMLElement));
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
            
            <Header />

            <main className="relative overflow-hidden">
                <div className="absolute inset-0 -z-10 h-full w-full animated-grid"></div>
                <div className="absolute top-0 left-0 -z-10 h-1/2 w-1/2 rounded-full bg-[radial-gradient(circle_farthest-side,rgba(16,185,129,0.15),rgba(255,255,255,0))]"></div>
                
                <Hero typedTitle={typedTitle} handleFormSubmit={handleFormSubmit} />
                <Features />
                <Demo />
                <Architecture />
                <Roadmap />
                
                <Footer />
            </main>
        </div>
    );
}
