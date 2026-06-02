import React, { useEffect, useRef } from 'react';
import heroBnw from '../assets/hero-bnw.png';
import heroColor from '../assets/hero-color.png';
import mobHeroBnw from '../assets/mob-hero-bnw.png';
import mobHeroColor from '../assets/mob-hero-color.png';

const lerp = (start, end, factor) => start + (end - start) * factor;

export default function Hero() {
    const containerRef = useRef(null);
    const strandRef = useRef(null);
    const target = useRef({ x: 0, y: 0, size: 0 });
    const current = useRef({ x: 0, y: 0, size: 0 });
    const requestRef = useRef();

    useEffect(() => {
        // Initialize position to center of the screen
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight / 2;
        target.current.x = startX;
        target.current.y = startY;
        current.current.x = startX;
        current.current.y = startY;

        const setTargetSize = () => {
            if (window.innerWidth >= 1024) target.current.size = 150; // 300px diameter
            else if (window.innerWidth >= 768) target.current.size = 120; // 240px
            else target.current.size = 90; // 180px
        };
        
        setTargetSize();
        window.addEventListener('resize', setTargetSize);

        let startTime = null;
        const entryDuration = 800; // 0.8s
        
        // custom easing cubic-bezier(0.22,1,0.36,1) approximation
        const easeOut = (t) => 1 - Math.pow(1 - t, 4); 

        const animate = (time) => {
            if (!startTime) startTime = time;
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / entryDuration, 1);
            
            // Animate entry size
            if (progress < 1) {
                current.current.size = target.current.size * easeOut(progress);
            } else {
                current.current.size = lerp(current.current.size, target.current.size, 0.1);
            }

            // Smooth interpolation (lerp) for position for buttery movement
            current.current.x = lerp(current.current.x, target.current.x, 0.1);
            current.current.y = lerp(current.current.y, target.current.y, 0.1);

            if (containerRef.current) {
                containerRef.current.style.setProperty('--x', `${current.current.x}px`);
                containerRef.current.style.setProperty('--y', `${current.current.y}px`);
                containerRef.current.style.setProperty('--size', `${current.current.size}px`);
                
                // Dynamic Web Strand calculation
                if (strandRef.current) {
                    const startX = containerRef.current.offsetWidth / 2;
                    const startY = containerRef.current.offsetHeight + 50; // Shoot from slightly below the screen
                    const dx = current.current.x - startX;
                    const dy = current.current.y - startY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                    
                    strandRef.current.style.width = `${distance}px`;
                    strandRef.current.style.transform = `translate3d(${startX}px, ${startY}px, 0) rotate(${angle}deg)`;
                }
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', setTargetSize);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const handleMouseMove = (e) => {
        target.current.x = e.clientX;
        target.current.y = e.clientY;
    };

    const handleTouchMove = (e) => {
        target.current.x = e.touches[0].clientX;
        target.current.y = e.touches[0].clientY;
    };

    return (
        <section 
            ref={containerRef}
            className="relative w-full h-[100dvh] overflow-hidden cursor-none bg-black touch-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchMove}
            style={{
                '--x': '50%',
                '--y': '50%',
                '--size': '0px'
            }}
        >
            {/* Base Layer: Black & White Image (Responsive) */}
            <picture className="absolute inset-0 z-0">
                <source media="(max-width: 767px)" srcSet={mobHeroBnw} />
                <img 
                    src={heroBnw} 
                    alt="Monochrome world" 
                    className="w-[100vw] h-[100dvh] object-cover md:object-fill object-center"
                />
            </picture>

            {/* SVG Clip Path Definition for the Spiky Web Shape */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <clipPath id="web-clip" clipPathUnits="objectBoundingBox">
                        {(() => {
                            let path = '';
                            const r = 0.5;
                            for (let i = 0; i < 8; i++) {
                                const a1 = (i * Math.PI * 2) / 8;
                                const a2 = ((i + 1) * Math.PI * 2) / 8;
                                const x1 = 0.5 + Math.cos(a1) * r;
                                const y1 = 0.5 + Math.sin(a1) * r;
                                const x2 = 0.5 + Math.cos(a2) * r;
                                const y2 = 0.5 + Math.sin(a2) * r;
                                const midX = (x1 + x2) / 2;
                                const midY = (y1 + y2) / 2;
                                const sag = 0.85;
                                const cx = 0.5 + (midX - 0.5) * sag;
                                const cy = 0.5 + (midY - 0.5) * sag;
                                if (i === 0) path += `M ${x1.toFixed(4)} ${y1.toFixed(4)} `;
                                path += `Q ${cx.toFixed(4)} ${cy.toFixed(4)}, ${x2.toFixed(4)} ${y2.toFixed(4)} `;
                            }
                            path += 'Z';
                            return <path d={path} />;
                        })()}
                    </clipPath>
                </defs>
            </svg>

            {/* Reveal Layer: Color Image perfectly clipped to the Web Shape */}
            <div 
                className="absolute left-0 top-0 z-10 pointer-events-none will-change-transform"
                style={{
                    width: 'calc(var(--size) * 2)',
                    height: 'calc(var(--size) * 2)',
                    transform: 'translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)',
                    clipPath: 'url(#web-clip)',
                    filter: 'saturate(1.15) brightness(1.1)',
                    objectFit: window.innerWidth < 768 ? 'cover' : 'fill',
                }}
            >
                <picture>
                    <source media="(max-width: 767px)" srcSet={mobHeroColor} />
                    <img 
                        src={heroColor} 
                        alt="Vibrant world" 
                        className="absolute left-0 top-0 max-w-none object-cover md:object-fill object-center"
                        style={{
                            width: '100vw',
                            height: '100dvh',
                            transform: 'translate3d(calc(var(--size) - var(--x)), calc(var(--size) - var(--y)), 0)'
                        }}
                    />
                </picture>
            </div>

            {/* Dynamic Web Strand (Shooting from bottom center to cursor) */}
            <div 
                ref={strandRef}
                className="absolute left-0 top-0 z-10 pointer-events-none will-change-transform"
                style={{
                    height: '1.5px',
                    transformOrigin: '0 50%',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)',
                    boxShadow: '0 0 8px rgba(255,255,255,0.8)'
                }}
            />

            {/* Spider Web Cursor Inner Design (aligned with the clip) */}
            <div 
                className="absolute left-0 top-0 z-20 pointer-events-none will-change-transform flex items-center justify-center"
                style={{
                    width: 'calc(var(--size) * 2)',
                    height: 'calc(var(--size) * 2)',
                    transform: 'translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)',
                }}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
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
        </section>
    );
}
