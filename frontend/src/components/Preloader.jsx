import React, { useEffect, useState } from 'react';
import spidyNav from '../assets/spidy-nav.png';

export default function Preloader({ onComplete }) {
    const [size, setSize] = useState(90);

    useEffect(() => {
        const updateSize = () => {
            setSize(window.innerWidth >= 1024 ? 75 : (window.innerWidth >= 768 ? 60 : 45));
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        // Preload for exactly 4 seconds
        const timer = setTimeout(() => {
            onComplete();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <section 
            className="relative w-full h-[100dvh] overflow-hidden touch-none cursor-none select-none"
            style={{
                background: 'radial-gradient(circle at 10% 10%, rgba(255, 10, 40, 0.35) 0%, transparent 60%), radial-gradient(circle at 90% 90%, rgba(10, 90, 255, 0.35) 0%, transparent 60%), #07070a'
            }}
        >
            {/* Spider Net Grid Overlay */}
            <div 
                className="absolute inset-0 z-0 pointer-events-none opacity-100"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23000000' stroke-width='0.1' stroke-linecap='round' stroke-linejoin='round' fill='none' stroke-opacity='1'%3E%3Cpath d='M50 50 L50 10 M50 50 L90 50 M50 50 L50 90 M50 50 L10 50 M50 50 L78 22 M50 50 L78 78 M50 50 L22 78 M50 50 L22 22' /%3E%3Cpath d='M50 10 Q 62 20 78 22 Q 80 38 90 50 Q 80 62 78 78 Q 62 80 50 90 Q 38 80 22 78 Q 20 62 10 50 Q 20 38 22 22 Q 38 20 50 10' /%3E%3Cpath d='M50 20 Q 58 28 71 29 Q 72 42 80 50 Q 72 58 71 71 Q 58 72 50 80 Q 42 72 29 71 Q 28 58 20 50 Q 28 42 29 29 Q 42 28 50 20' /%3E%3Cpath d='M50 30 Q 56 35 64 36 Q 65 44 70 50 Q 65 56 64 64 Q 56 65 50 70 Q 44 65 36 64 Q 35 56 30 50 Q 35 44 36 36 Q 44 35 50 30' /%3E%3Cpath d='M50 40 Q 53 42 57 43 Q 58 47 60 50 Q 58 53 57 57 Q 53 58 50 60 Q 47 58 43 57 Q 42 53 40 50 Q 42 47 43 43 Q 47 42 50 40' /%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '150vmax 150vmax',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.8))'
                }}
            />

            {/* Spider Skin Texture Overlay */}
            <div 
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='skinFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03' numOctaves='4' result='noise'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 12 -5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23skinFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px'
                }}
            />
            {/* Straight line from center bottom to cursor */}
            <div
                className="absolute z-10 pointer-events-none"
                style={{
                    left: '50%',
                    bottom: '-50px',
                    width: '1.5px',
                    height: 'calc(50dvh + 50px)',
                    transformOrigin: 'bottom center',
                    background: 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)',
                    boxShadow: '0 0 8px rgba(255,255,255,0.8)',
                    transform: 'translateX(-50%)'
                }}
            />

            {/* Spider Web Cursor Inner Design with SpidyNav Icon */}
            <div
                className="absolute left-1/2 top-1/2 z-20 pointer-events-none flex items-center justify-center animate-spin-slow"
                style={{
                    width: `${size * 2}px`,
                    height: `${size * 2}px`,
                    marginLeft: `-${size}px`,
                    marginTop: `-${size}px`,
                }}
            >
                {/* Spider Icon in the hollow */}
                <img 
                    src={spidyNav} 
                    alt="Spider Icon" 
                    className="absolute z-10 w-1/2 h-auto object-contain opacity-80 drop-shadow-[0_0_10px_#ff0000]"
                    style={{
                        // Counter-rotate if we want it upright, or let it spin. 
                        // It's cooler if the spider spins, or maybe upright? The cursor spins so letting it spin is fine, or counter-rotate it:
                        animation: 'spin-slow-reverse 4s linear infinite'
                    }}
                />

                <svg viewBox="0 0 100 100" className="w-full h-full opacity-40 absolute z-20">
                    <g stroke="white" strokeWidth="1.5" fill="none" style={{ filter: 'drop-shadow(0px 0px 3px rgba(255,255,255,0.4))' }}>
                        {Array.from({ length: 8 }).map((_, i) => {
                            const angle = (i * Math.PI * 2) / 8;
                            return (
                                <line
                                    key={`spoke-${i}`}
                                    x1="50" y1="50"
                                    x2={50 + Math.cos(angle) * 50}
                                    y2={50 + Math.sin(angle) * 50}
                                />
                            );
                        })}

                        {[15, 30, 45].map((radius, ringIdx) => {
                            let path = '';
                            for (let i = 0; i < 8; i++) {
                                const angle1 = (i * Math.PI * 2) / 8;
                                const angle2 = ((i + 1) * Math.PI * 2) / 8;
                                const x1 = 50 + Math.cos(angle1) * radius;
                                const y1 = 50 + Math.sin(angle1) * radius;
                                const x2 = 50 + Math.cos(angle2) * radius;
                                const y2 = 50 + Math.sin(angle2) * radius;
                                const midX = (x1 + x2) / 2;
                                const midY = (y1 + y2) / 2;
                                const sag = 0.85;
                                const cx = 50 + (midX - 50) * sag;
                                const cy = 50 + (midY - 50) * sag;
                                if (i === 0) path += `M ${x1} ${y1} `;
                                path += `Q ${cx} ${cy}, ${x2} ${y2} `;
                            }
                            return <path key={`ring-${ringIdx}`} d={path} />;
                        })}
                    </g>
                </svg>
            </div>

            {/* Bottom Right Text */}
            <div 
                className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-30 font-['Anton'] text-yellow-400 text-lg md:text-2xl tracking-widest"
                style={{
                    WebkitTextStroke: '0.5px black',
                    textShadow: '1.5px 0px 0px rgba(0,0,0,0.8)',
                }}
            >
                wassupp...<span className="animate-pulse inline-block -translate-y-[2px]">|</span>
            </div>
        </section>
    );
}
