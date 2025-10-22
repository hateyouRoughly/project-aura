'use client';

import React from 'react';

const NavLink = ({ section, children }: { section: string; children: React.ReactNode }) => (
    <a 
        href={`#${section}`} 
        data-section={section}
        className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-300 transition-all duration-200 ease-in-out border-b-2 border-transparent hover:text-white"
    >
        {children}
    </a>
);

export default NavLink;
