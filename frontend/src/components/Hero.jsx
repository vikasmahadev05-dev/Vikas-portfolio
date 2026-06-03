import React, { useEffect, useRef, useState } from 'react';
import heroBnw from '../assets/hero-bnw.png';
import heroColor from '../assets/hero-color.png';
import mobHeroBnw from '../assets/mob-hero-bnw.png';
import mobHeroColor from '../assets/mob-hero-color.png';
import spidyNav from '../assets/spidy-nav.png';
import resumePdf from '../assets/Vikas M_Resume_2025.pdf';

const lerp = (start, end, factor) => start + (end - start) * factor;

const DocumentViewerModal = ({ pdfUrl, title, onClose }) => {
    if (!pdfUrl) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-300 pointer-events-auto">
            {/* Modal Container */}
            <div className="relative w-full h-[90dvh] max-w-[calc(90dvh*0.707)] mx-auto bg-transparent border-[3px] border-[#ff0000] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 cursor-auto">
                
                {/* Header */}
                <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b-[3px] border-[#ff0000] bg-[#E3D4C1] z-10">
                    <h2 className="text-[#1a1a1a] font-sans font-bold text-lg md:text-2xl tracking-tight truncate pr-4">
                        {title}
                    </h2>
                    
                    <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                        {/* Green Download Icon Button */}
                        <a 
                            href={pdfUrl} 
                            download 
                            title="Download PDF"
                            className="p-2 md:p-2.5 bg-[#ff0000] text-white rounded-full hover:bg-[#1f432a] transition-all duration-300 shadow-[0_0_10px_rgba(255,0,0,0.3)] hover:shadow-[0_0_15px_rgba(255,0,0,0.6)] flex items-center justify-center transform hover:-translate-y-0.5"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        </a>
                        {/* Close Icon Button */}
                        <button 
                            onClick={onClose}
                            title="Close Preview"
                            className="p-2 md:p-2.5 border-2 border-transparent hover:border-[#ff0000] text-[#ff0000] hover:text-white hover:bg-[#ff0000] rounded-full transition-all duration-300 flex items-center justify-center"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 w-full bg-white relative">
                    <iframe 
                        src={`${pdfUrl}#toolbar=0`} 
                        className="absolute inset-0 w-full h-full border-none"
                        title={title}
                    />
                </div>
            </div>
        </div>
    );
};

export default function Hero() {
    const containerRef = useRef(null);
    const strandRef = useRef(null);
    const target = useRef({ x: 0, y: 0, size: 0 });
    const current = useRef({ x: 0, y: 0, size: 0 });
    const mousePos = useRef({ x: 0, y: 0 });
    const hoverTarget = useRef({ isHovering: false, x: 0, y: 0 });
    const iconRef = useRef(null);
    const iconWrapperRef = useRef(null);
    const iconState = useRef({ currentX: 0, currentY: 0, currentScale: 1 });
    const requestRef = useRef();
    const isTouchDevice = useRef(false);
    const navItemRefs = useRef([]);
    const hoveredNavRef = useRef(null);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [hoveredNav, setHoveredNav] = useState(null);
    const [showResume, setShowResume] = useState(false);

    useEffect(() => {
        // Initialize position to center of the screen
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight / 2;
        target.current.x = startX;
        target.current.y = startY;
        current.current.x = startX;
        current.current.y = startY;
        mousePos.current.x = startX;
        mousePos.current.y = startY;

        const setTargetSize = () => {
            if (window.innerWidth >= 1024) target.current.size = 150; // Noticeably larger cursor
            else if (window.innerWidth >= 768) target.current.size = 120;
            else target.current.size = 90;
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
                if (hoverTarget.current.isHovering) {
                    target.current.size = window.innerWidth >= 768 ? 20 : 9; // desktop 25 * 0.8
                } else {
                    setTargetSize();
                }
                const lerpSpeed = isTouchDevice.current ? 0.22 : 0.1;
                current.current.size = lerp(current.current.size, target.current.size, lerpSpeed);
            }

            if (hoverTarget.current.isHovering) {
                // Elastic sticky cursor: sticks mostly to the center but wiggles slightly with mouse
                target.current.x = hoverTarget.current.x + (mousePos.current.x - hoverTarget.current.x) * 0.15;
                target.current.y = hoverTarget.current.y + (mousePos.current.y - hoverTarget.current.y) * 0.15;
            } else {
                target.current.x = mousePos.current.x;
                target.current.y = mousePos.current.y;
            }

            // Smooth interpolation (lerp) for position for buttery movement
            current.current.x = lerp(current.current.x, target.current.x, 0.1);
            current.current.y = lerp(current.current.y, target.current.y, 0.1);

            // Magnetic Icon physics
            let targetIconX = 0, targetIconY = 0, targetIconScale = 1;
            if (hoverTarget.current.isHovering) {
                targetIconX = (mousePos.current.x - hoverTarget.current.x) * 0.3;
                targetIconY = (mousePos.current.y - hoverTarget.current.y) * 0.3;
                targetIconScale = 1.1; // slight pop
            }

            iconState.current.currentX = lerp(iconState.current.currentX, targetIconX, 0.15);
            iconState.current.currentY = lerp(iconState.current.currentY, targetIconY, 0.15);
            iconState.current.currentScale = lerp(iconState.current.currentScale, targetIconScale, 0.15);

            if (iconRef.current) {
                iconRef.current.style.transform = `translate3d(${iconState.current.currentX}px, ${iconState.current.currentY}px, 0) scale(${iconState.current.currentScale})`;
            }

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
        mousePos.current.x = e.clientX;
        mousePos.current.y = e.clientY;
    };

    const handleTouchMove = (e) => {
        isTouchDevice.current = true;
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        mousePos.current.x = x;
        mousePos.current.y = y;
        checkTouchOverElements(x, y);
    };

    const checkTouchOverElements = (x, y) => {
        // Check spider icon wrapper
        if (iconWrapperRef.current) {
            const rect = iconWrapperRef.current.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                hoverTarget.current = { isHovering: true, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                if (hoveredNavRef.current !== '__icon__') {
                    hoveredNavRef.current = '__icon__';
                    setHoveredNav('__icon__');
                }
                return;
            }
        }
        // Check mobile nav items
        let found = null;
        navItemRefs.current.forEach((el, i) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                found = ['HOME', 'EDUCATION', 'PROJECTS', 'CONTACT'][i];
                hoverTarget.current = { isHovering: true, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            }
        });
        if (found) {
            if (hoveredNavRef.current !== found) {
                hoveredNavRef.current = found;
                setHoveredNav(found);
            }
        } else {
            if (hoveredNavRef.current !== null) {
                hoveredNavRef.current = null;
                setHoveredNav(null);
                hoverTarget.current.isHovering = false;
            }
        }
    };

    const handleIconEnter = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        hoverTarget.current = {
            isHovering: true,
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    };

    const handleIconLeave = () => {
        hoverTarget.current.isHovering = false;
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[100dvh] overflow-hidden cursor-none bg-black"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchMove}
            onTouchEnd={() => {
                hoverTarget.current.isHovering = false;
                hoveredNavRef.current = null;
                setHoveredNav(null);
            }}
            style={{
                '--x': '50%',
                '--y': '50%',
                '--size': '0px'
            }}
        >
            <style>{`
                .dynamic-container {
                    --x: 50%;
                    --y: 50%;
                    --size: 0px;
                }
            `}</style>
            {/* Spider Icon Top Right */}
            <div
                ref={iconWrapperRef}
                className="absolute top-1 right-1 md:top-2 md:right-3 z-[60] p-1 md:p-2 pointer-events-auto cursor-none flex items-center justify-center"
                onMouseEnter={handleIconEnter}
                onMouseLeave={handleIconLeave}
                onTouchStart={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    hoverTarget.current = { isHovering: true, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                }}
                onTouchEnd={() => { hoverTarget.current.isHovering = false; setHoveredNav(null); hoveredNavRef.current = null; }}
                onClick={() => setIsNavOpen(prev => !prev)}
            >
                <img
                    ref={iconRef}
                    src={spidyNav}
                    alt="Spider Logo"
                    className="w-10 md:w-16 lg:w-20 h-auto hover:drop-shadow-[0_0_15px_#ff0000] transition-[filter] duration-300 cursor-none"
                />
            </div>
            {/* Base Layer: Black & White Image (Responsive) */}
            <picture className="absolute inset-0 z-0">
                <source media="(max-width: 767px)" srcSet={mobHeroBnw} />
                <img
                    src={heroBnw}
                    alt="Monochrome world"
                    className="w-[100vw] h-[100dvh] object-cover md:object-fill object-center"
                />
            </picture>

            {/* Glasses Styles */}
            <style>{`
                .hero-glasses {
                    top: 50.6%;
                    left: 49.6%;
                    width: 35.5vw;
                }
                .hero-glasses-svg { 
                    transform: rotate(-4deg); 
                }
                .mobile-prompt {
                    display: flex;
                }
                .desktop-prompt {
                    display: none;
                }
                
                /* Mobile Lens Animation (Yellow to Red) */
                @-webkit-keyframes pulseColor {
                    0%, 100% { fill: #facc15; }
                    50% { fill: #ff0000; }
                }
                @keyframes pulseColor {
                    0%, 100% { fill: #facc15; }
                    50% { fill: #ff0000; }
                }
                .lens-anim {
                    -webkit-animation: pulseColor 2s infinite;
                    animation: pulseColor 2s infinite;
                    transition: fill 0.3s;
                }
                
                @media (min-width: 768px) {
                    .hero-glasses {
                        top: 40.5%;
                        left: 51.6%;
                        width: 22.5vw;
                    }
                    .hero-glasses-svg { 
                        transform: rotate(-6deg); 
                    }
                    .mobile-prompt {
                        display: none;
                    }
                    .desktop-prompt {
                        display: flex;
                    }
                    /* Desktop Lens Hover Effect */
                    .lens-anim {
                        animation: none;
                        fill: #facc15;
                    }
                    .group:hover .lens-anim {
                        fill: #ff0000;
                    }
                }
            `}</style>

            {/* Resume Preview Sunglasses (Worn by Vikas) */}
            <div 
                onClick={() => setShowResume(true)}
                className="absolute hero-glasses -translate-x-1/2 -translate-y-1/2 z-[40] min-w-[140px] md:min-w-[auto] flex flex-col items-center justify-center pointer-events-auto cursor-none group"
                onMouseEnter={(e) => {
                    handleIconEnter(e);
                    setHoveredNav('RESUME');
                }}
                onMouseLeave={(e) => {
                    handleIconLeave(e);
                    setHoveredNav(null);
                }}
            >
                {/* Desktop Hover Speech Bubble */}
                <div className="desktop-prompt absolute bottom-[90%] right-[-40px] opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 origin-bottom-left pointer-events-none z-50 flex-col items-start" style={{ filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,1))' }}>
                    <div className="bg-white border-[3px] border-black px-4 py-2 rounded-[1rem] relative z-10">
                        <span className="font-sans font-black text-black text-xs tracking-widest uppercase whitespace-nowrap">View Resume!</span>
                    </div>
                    {/* Seamless Tail */}
                    <div className="w-5 h-5 bg-white border-l-[3px] border-b-[3px] border-black transform rotate-[-45deg] -translate-y-[13px] translate-x-[20px] relative z-20 rounded-bl-[2px]"></div>
                </div>

                {/* Mobile Always-Visible Speech Bubble */}
                <div className="mobile-prompt absolute top-[50%] left-[80%] -translate-y-1/2 pointer-events-none z-50 flex-row items-center animate-bounce" style={{ filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,1))', animationDuration: '2s' }}>
                    {/* Seamless Tail (pointing LEFT to the glasses) */}
                    <div className="w-4 h-4 bg-white border-b-[3px] border-l-[3px] border-black transform rotate-[45deg] translate-x-[12px] relative z-20 rounded-bl-[2px]"></div>
                    <div className="bg-white border-[3px] border-black pl-3 pr-1.5 py-1 sm:pl-5 sm:pr-3 sm:py-1.5 rounded-[1rem] relative z-10">
                        <span className="font-sans font-black text-black text-[8px] sm:text-[10px] tracking-widest uppercase whitespace-nowrap relative z-30">Tap Resume!</span>
                    </div>
                </div>

                {/* Clean Comic Sunglasses ("Cooler") Icon */}
                <div className="relative w-full h-full flex items-center justify-center">
                    <svg 
                        className="w-full h-auto hero-glasses-svg group-hover:scale-105 transition-all duration-300" 
                        viewBox="0 0 120 55" 
                        style={{ filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.8))' }}
                    >
                        {/* Bridge */}
                        <path d="M 50 20 Q 60 15 70 20" stroke="#000" strokeWidth="6" fill="none" strokeLinecap="round" />
                        
                        {/* Left Frame */}
                        <path d="M 10 15 L 50 15 L 45 42 C 35 50 15 50 10 32 Z" fill="#000" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
                        
                        {/* Right Frame */}
                        <path d="M 110 15 L 70 15 L 75 42 C 85 50 105 50 110 32 Z" fill="#000" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
                        
                        {/* Left Lens */}
                        <path d="M 16 20 L 44 20 L 40 39 C 32 44 20 44 16 29 Z" className="lens-anim" />
                        
                        {/* Right Lens */}
                        <path d="M 104 20 L 76 20 L 80 39 C 88 44 100 44 104 29 Z" className="lens-anim" />
                        
                        {/* Gloss */}
                        <path d="M 20 24 L 26 24 L 22 34 L 16 34 Z" fill="#fff" opacity="0.9" />
                        <path d="M 80 24 L 86 24 L 82 34 L 76 34 Z" fill="#fff" opacity="0.9" />
                    </svg>
                </div>
            </div>

            {/* Background Spider-Verse Name Overlay (Yellow) */}
            <div className="absolute left-[2%] md:left-[5%] bottom-[2%] md:bottom-[5%] z-5 select-none pointer-events-none flex flex-col">
                <h1
                    className="text-color-fill text-stroke-vikas-base font-['Anton'] text-[3rem] md:text-[6.16rem] lg:text-[7.92rem] leading-none tracking-normal"
                >
                    VIKAS
                </h1>
                <div
                    className="relative z-10 bg-[#facc15] border-[2.5px] border-black text-black font-['Anton'] text-[10px] md:text-[14px] lg:text-[18px] leading-none tracking-[0.15em] self-start ml-1 md:ml-2 lg:ml-3 mt-1 md:mt-0 px-2 py-1 md:px-3 md:py-1.5 whitespace-nowrap transform -skew-x-6 rotate-[-2deg]"
                    style={{
                        boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                    }}
                >
                    WEB DEVELOPER
                </div>
            </div>

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
                {/* Counter-transform wrapper for the entire revealed world (Image + Text) */}
                <div
                    className="absolute left-0 top-0"
                    style={{
                        width: '100vw',
                        height: '100dvh',
                        transform: 'translate3d(calc(var(--size) - var(--x)), calc(var(--size) - var(--y)), 0)'
                    }}
                >
                    <picture>
                        <source media="(max-width: 767px)" srcSet={mobHeroColor} />
                        <img
                            src={heroColor}
                            alt="Vibrant world"
                            className="absolute inset-0 w-[100vw] h-[100dvh] max-w-none object-cover md:object-fill object-center md:-ml-[8px]"
                        />
                    </picture>

                    {/* Revealed Spider-Verse Name Overlay (White) */}
                    <div className="absolute left-[2%] md:left-[5%] bottom-[2%] md:bottom-[5%] select-none pointer-events-none flex flex-col">
                        <h1
                            className="text-color-fill text-stroke-vikas-reveal font-['Anton'] text-[3rem] md:text-[6.16rem] lg:text-[7.92rem] leading-none tracking-normal"
                        >
                            VIKAS
                        </h1>
                        <div 
                            className="relative z-10 bg-[#e5e5e5] border-[2.5px] border-black text-black font-['Anton'] text-[10px] md:text-[14px] lg:text-[18px] leading-none tracking-[0.15em] self-start ml-1 md:ml-2 lg:ml-3 mt-1 md:mt-0 px-2 py-1 md:px-3 md:py-1.5 whitespace-nowrap transform -skew-x-6 rotate-[-2deg]"
                            style={{
                                boxShadow: '-2px -2px 15px rgba(255,0,0,0.6), 6px 6px 15px rgba(0,85,255,0.6), 4px 4px 0px rgba(0,0,0,1)'
                            }}
                        >
                            WEB DEVELOPER
                        </div>
                    </div>
                </div>
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
                className="absolute left-0 top-0 z-[70] pointer-events-none will-change-transform flex items-center justify-center"
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

            {/* === MOBILE: Vertical Slide Nav === */}
            <div className="md:hidden absolute top-16 right-4 z-50 flex flex-col items-end gap-4 pointer-events-none">
                {['EDUCATION', 'ABOUT-ME', 'PROJECTS', 'CONTACT'].map((item, i) => (
                    <a
                        key={item}
                        ref={el => navItemRefs.current[i] = el}
                        href={`#${item.toLowerCase()}`}
                        onClick={() => setIsNavOpen(false)}
                        className="px-2 py-0.5 font-['Anton'] text-[10px] tracking-widest whitespace-nowrap cursor-none border-[2px] border-black"
                        style={{
                            backgroundColor: hoveredNav === item ? '#ff0000' : '#facc15',
                            color: hoveredNav === item ? '#fff' : '#000',
                            boxShadow: hoveredNav === item 
                                ? '4px 4px 0px rgba(0,0,0,1)' 
                                : '2px 2px 0px rgba(0,0,0,1)',
                            opacity: isNavOpen ? 1 : 0,
                            transform: isNavOpen 
                                ? (hoveredNav === item ? 'translateY(0) scale(1.05) rotate(-2deg)' : 'translateY(0) scale(1) rotate(0deg)') 
                                : 'translateY(-10px) scale(0.95)',
                            transition: 'opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1), background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
                            transitionDelay: isNavOpen ? `${(3 - i) * 90}ms` : `${i * 50}ms`,
                            pointerEvents: isNavOpen ? 'auto' : 'none',
                        }}
                    >
                        {item}
                    </a>
                ))}
            </div>

            {/* === DESKTOP: Horizontal Centered Nav === */}
            <div
                className="hidden md:flex absolute top-4 left-8 lg:left-10 right-8 lg:right-10 z-50 h-10 items-center overflow-hidden pointer-events-none"
            >
                <div
                    className={`w-full flex justify-center items-center space-x-6 lg:space-x-10 mt-2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isNavOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-[150%]'}`}
                >
                    {['EDUCATION', 'ABOUT-ME', 'PROJECTS', 'CONTACT'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={() => setIsNavOpen(false)}
                            className="px-2.5 py-1 font-['Anton'] text-[10px] lg:text-sm tracking-widest whitespace-nowrap cursor-none transition-all duration-300 transform origin-center border-[2.5px] border-black"
                            style={{
                                backgroundColor: hoveredNav === item ? '#ff0000' : '#facc15',
                                color: hoveredNav === item ? '#fff' : '#000',
                                boxShadow: hoveredNav === item 
                                    ? '6px 6px 0px rgba(0,0,0,1)' 
                                    : '3px 3px 0px rgba(0,0,0,1)',
                                transition: 'background-color 0.2s ease, color 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease',
                                transform: hoveredNav === item ? 'scale(1.1) rotate(-3deg) translateY(-4px)' : 'scale(1) rotate(0deg) translateY(0)',
                            }}
                            onMouseEnter={(e) => {
                                handleIconEnter(e);
                                setHoveredNav(item);
                            }}
                            onMouseLeave={(e) => {
                                handleIconLeave(e);
                                setHoveredNav(null);
                            }}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>

            {/* Resume PDF Preview Modal */}
            {showResume && (
                <DocumentViewerModal 
                    pdfUrl={resumePdf} 
                    title="Vikas M - Resume" 
                    onClose={() => setShowResume(false)} 
                />
            )}
        </section>
    );
}
