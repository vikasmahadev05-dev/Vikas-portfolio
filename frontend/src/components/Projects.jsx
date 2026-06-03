import React, { useRef, useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import slvImg from '../assets/SLV.PNG';
import snsImg from '../assets/SNS.PNG';
import teamAlphaImg from '../assets/teamalpha.PNG';
import momImg from '../assets/mom.PNG';

const ProjectCard = ({ title, imageSrc, description, linkUrl }) => {
    const cardRef = useRef(null);
    const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    const [isHovered, setIsHovered] = useState(false);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Auto-trigger hover and physical 3D tilt on mobile devices when scrolling into center of screen
    useEffect(() => {
        const isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.matchMedia("(hover: none)").matches;
        if (!isMobile) return;

        let animationFrameId;
        const isHoveredRef = { current: false };

        const handleScroll = () => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const cardCenter = rect.top + rect.height / 2;
            
            // Calculate distance from center of viewport (-1 to 1)
            const distance = (cardCenter - viewportCenter) / (window.innerHeight / 2);
            const isNearCenter = Math.abs(distance) < 0.45; // Active zone in middle of screen
            
            if (isHoveredRef.current !== isNearCenter) {
                isHoveredRef.current = isNearCenter;
                setIsHovered(isNearCenter);
                
                if (isNearCenter) {
                    setTransform(`perspective(1000px) rotateX(-5deg) rotateY(0deg) scale3d(1.02, 1.02, 1.02)`);
                } else {
                    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
                }
            }
        };

        const onScroll = () => {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(handleScroll);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Subtle tilt for large cards
        const rotateX = ((y - centerY) / centerY) * -4; 
        const rotateY = ((x - centerX) / centerX) * 4;
        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    };

    return (
        <div 
            className="w-full relative group cursor-pointer"
            style={{ perspective: '2000px' }}
        >
            <a 
                ref={cardRef}
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                className={`flex flex-col bg-[#E3D4C1] transition-all duration-300 ease-out border-[3px] border-black overflow-hidden ${isHovered ? 'shadow-[-10px_10px_30px_rgba(0,85,255,0.4),10px_10px_30px_rgba(255,0,0,0.4)] md:shadow-[-20px_20px_50px_rgba(0,85,255,0.4),20px_20px_50px_rgba(255,0,0,0.4)]' : 'shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)]'}`}
                style={{ 
                    transform, 
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Image Container */}
                <div className="w-full overflow-hidden bg-[#1a1a1a] border-b-[3px] border-black relative">
                    <img 
                        src={imageSrc} 
                        alt={title} 
                        className={`w-full h-auto block object-contain transition-all duration-700 transform ${isHovered ? 'grayscale-0 scale-[1.03]' : 'grayscale-[60%] scale-100'}`}
                    />
                    {/* Comic Book Halftone Overlay */}
                    <div 
                        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none mix-blend-multiply ${isHovered ? 'opacity-0' : 'opacity-[0.5]'}`}
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='5' height='5' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2.5' cy='2.5' r='1.5' fill='%23000000'/%3E%3C/svg%3E")`,
                            backgroundSize: '5px 5px'
                        }}
                    />
                    {/* Subtle scanline overlay on image for cinematic feel */}
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.15)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-10' : 'opacity-50'}`}></div>
                </div>

                {/* Content Container */}
                <div 
                    className="p-6 md:p-10 flex flex-col transition-colors duration-300 bg-[#E3D4C1]"
                    style={{ transform: 'translateZ(30px)' }} // Slight 3D pop for text
                >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-8 w-full">
                        <div className="flex flex-col w-full md:w-3/4">
                            <h3 className="font-sans font-black text-black text-3xl md:text-5xl tracking-wide uppercase mb-3 md:mb-6">
                                {title}
                            </h3>
                            <p className="text-black font-sans font-black text-sm md:text-lg leading-relaxed uppercase tracking-widest">
                                {description}
                            </p>
                        </div>
                        
                        <div className={`relative overflow-hidden inline-flex items-center justify-center gap-3 font-sans font-black tracking-widest uppercase border-[3px] border-black px-6 py-4 md:py-3 rounded-full transition-all duration-500 w-full md:w-fit shrink-0 z-10 mt-2 md:mt-0 ${isHovered ? 'text-white shadow-[0px_0px_0px_#000] translate-y-[4px] translate-x-[4px]' : 'text-black bg-transparent shadow-[4px_4px_0px_#000]'}`}>
                            <div className={`absolute inset-0 bg-[#ff0000] transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] z-[-1] ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}></div>
                            VISIT APP <span className={`text-xl leading-none transition-transform duration-500 ${isHovered ? 'translate-x-1' : ''}`}>→</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default function Projects() {
    const projects = [
        {
            title: 'SLV',
            imageSrc: slvImg,
            description: 'An elegant e-commerce platform offering a curated collection of traditional sarees and premium dress materials.',
            linkUrl: 'https://slv-online-stores.onrender.com'
        },
        {
            title: 'SNS',
            imageSrc: snsImg,
            description: 'A comprehensive interior design portal facilitating seamless style selection, catalog browsing, and secure consulting payments.',
            linkUrl: 'https://sns-nest.onrender.com'
        },
        {
            title: 'Team Alpha',
            imageSrc: teamAlphaImg,
            description: 'A professional management portal connecting clients and wedding photographers through integrated galleries, team administration, and financial tracking.',
            linkUrl: 'https://teamalpha.photography'
        },
        {
            title: 'MOM',
            imageSrc: momImg,
            description: 'A sleek, intuitive daily productivity manager designed to streamline tasks and elevate your everyday workflow.',
            linkUrl: 'https://m-o-m-00x.onrender.com'
        }
    ];

    return (
        <section id="projects" className="relative w-full min-h-[100dvh] bg-transparent text-black px-6 md:px-16 lg:px-32 pt-4 md:pt-8 pb-32 flex flex-col justify-start overflow-hidden">
            
            

            <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col">
                
                {/* Projects Header (Comic Style) */}
                <div className="flex w-full mb-8 md:mb-12 mt-4 md:mt-8 overflow-hidden py-4 -my-4">
                    <h1 className="relative inline-flex items-baseline bg-[#facc15] border-[3px] border-black px-4 py-2 transform -skew-x-6 rotate-[-1deg] hover-glitch cursor-crosshair animate-in slide-in-from-left-full duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
                        style={{ boxShadow: '6px 6px 0px rgba(0,0,0,1)' }}>
                        <span className="font-sans font-black tracking-tighter text-black text-2xl md:text-4xl lg:text-[3.5rem] leading-none">PROJ</span>
                        <span className="font-serif italic font-semibold text-black text-2xl md:text-4xl lg:text-[3.5rem] leading-none pr-1">ECTS</span>
                        <span className="text-[#ff0000] font-serif text-2xl md:text-4xl lg:text-[3.5rem] leading-none">.</span>
                    </h1>
                </div>

                {/* Projects List - 1 column alternating layout */}
                <div className="w-full flex flex-col gap-12 md:gap-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-4 md:mt-8">
                    {projects.map((proj, idx) => (
                        <ProjectCard key={idx} {...proj} isReversed={idx % 2 !== 0} />
                    ))}
                </div>

            </div>
        </section>
    );
}
