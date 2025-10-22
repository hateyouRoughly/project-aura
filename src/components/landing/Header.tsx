'use client';

import React from 'react';
import NavLink from '../NavLink';

const Header = () => (
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
);

export default Header;
