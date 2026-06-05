import React, { useEffect, useRef, useState } from 'react';

// Custom Robotic Typewriter Component
const Typewriter = ({ text, delay = 0, isVisible, speed = 50, onComplete }) => {
    const [displayText, setDisplayText] = useState('');
    useEffect(() => {
        if (!isVisible) { setDisplayText(''); return; }
        let timeout, currentText = '', i = 0;
        const type = () => {
            if (i < text.length) {
                currentText += text.charAt(i); setDisplayText(currentText); i++;
                timeout = setTimeout(type, speed + (Math.random() * 40 - 20));
            } else if (onComplete) onComplete();
        };
        timeout = setTimeout(type, delay);
        return () => clearTimeout(timeout);
    }, [text, isVisible, delay, speed]);
    return <>{displayText}</>;
};

// Reusable skill tag with hover color
const Tag = ({ label, hoverBg = '#ff0000', hoverText = '#fff', dark = false }) => (
    <span
        className={`px-3 py-2 md:px-4 md:py-2.5 border-[2px] text-xs md:text-sm font-black uppercase tracking-wider transition-all duration-200 cursor-default hover:-translate-y-0.5 ${dark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-black text-black'}`}
        style={{ boxShadow: dark ? '3px 3px 0 rgba(255,255,255,0.1)' : '3px 3px 0 #000' }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = hoverBg; e.currentTarget.style.color = hoverText; e.currentTarget.style.borderColor = hoverBg; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = dark ? 'rgba(255,255,255,0.2)' : '#000'; }}
    >
        {label}
    </span>
);

// Tool chip with coloured background and icon
const ToolChip = ({ label, icon, bg, text = '#fff' }) => (
    <span
        className="flex items-center gap-2 px-3 py-2 border-[2px] border-black text-xs font-black uppercase tracking-wider cursor-default transition-all duration-200 hover:-translate-y-0.5"
        style={{ backgroundColor: bg, color: text, boxShadow: '3px 3px 0 #000' }}
    >
        {icon}
        {label}
    </span>
);

// ── SVG icons ──────────────────────────────────────────────────────────────
const IconClaude = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M17.154 2.846h-2.154L8.538 18.077h2.615l1.692-4.154h5.692l1.692 4.154h2.615L17.154 2.846zm-3.384 8.769l1.846-4.615 1.846 4.615h-3.692zM7.077 18.077l-1.385-3.385-3.384-8.769H0l5.538 14.154h2.615l-1.076-2z"/></svg>;
const IconStitch = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>;
const IconGemini = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M12.0002 0.443359L13.8821 9.0716L22.5104 10.9535L13.8821 12.8354L12.0002 21.4636L10.1183 12.8354L1.49005 10.9535L10.1183 9.0716L12.0002 0.443359Z"/></svg>;
const IconGSAP = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.568 9.038c-.732-.394-1.614-.61-2.568-.61-2.828 0-5.118 2.29-5.118 5.118s2.29 5.118 5.118 5.118c1.014 0 1.956-.296 2.748-.806l-1.344-2.02c-.414.28-.908.444-1.404.444-1.524 0-2.756-1.232-2.756-2.756s1.232-2.756 2.756-2.756c.71 0 1.352.268 1.838.71l1.63-1.632c-.238-.24-.518-.41-.9-.85z"/></svg>;
const IconThreeJS = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M12 0L0 7v10l12 7 12-7V7L12 0zm0 2.31l9.6 5.6-9.6 5.6-9.6-5.6 9.6-5.6zM2.4 8.71l9.6 5.6v11.2l-9.6-5.6V8.71zm19.2 0v11.2l-9.6 5.6V14.31l9.6-5.6z"/></svg>;
const IconLenis = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4 shrink-0"><path d="M2 12C2 12 6 4 12 12C18 20 22 12 22 12"/></svg>;

// ── Comic-book horizontal card ─────────────────────────────────────────
// Uniform cream base, accent only on top bar + badge. Clean. Bold. Elegant.
const HCard = ({ num, accent, title, subtitle, desc, children }) => {
    const n = String(num).padStart(2, '0');
    // Badge text: dark on yellow, light on everything else
    const badgeText = accent === '#facc15' ? '#000' : '#fff';
    return (
        <div
            className="relative shrink-0 w-[86vw] sm:w-[68vw] md:w-[50vw] lg:w-[36vw] h-[70vh] flex flex-col bg-[#F4EBD9] border-[4px] border-black overflow-hidden"
            style={{ boxShadow: '6px 6px 0 #000' }}
        >
            {/* Thick accent top bar */}
            <div className="h-[10px] w-full shrink-0" style={{ backgroundColor: accent }} />

            {/* Ghost number watermark */}
            <span className="absolute -bottom-4 -right-2 text-[140px] font-black leading-none text-black/[0.04] pointer-events-none select-none select-none">{n}</span>

            <div className="relative flex flex-col flex-1 p-6 md:p-8 gap-3 overflow-hidden">

                {/* Top row: category label + issue badge */}
                <div className="flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 border-2 border-black" style={{ backgroundColor: accent }} />
                        <span className="font-black text-[10px] md:text-xs uppercase tracking-[0.25em] text-black/50">{subtitle}</span>
                    </div>
                    <div
                        className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center border-[3px] border-black font-black text-base md:text-lg shrink-0"
                        style={{ backgroundColor: accent, color: badgeText }}
                    >
                        {num}
                    </div>
                </div>

                {/* Title — big and bold */}
                <h4
                    className="font-black text-black text-2xl md:text-3xl lg:text-4xl uppercase leading-[1.05] tracking-tighter shrink-0"
                    dangerouslySetInnerHTML={{ __html: title }}
                />

                {/* Thick divider */}
                <div className="h-[3px] w-full bg-black shrink-0" />

                {/* Description */}
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-black/40 shrink-0">{desc}</p>

                {/* Tags / content */}
                <div className="flex-1 overflow-y-auto pt-1">
                    {children}
                </div>
            </div>
        </div>
    );
};


export default function AboutMe() {
    const headerRef = useRef(null);
    const wrapperRef = useRef(null);   // tall div — creates scroll space
    const stickyRef = useRef(null);    // sticky viewport-height container
    const horizontalTrackRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);
    const [part1Done, setPart1Done] = useState(false);
    const [part2Done, setPart2Done] = useState(false);
    const [headingDone, setHeadingDone] = useState(false);
    const [startReveal, setStartReveal] = useState(false);
    const [bioDone, setBioDone] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.2 }
        );
        if (headerRef.current) observer.observe(headerRef.current);
        return () => { if (headerRef.current) observer.unobserve(headerRef.current); };
    }, []);

    useEffect(() => {
        if (headingDone) {
            const t = setTimeout(() => setStartReveal(true), 50);
            return () => clearTimeout(t);
        }
    }, [headingDone]);

    // ── Cinematic horizontal scroll via CSS sticky + rAF lerp ─────────────────
    // Why: CSS sticky never switches position:fixed, so no layout jump on entry
    // or exit. rAF lerp gives smooth momentum. Works perfectly on mobile touch.
    useEffect(() => {
        const wrapper = wrapperRef.current;
        const sticky = stickyRef.current;
        const track = horizontalTrackRef.current;
        if (!wrapper || !sticky || !track) return;

        let currentX = 0;
        let targetX = 0;
        let rafId = null;
        let running = true;

        // Lerp factor: lower = more lag / silkier. 0.07 is cinematic.
        const LERP = 0.07;

        const lerp = (a, b, t) => a + (b - a) * t;

        const calculateSizes = () => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            // Find the last real card (second-to-last child = before the spacer)
            const children = Array.from(track.children);
            const lastCard = children[children.length - 1]; // last child IS the last card now (no spacer)
            let maxX;
            if (lastCard) {
                // Stop when last card CENTER is at viewport CENTER
                const cardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
                maxX = cardCenter - vw / 2;
            } else {
                maxX = track.scrollWidth - vw * 0.5;
            }
            maxX = Math.max(0, maxX);
            wrapper.style.height = `${vh + maxX}px`;
            return { maxX, vw, vh };
        };

        let sizes = calculateSizes();

        const onScroll = () => {
            const rect = wrapper.getBoundingClientRect();
            // How many px the user has scrolled into the wrapper
            const scrolled = -rect.top;
            const clamped = Math.max(0, Math.min(scrolled, sizes.maxX));
            targetX = -clamped;
        };

        const tick = () => {
            if (!running) return;
            currentX = lerp(currentX, targetX, LERP);
            // Snap when within 0.05px to stop rAF burning CPU at rest
            if (Math.abs(currentX - targetX) < 0.05) currentX = targetX;
            track.style.transform = `translateX(${currentX}px)`;
            rafId = requestAnimationFrame(tick);
        };

        const onResize = () => {
            sizes = calculateSizes();
            onScroll();
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });

        // Kick off after layout is painted
        const timer = setTimeout(() => {
            sizes = calculateSizes();
            onScroll();
            rafId = requestAnimationFrame(tick);
        }, 100);

        return () => {
            running = false;
            clearTimeout(timer);
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const paragraphText = "Aspiring BCA graduate with a strong foundation in computer applications and real-time system development. Experienced in developing practical academic projects, demonstrating logical thinking and problem-solving abilities. Eager to apply classroom knowledge to real-world challenges in a collaborative way.";

    return (
        <>
            {/* ── PART 1: Header — scrolls normally ── */}
            <section
                id="about-me"
                ref={headerRef}
                className="relative w-full bg-transparent text-black px-6 md:px-16 lg:px-32 pt-4 md:pt-8 pb-8 md:pb-16"
            >
                <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col">
                    {/* Heading */}
                    <div className="flex w-full mb-8 md:mb-12 overflow-hidden py-4 -my-4">
                        <h1
                            className="relative inline-flex items-baseline bg-[#facc15] border-[3px] border-black px-4 py-2 transform -skew-x-6 rotate-[-1deg] cursor-crosshair"
                            style={{ boxShadow: '6px 6px 0px rgba(0,0,0,1)' }}
                        >
                            <span className="font-sans font-black tracking-tighter text-black text-xl md:text-3xl lg:text-5xl leading-none">
                                <Typewriter text="ABOUT" isVisible={isVisible} speed={25} onComplete={() => setPart1Done(true)} />
                            </span>
                            <span className="font-serif italic font-semibold uppercase tracking-normal pl-2 md:pl-4 text-black text-xl md:text-3xl lg:text-5xl leading-none">
                                {part1Done && <Typewriter text="ME" isVisible={true} speed={25} onComplete={() => setPart2Done(true)} />}
                            </span>
                            <span className="text-[#ff0000] font-serif text-xl md:text-3xl lg:text-5xl leading-none">
                                {part2Done && <Typewriter text="." isVisible={true} speed={25} onComplete={() => setHeadingDone(true)} />}
                            </span>
                            {!headingDone && isVisible && (
                                <span className="ml-2 animate-[pulse_0.2s_infinite] text-[#ff0000] text-xl md:text-3xl lg:text-5xl leading-none self-center shadow-[0_0_10px_#ff0000]">█</span>
                            )}
                        </h1>
                    </div>

                    {/* Origin Story box — compact on mobile */}
                    <div
                        className="relative w-full max-w-4xl mt-6 md:mt-8 bg-white border-[3px] border-black px-4 py-5 md:p-8 shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                        style={{
                            clipPath: startReveal ? 'inset(-50px -50px -50px -50px)' : 'inset(0 100% 0 0)',
                            transition: 'clip-path 1.5s cubic-bezier(0.22, 1, 0.36, 1)'
                        }}
                        onTransitionEnd={() => setBioDone(true)}
                    >
                        <div className="absolute -top-4 left-3 md:-top-5 md:left-8 bg-[#ff0000] text-white font-['Anton'] text-xs md:text-xl px-2 py-0.5 md:px-3 md:py-1 tracking-widest uppercase border-[3px] border-black z-30 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                            ORIGIN STORY
                        </div>
                        <div className="absolute top-[-3px] right-[-3px] w-6 h-6 md:w-8 md:h-8 bg-[#E3D4C1] border-l-[3px] border-b-[3px] border-black z-20" />
                        {/* Full text on all screen sizes, smaller on mobile */}
                        <p className="relative text-[11px] leading-relaxed tracking-wide md:hidden text-black font-black font-sans uppercase z-10 pr-4">
                            {headingDone && paragraphText}
                        </p>
                        <p className="relative hidden md:block text-xl text-black font-black font-sans leading-loose tracking-widest uppercase z-10">
                            {headingDone && paragraphText}
                        </p>
                    </div>
                </div>
            </section>

            {/* ── PART 2: Horizontal Scroll ── */}
            {/* Tall wrapper creates natural scroll space — no GSAP pin, no jumps */}
            <div ref={wrapperRef} className="relative w-full">

                {/* Sticky container — locks to viewport top via CSS, never position:fixed */}
                <div
                    ref={stickyRef}
                    className="sticky top-0 w-full overflow-hidden"
                    style={{ height: '100vh' }}
                >
                    {/* Scroll hint */}
                    <div className="absolute top-5 right-6 z-20 flex items-center gap-2 opacity-50 pointer-events-none">
                        <span className="font-black uppercase tracking-widest text-[10px] text-black">Swipe</span>
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                    </div>

                    {/* Horizontal Track — only element that moves (translateX) */}
                    <div
                        ref={horizontalTrackRef}
                        className="absolute top-0 left-0 h-full flex flex-nowrap items-center gap-5 md:gap-8 pl-[5vw] will-change-transform"
                        style={{ width: 'max-content' }}
                    >
                        {/* Card 1 — Coding Languages */}
                        <HCard num={1} accent="#ff0000" title="Coding<br/>Languages" subtitle="Languages" desc="What I build daily">
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {[['Java','#ff0000'],['Python','#0055ff'],['JavaScript','#facc15'],['C','#ff0000'],['C#','#0055ff'],['XML','#000']].map(([l, c]) => (
                                    <Tag key={l} label={l} hoverBg={c} hoverText={c === '#facc15' ? '#000' : '#fff'} />
                                ))}
                            </div>
                        </HCard>

                        {/* Card 2 — Web Technologies */}
                        <HCard num={2} accent="#facc15" title="Web<br/>Technologies" subtitle="Stack" desc="The MERN stack &amp; beyond">
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {[['React','#61dafb'],['Node.js','#22c55e'],['Express','#facc15'],['Mongoose','#ff0000'],['REST APIs','#0055ff'],['Tailwind','#38bdf8']].map(([l, c]) => (
                                    <Tag key={l} label={l} hoverBg={c} hoverText={c === '#facc15' || c === '#61dafb' || c === '#38bdf8' ? '#000' : '#fff'} />
                                ))}
                            </div>
                        </HCard>

                        {/* Card 3 — Databases */}
                        <HCard num={3} accent="#0055ff" title="Databases<br/>&amp; Cloud" subtitle="Data" desc="Storage &amp; deployment">
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {[['MongoDB','#22c55e'],['AWS','#facc15'],['Firebase','#ff6d00']].map(([l, c]) => (
                                    <Tag key={l} label={l} hoverBg={c} hoverText={c === '#facc15' ? '#000' : '#fff'} />
                                ))}
                            </div>
                        </HCard>

                        {/* Card 4 — Others */}
                        <HCard num={4} accent="#000" title="Others &amp;<br/>Tooling" subtitle="Plus" desc="Concepts &amp; tools">
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {[['CyberSecurity','#ff0000'],['Data Structures','#0055ff'],['PowerBI','#facc15'],['Git','#f05032'],['Figma','#a259ff']].map(([l, c]) => (
                                    <Tag key={l} label={l} hoverBg={c} hoverText={c === '#facc15' ? '#000' : '#fff'} />
                                ))}
                            </div>
                        </HCard>

                        {/* Card 5 — My Workflow */}
                        <HCard num={5} accent="#ff0000" title="My<br/>Workflow" subtitle="Process" desc="How I build products">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 mb-2">01 — Design</p>
                                    <div className="flex flex-wrap gap-2">
                                        <ToolChip label="Claude" icon={<IconClaude />} bg="#0055ff" />
                                        <ToolChip label="Stitch" icon={<IconStitch />} bg="#111" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 mb-2">02 — Coding</p>
                                    <div className="flex flex-wrap gap-2">
                                        <ToolChip label="Gemini" icon={<IconGemini />} bg="#ff0000" />
                                        <ToolChip label="Claude" icon={<IconClaude />} bg="#0055ff" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 mb-2">03 — Animations</p>
                                    <div className="flex flex-wrap gap-2">
                                        <ToolChip label="GSAP" icon={<IconGSAP />} bg="#22c55e" text="#000" />
                                        <ToolChip label="Three.js" icon={<IconThreeJS />} bg="#111" />
                                        <ToolChip label="Lenis" icon={<IconLenis />} bg="#facc15" text="#000" />
                                    </div>
                                </div>
                            </div>
                        </HCard>
                    </div>
                </div>
            </div>
        </>
    );
}
