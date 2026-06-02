import React, { useEffect, useRef, useState } from 'react';
import heroBnw from '../assets/hero-bnw.png';
import heroColor from '../assets/hero-color.png';
import mobHeroBnw from '../assets/mob-hero-bnw.png';
import mobHeroColor from '../assets/mob-hero-color.png';
import spidyNav from '../assets/spidy-nav.png';

const lerp = (start, end, factor) => start + (end - start) * factor;

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
            if (window.innerWidth >= 1024) target.current.size = 135; // 270px diameter
            else if (window.innerWidth >= 768) target.current.size = 108; // 216px
            else target.current.size = 81; // 162px
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
                    target.current.size = window.innerWidth >= 768 ? 50 : 18;
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
            className="relative w-full h-[100dvh] overflow-hidden cursor-none bg-black touch-none"
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
            {/* Spider Icon Top Right */}
            <div 
                ref={iconWrapperRef}
                className="absolute top-2 right-2 md:top-7 md:right-8 z-[60] p-2 md:p-6 pointer-events-auto cursor-none flex items-center justify-center"
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
                    className="w-12 md:w-20 lg:w-24 h-auto hover:drop-shadow-[0_0_15px_#ff0000] transition-[filter] duration-300 cursor-none"
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

            {/* Background Spider-Verse Name Overlay (Yellow) */}
            <div className="absolute left-[2%] md:left-[5%] bottom-[2%] md:bottom-[5%] z-5 select-none pointer-events-none flex flex-col">
                <h1 
                    className="text-color-fill text-stroke-vikas-base font-['Anton'] text-[5.5rem] md:text-[14rem] lg:text-[18rem] leading-none tracking-normal"
                >
                    VIKAS
                </h1>
                <h2 
                    className="relative z-10 text-yellow-400 font-['Anton'] text-base md:text-2xl lg:text-4xl leading-normal md:leading-none tracking-[0.2em] self-start ml-2 md:ml-6 lg:ml-8 -mt-1 md:-mt-2 lg:-mt-3 whitespace-nowrap pr-2"
                    style={{
                        WebkitTextStroke: '1px black',
                        textShadow: '3px 0px 0px rgba(0,0,0,0.8)',
                    }}
                >
                    WEB DEVELOPER
                </h2>
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
                            className="absolute inset-0 w-[100vw] h-[100dvh] max-w-none object-cover md:object-fill object-center"
                        />
                    </picture>

                    {/* Revealed Spider-Verse Name Overlay (White) */}
                    <div className="absolute left-[2%] md:left-[5%] bottom-[2%] md:bottom-[5%] select-none pointer-events-none flex flex-col">
                        <h1 
                            className="text-color-fill text-stroke-vikas-reveal font-['Anton'] text-[5.5rem] md:text-[14rem] lg:text-[18rem] leading-none tracking-normal"
                        >
                            VIKAS
                        </h1>
                        <h2 
                            className="relative z-10 text-[#e5e5e5] font-['Anton'] text-base md:text-2xl lg:text-4xl leading-normal md:leading-none tracking-[0.2em] self-start ml-2 md:ml-6 lg:ml-8 -mt-1 md:-mt-2 lg:-mt-3 whitespace-nowrap pr-2"
                            style={{
                                WebkitTextStroke: '1px black',
                                textShadow: '0 0 10px #ff0000, 0 0 20px #ff0000, 3px 0px 0px #000',
                            }}
                        >
                            WEB DEVELOPER
                        </h2>
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

            {/* === MOBILE: Vertical Slide Nav === */}
            <div className="md:hidden absolute top-16 right-4 z-50 flex flex-col items-end gap-4 pointer-events-none">
                {['HOME', 'EDUCATION', 'PROJECTS', 'CONTACT'].map((item, i) => (
                    <a
                        key={item}
                        ref={el => navItemRefs.current[i] = el}
                        href={`#${item.toLowerCase()}`}
                        onClick={() => setIsNavOpen(false)}
                        className="font-['Anton'] text-base tracking-widest whitespace-nowrap cursor-none"
                        style={{
                            color: hoveredNav === item ? '#e5e5e5' : '#facc15',
                            WebkitTextStroke: '1px black',
                            textShadow: hoveredNav === item
                                ? '0 0 10px #ff0000, 0 0 25px #ff0000, 2px 0px 0px #000'
                                : '2px 0px 0px rgba(0,0,0,0.8)',
                            opacity: isNavOpen ? 1 : 0,
                            transform: isNavOpen ? 'translateY(0)' : 'translateY(-20px)',
                            transition: 'opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1), color 0.2s ease',
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
                className="hidden md:flex absolute top-8 left-[5rem] lg:left-[6rem] right-[5rem] lg:right-[6rem] z-50 h-24 items-center overflow-hidden pointer-events-none"
            >
                <div 
                    className={`w-full flex justify-center items-center space-x-16 lg:space-x-24 mt-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isNavOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-[150%]'}`}
                >
                    {['HOME', 'EDUCATION', 'PROJECTS', 'CONTACT'].map((item) => (
                        <a 
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={() => setIsNavOpen(false)}
                            className="px-4 py-2 font-['Anton'] text-2xl lg:text-3xl tracking-widest whitespace-nowrap cursor-none hover:-translate-y-1 transition-transform duration-300"
                            style={{
                                color: hoveredNav === item ? '#e5e5e5' : '#facc15',
                                WebkitTextStroke: '1px black',
                                textShadow: hoveredNav === item
                                    ? '0 0 10px #ff0000, 0 0 25px #ff0000, 2px 0px 0px #000'
                                    : '2px 0px 0px rgba(0,0,0,0.8)',
                                transition: 'color 0.2s ease',
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
        </section>
    );
}
