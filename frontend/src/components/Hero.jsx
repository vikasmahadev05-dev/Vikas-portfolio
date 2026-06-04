import React, { useEffect, useRef, useState } from 'react';
import heroBnw from '../assets/hero-bnw.png';
import heroColor from '../assets/hero-color.png';
import heroMobColor from '../assets/hero-mob-color.png';
import spidyNav from '../assets/spidy-nav.png';
import resumePdf from '../assets/Vikas M_Resume_2025.pdf';

// ============================================================
// 🕶️ GLASSES CONFIGURATION (TWEAK POSITION & SIZE HERE)
// ============================================================
const GLASSES_CONFIG = {
    mobile: {
        top: '83.0%',       // Vertical position (mobile)
        left: '6.0%',      // Horizontal position (mobile)
        width: '8.9vw',    // Size of the glasses (mobile)
        rotation: '-18.0deg'   // Tilt angle (mobile)
    },
    desktop: {
        top: '65.5%',       // Vertical position (desktop)
        left: '6.4%',      // Horizontal position (desktop)
        width: '6.1vw',    // Size of the glasses (desktop)
        rotation: '-9.5deg'   // Tilt angle (desktop)
    }
};
// ============================================================

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

    const trailHistory = useRef([]);
    const trailGroupRef = useRef(null);
    const trailWebLinesRef = useRef(null);
    const cursorMaskRef = useRef(null);
    const isDraggingWeb = useRef(false);
    const maxTrailAge = 70; // Increased to delay the cut healing

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
            if (window.innerWidth >= 1024) target.current.size = 130; // Increased to match 2cm visual size
            else if (window.innerWidth >= 768) target.current.size = 90;
            else target.current.size = 60;
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
            }

            // --- Crisp Tapering Trail Tear Logic ---
            trailHistory.current.push({ x: current.current.x, y: current.current.y, age: 0 });

            trailHistory.current = trailHistory.current.filter(pt => {
                pt.age += 1;
                return pt.age < maxTrailAge;
            });

            if (trailGroupRef.current && trailHistory.current.length > 1) {
                let flakesHTML = '';
                const historyLen = trailHistory.current.length;
                for (let i = 0; i < historyLen; i++) {
                    const pt = trailHistory.current[i];
                    // Progress from 0 (tail tip) to 1 (cursor head)
                    const progress = i / (historyLen - 1);

                    // Fire flake physics: older points scatter outwards and drift upwards slightly
                    const scatterAmount = (1 - Math.pow(progress, 0.5)) * (current.current.size * 0.8);
                    const driftX = Math.sin(pt.age * 0.3 + i) * scatterAmount;
                    const driftY = Math.cos(pt.age * 0.2 + i) * scatterAmount - (pt.age * 0.5); // float up

                    // Flakes shrink and fade out
                    const r = (current.current.size * 0.6) * Math.pow(progress, 1.2);
                    const opacity = progress;

                    if (r > 0.5) {
                        flakesHTML += `<circle cx="${pt.x + driftX}" cy="${pt.y + driftY}" r="${r}" fill="white" opacity="${opacity}" />`;
                    }
                }
                trailGroupRef.current.innerHTML = flakesHTML;
            }

            // --- Visible Web Strands along the Tail ---
            if (trailWebLinesRef.current && trailHistory.current.length > 1) {
                const historyLen = trailHistory.current.length;
                let strand1 = '';
                let strand2 = '';
                let strand3 = '';

                for (let i = 0; i < historyLen; i++) {
                    const pt = trailHistory.current[i];
                    const progress = i / (historyLen - 1); // 0 (tail tip) to 1 (cursor head)

                    // Add slight wobble to make them look like separate strands of web fluid
                    const wobble = (1 - progress) * (current.current.size * 0.4);

                    const dx1 = Math.sin(pt.age * 0.5) * wobble;
                    const dy1 = Math.cos(pt.age * 0.4) * wobble;

                    const dx2 = Math.sin(pt.age * 0.3 + 2) * wobble;
                    const dy2 = Math.cos(pt.age * 0.6 + 2) * wobble;

                    const prefix = i === 0 ? 'M' : 'L';
                    strand1 += `${prefix} ${pt.x} ${pt.y} `;
                    strand2 += `${prefix} ${pt.x + dx1} ${pt.y + dy1} `;
                    strand3 += `${prefix} ${pt.x + dx2} ${pt.y + dy2} `;
                }

                // Draw 3 thin web strands that fade out at the tail
                trailWebLinesRef.current.innerHTML = `
                    <path d="${strand1}" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="${strand2}" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.7" />
                    <path d="${strand3}" fill="none" stroke="white" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.5" />
                `;
            }

            if (cursorMaskRef.current) {
                // Calculate the web inner curve path for the head
                const r = current.current.size * 0.9;
                let path = '';
                for (let i = 0; i < 8; i++) {
                    const a1 = (i * Math.PI * 2) / 8;
                    const a2 = ((i + 1) * Math.PI * 2) / 8;
                    const x1 = current.current.x + Math.cos(a1) * r;
                    const y1 = current.current.y + Math.sin(a1) * r;
                    const x2 = current.current.x + Math.cos(a2) * r;
                    const y2 = current.current.y + Math.sin(a2) * r;
                    const midX = (x1 + x2) / 2;
                    const midY = (y1 + y2) / 2;
                    const sag = 0.85; // Inner web scoop
                    const cx = current.current.x + (midX - current.current.x) * sag;
                    const cy = current.current.y + (midY - current.current.y) * sag;

                    if (i === 0) path += `M ${x1.toFixed(2)} ${y1.toFixed(2)} `;
                    path += `Q ${cx.toFixed(2)} ${cy.toFixed(2)}, ${x2.toFixed(2)} ${y2.toFixed(2)} `;
                }
                path += 'Z';

                cursorMaskRef.current.setAttribute('d', path);
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        // Native touch listeners to allow page scroll unless grabbing the web
        const container = containerRef.current;
        if (container) {
            const handleNativeTouchStart = (e) => {
                isTouchDevice.current = true;
                const touch = e.touches[0];
                const dx = touch.clientX - current.current.x;
                const dy = touch.clientY - current.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // If touch is within roughly 1.5x the cursor's size, grab the web
                if (distance < target.current.size * 2.5) {
                    isDraggingWeb.current = true;
                } else {
                    isDraggingWeb.current = false;
                }

                // Always update initial pos so it doesn't jump
                mousePos.current.x = touch.clientX;
                mousePos.current.y = touch.clientY;
            };

            const handleNativeTouchMove = (e) => {
                if (isDraggingWeb.current) {
                    // Holding the web -> draw trail, DO NOT scroll page
                    e.preventDefault();
                    const touch = e.touches[0];
                    mousePos.current.x = touch.clientX;
                    mousePos.current.y = touch.clientY;
                    checkTouchOverElements(touch.clientX, touch.clientY);
                }
            };

            const handleNativeTouchEnd = () => {
                isDraggingWeb.current = false;
                hoverTarget.current.isHovering = false;
                hoveredNavRef.current = null;
                setHoveredNav(null);
            };

            container.addEventListener('touchstart', handleNativeTouchStart, { passive: false });
            container.addEventListener('touchmove', handleNativeTouchMove, { passive: false });
            container.addEventListener('touchend', handleNativeTouchEnd);
            container.addEventListener('touchcancel', handleNativeTouchEnd);

            return () => {
                window.removeEventListener('resize', setTargetSize);
                cancelAnimationFrame(requestRef.current);
                container.removeEventListener('touchstart', handleNativeTouchStart);
                container.removeEventListener('touchmove', handleNativeTouchMove);
                container.removeEventListener('touchend', handleNativeTouchEnd);
                container.removeEventListener('touchcancel', handleNativeTouchEnd);
            };
        }

        return () => {
            window.removeEventListener('resize', setTargetSize);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const handleMouseMove = (e) => {
        mousePos.current.x = e.clientX;
        mousePos.current.y = e.clientY;
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
            id="home"
            ref={containerRef}
            className="relative w-full h-[100dvh] bg-[#e5e5e5] overflow-hidden cursor-none flex flex-col justify-center select-none border-l-[8px] border-b-[8px] border-black md:border-l-0 md:border-b-0"
            onMouseMove={handleMouseMove}
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
                .hero-color-mask {
                    -webkit-mask: url(#tear-mask);
                    mask: url(#tear-mask);
                    opacity: 1;
                }
                .hero-color-img {
                    transform: translateX(calc(87 * 100vw / 338)) translateY(calc(87 * 100dvh / 607)) rotate(35deg) scaleX(3.68) scaleY(3.58);
                }
                @media (min-width: 768px) {
                    .hero-color-mask {
                        -webkit-mask: url(#tear-mask) !important;
                        mask: url(#tear-mask) !important;
                        opacity: 1 !important;
                    }
                    .hero-color-img {
                        transform: translateX(-38px) translateY(103px) rotate(26deg) scaleX(1.4) scaleY(1.49) !important;
                    }
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
            <div className="absolute inset-0 z-0">
                <img
                    src={heroBnw}
                    alt="Monochrome world"
                    className="absolute inset-0 w-full h-full max-w-none object-cover object-[30%_center] md:object-center"
                />
            </div>

            {/* Glasses Styles */}
            <style>{`
                .hero-glasses {
                    top: ${GLASSES_CONFIG.mobile.top};
                    left: ${GLASSES_CONFIG.mobile.left};
                    width: ${GLASSES_CONFIG.mobile.width};
                }
                .hero-glasses-svg { 
                    transform: rotate(${GLASSES_CONFIG.mobile.rotation}); 
                }

                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .mobile-prompt {
                    display: flex;
                    animation: bounce-slow 2s infinite;
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
                        top: ${GLASSES_CONFIG.desktop.top};
                        left: ${GLASSES_CONFIG.desktop.left};
                        width: ${GLASSES_CONFIG.desktop.width};
                    }
                    .hero-glasses-svg { 
                        transform: rotate(${GLASSES_CONFIG.desktop.rotation}); 
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
                className="absolute hero-glasses -translate-x-1/2 -translate-y-1/2 z-[40] flex flex-col items-center justify-center pointer-events-auto cursor-none group"
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
                <div className="mobile-prompt absolute bottom-[130%] left-[50%] -translate-x-[10px] pointer-events-none z-50 flex flex-col items-center animate-bounce scale-[0.85] origin-bottom" style={{ filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,1))', animationDuration: '2s' }}>
                    <div className="bg-white border-[2.5px] border-black px-3 py-1 rounded-xl relative z-10">
                        <span className="font-sans font-black text-black text-[8px] sm:text-[9px] tracking-widest uppercase whitespace-nowrap relative z-30">Tap Resume!</span>
                    </div>
                    {/* Seamless Tail (pointing DOWN to the glasses) */}
                    <div className="w-3 h-3 bg-white border-b-[2.5px] border-r-[2.5px] border-black transform rotate-[45deg] -translate-y-[6px] -translate-x-[25px] relative z-20 rounded-br-[2px]"></div>
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
            <div className="absolute left-[6%] md:left-[5%] bottom-[2%] md:bottom-[5%] z-5 select-none pointer-events-none flex flex-col">
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

            {/* SVG Mask Definition for Gooey Fire Trail */}
            <svg width="0" height="0" className="absolute pointer-events-none">
                <defs>
                    <filter id="gooey-fire" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 14 -6" result="gooey" />
                    </filter>

                    <mask id="tear-mask" x="0" y="0" width="100vw" height="100dvh">
                        {/* Background is black (hidden) */}
                        <rect x="0" y="0" width="100vw" height="100dvh" fill="black" />

                        <g filter="url(#gooey-fire)">
                            {/* The Flaking Fire Tail */}
                            <g ref={trailGroupRef}></g>

                            {/* Web-Shaped Head of the trail */}
                            <path ref={cursorMaskRef} d="" fill="white" />
                        </g>
                    </mask>
                </defs>
            </svg>

            {/* Reveal Layer: Color Image masked by the torn trail */}
            <div
                className="hero-color-mask absolute inset-0 z-10 pointer-events-none"
                style={{ filter: 'saturate(1.15) brightness(1.1)' }}
            >
                {/* The entire revealed world (Image + Text) */}
                <picture>
                    <source media="(min-width: 768px)" srcSet={heroColor} />
                    <img
                        src={heroMobColor}
                        alt="Vibrant world"
                        className="hero-color-img absolute inset-0 w-full h-full max-w-none object-contain"
                    />
                </picture>

                {/* Revealed Spider-Verse Name Overlay (White) */}
                <div className="absolute left-[6%] md:left-[5%] bottom-[2%] md:bottom-[5%] select-none pointer-events-none flex flex-col">
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

            {/* Visible Web Strands trailing the cursor */}
            <svg width="100vw" height="100dvh" className="absolute top-0 left-0 pointer-events-none z-[60]">
                <g ref={trailWebLinesRef} style={{ filter: 'drop-shadow(0px 0px 3px rgba(255,255,255,0.8))' }}></g>
            </svg>

            {/* Spider Web Cursor Inner Design */}
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
