'use client';

import React from 'react';

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

export default VideoPlayer;
