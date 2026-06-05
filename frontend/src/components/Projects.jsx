import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import slvImg from '../assets/SLV.PNG';
import snsImg from '../assets/SNS.PNG';
import teamAlphaImg from '../assets/teamalpha.PNG';
import momImg from '../assets/mom.PNG';

export default function Projects() {
    const projects = [
        {
            title: 'SLV',
            imageSrc: slvImg,
            description: 'An elegant e-commerce platform offering a curated collection of traditional sarees and premium dress materials.',
            linkUrl: 'https://slv-online-stores.onrender.com',
            theme: '#ff0000', // Red
            textOutline: 'text-[#800000]'
        },
        {
            title: 'SNS',
            imageSrc: snsImg,
            description: 'A dynamic news aggregator delivering real-time updates and breaking stories across multiple categories.',
            linkUrl: 'https://new-web-murex.vercel.app',
            theme: '#0055ff', // Blue
            textOutline: 'text-[#003399]'
        },
        {
            title: 'TEAM ALPHA',
            imageSrc: teamAlphaImg,
            description: 'A collaborative project management dashboard built for high-performance development teams.',
            linkUrl: 'https://new-web-murex.vercel.app',
            theme: '#facc15', // Yellow
            textOutline: 'text-[#ccaa00]'
        },
        {
            title: 'MOM',
            imageSrc: momImg,
            description: 'A personalized recipe and meal planning application designed to bring home-cooked meals to everyone.',
            linkUrl: 'https://new-web-murex.vercel.app',
            theme: '#22c55e', // Green
            textOutline: 'text-[#16803d]'
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [hasInteracted, setHasInteracted] = useState(false);
    
    const activeProject = projects[activeIndex];

    // Auto-slide every 5 seconds until user interacts
    useEffect(() => {
        if (hasInteracted) return;

        const interval = setInterval(() => {
            setDirection(1);
            setPrevIndex(activeIndex);
            setActiveIndex((prev) => (prev + 1) % projects.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [activeIndex, hasInteracted, projects.length]);

    const nextProject = () => {
        setHasInteracted(true);
        setDirection(1);
        setPrevIndex(activeIndex);
        setActiveIndex((activeIndex + 1) % projects.length);
    };

    const prevProject = () => {
        setDirection(-1);
        setPrevIndex(activeIndex);
        setActiveIndex((activeIndex - 1 + projects.length) % projects.length);
    };

    // Minimal, impressive easing
    const customEase = [0.25, 1, 0.5, 1];

    // Slide variants based on direction
    const slideVariants = {
        enter: (dir) => ({
            x: dir > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.95
        }),
        center: {
            x: '0%',
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: customEase }
        },
        exit: (dir) => ({
            x: dir < 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.5, ease: customEase }
        })
    };

    // Background sweep variants
    const bgVariants = {
        enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%' }),
        center: { x: '0%', transition: { duration: 0.6, ease: customEase } },
        exit: (dir) => ({ x: dir < 0 ? '100%' : '-100%', transition: { duration: 0.6, ease: customEase } })
    };

    return (
        <section id="projects" className="w-full py-4 md:py-6 bg-transparent overflow-hidden font-sans relative z-10 flex flex-col items-center justify-center min-h-[100dvh]">
            
            <div className="w-full max-w-[800px] xl:max-w-[950px] mx-auto px-4 md:px-0 mb-4 md:mb-8 shrink-0 relative z-30 flex justify-center">
                <h1 className="relative inline-flex items-baseline bg-[#facc15] border-[3px] border-black px-4 py-2 transform -skew-x-6 rotate-[-1deg] hover-glitch cursor-crosshair animate-in slide-in-from-left-full duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
                    style={{ boxShadow: '6px 6px 0px rgba(0,0,0,1)' }}>
                    <span className="font-sans font-black tracking-tighter text-black text-xl md:text-3xl lg:text-5xl leading-none">PRO</span>
                    <span className="font-serif italic font-semibold uppercase tracking-normal text-black text-xl md:text-3xl lg:text-5xl leading-none">JECTS</span>
                    <span className="text-[#ff0000] font-serif text-xl md:text-3xl lg:text-5xl leading-none">.</span>
                </h1>
            </div>

            <div className="w-full max-w-[800px] xl:max-w-[1000px] mx-auto px-2 md:px-4 flex flex-col items-center gap-3 md:gap-4 z-20">
                <div className="w-full flex flex-row items-center justify-center gap-2 md:gap-6 lg:gap-8">
                    
                    {/* LEFT ARROW */}
                    <button 
                        onClick={prevProject}
                        className="hidden md:flex shrink-0 w-12 h-12 lg:w-16 lg:h-16 items-center justify-center bg-[#facc15] text-black rounded-full border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ff0000] hover:text-white hover:translate-x-1 hover:translate-y-1 transition-all group z-30"
                    >
                        <svg className="w-6 h-6 lg:w-8 lg:h-8 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>

                    {/* THE CENTER STAGE CARD */}
                    <div 
                        className="relative w-full flex-1 border-[2px] md:border-[3px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden h-[400px] md:h-[450px] lg:h-[500px]"
                        style={{ backgroundColor: projects[prevIndex].theme }}
                    >
                        
                        {/* Sliding Diagonal Swipe Transition */}
                        <AnimatePresence custom={direction} initial={false}>
                            <motion.div
                                key={`swipe-${activeIndex}`}
                                custom={direction}
                                variants={bgVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute top-[-50%] bottom-[-50%] right-[-10%] w-[65%] z-0 flex items-center justify-center"
                            >
                                <div className="w-full h-full transform -skew-x-[15deg] border-l-[6px] border-black relative shadow-[-10px_0_0_rgba(0,0,0,0.1)]" style={{ backgroundColor: activeProject.theme }}>
                                    
                                    {/* Stylized Racing Stripes / Panel Cuts */}
                                    <div className="absolute top-0 bottom-0 -left-[20px] w-[8px] bg-black"></div>
                                    <div className="absolute top-0 bottom-0 -left-[32px] w-[4px] bg-black"></div>

                                    {/* Halftone overlay */}
                                    <div 
                                        className="absolute inset-0 mix-blend-multiply opacity-[0.25]" 
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='5' height='5' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2.5' cy='2.5' r='1.5' fill='%23000000'/%3E%3C/svg%3E")`,
                                            backgroundSize: '4px 4px',
                                        }} 
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Minimal Background Text */}
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={`text-${activeIndex}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.2 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`absolute inset-0 z-10 flex items-center justify-center pointer-events-none ${activeProject.textOutline}`}
                            >
                                <h2 className="font-sans font-black text-[22vw] md:text-[14vw] uppercase select-none whitespace-nowrap" style={{ WebkitTextStroke: '2px currentColor', color: 'transparent' }}>
                                    {activeProject.title}
                                </h2>
                            </motion.div>
                        </AnimatePresence>

                        {/* Unified Content Layer (Z-20) - Slides as one solid block! */}
                        <div className="relative z-20 w-full h-full overflow-hidden">
                            <AnimatePresence custom={direction} initial={false}>
                                <motion.div
                                    key={`content-${activeIndex}`}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={(e, { offset }) => {
                                        if (offset.x < -50) nextProject();
                                        else if (offset.x > 50) prevProject();
                                    }}
                                    className="absolute inset-0 flex flex-col justify-between cursor-grab active:cursor-grabbing"
                                >
                                    
                                    {/* Top Showcase Area (Tight Image Container) */}
                                    <div className="w-full flex-1 pt-6 md:pt-10 pb-4 flex items-center justify-center min-h-0 pointer-events-none">
                                        <div className="relative max-w-[90%] md:max-w-[80%] h-fit max-h-full bg-white p-1.5 md:p-2 border-[2px] md:border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] group">
                                            <div className="border-[2px] border-black overflow-hidden bg-white flex items-center justify-center">
                                                <img 
                                                    src={activeProject.imageSrc} 
                                                    alt={activeProject.title}
                                                    className="w-auto h-auto max-w-full max-h-[160px] md:max-h-[220px] lg:max-h-[280px] object-contain transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Info Area */}
                                    <div className="w-full px-4 md:px-6 pb-4 md:pb-6 flex flex-col md:flex-row items-end justify-between gap-4 shrink-0">
                                        <div className="flex-1 flex flex-col items-start gap-1.5 md:gap-2 pointer-events-none">
                                            {/* Name brought back inside container */}
                                            <h3 className="font-sans font-black text-black text-sm md:text-xl uppercase tracking-widest bg-white border-[2px] border-black px-3 py-1 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                                                {activeProject.title}
                                            </h3>
                                            <p className="font-semibold text-black text-xs md:text-sm leading-snug bg-white border-[2px] border-black p-3 shadow-[3px_3px_0px_rgba(0,0,0,1)] max-w-[500px]">
                                                {activeProject.description}
                                            </p>
                                        </div>

                                        <a 
                                            href={activeProject.linkUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="relative overflow-hidden inline-flex w-full md:w-fit items-center justify-center gap-2 font-black tracking-widest uppercase border-[2px] md:border-[3px] border-black px-5 py-2 md:py-2.5 bg-[#facc15] text-black group/btn shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[3px] hover:translate-x-[3px] transition-all duration-300 transform -skew-x-6 shrink-0"
                                        >
                                            <div className="absolute inset-0 transition-transform duration-300 ease-in-out z-0 -translate-y-full group-hover/btn:translate-y-0 bg-[#ff0000]"></div>
                                            <span className={`relative z-10 transition-colors duration-300 text-[10px] md:text-xs group-hover/btn:text-white`}>VISIT APP</span> 
                                            <span className={`relative z-10 text-sm md:text-base leading-none transition-colors duration-300 group-hover/btn:text-white`}>→</span>
                                        </a>
                                    </div>
                                    
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* RIGHT ARROW */}
                    <button 
                        onClick={nextProject}
                        className="hidden md:flex shrink-0 w-12 h-12 lg:w-16 lg:h-16 items-center justify-center bg-[#facc15] text-black rounded-full border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ff0000] hover:text-white hover:-translate-x-1 hover:translate-y-1 transition-all group z-30"
                    >
                        <svg className="w-6 h-6 lg:w-8 lg:h-8 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>

                </div>

            </div>
        </section>
    );
}
