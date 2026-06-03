import React, { useRef, useState, useEffect } from 'react';
import video5th from '../assets/5th.mp4';
import videoPuc from '../assets/puc.mp4';
import videoDegree from '../assets/degree.mp4';
import pdfClass10 from '../assets/class10.pdf';
import pdfPuc from '../assets/puc (1).pdf';
import pdfDegree from '../assets/DEGREE (1).pdf';

const DocumentViewerModal = ({ pdfUrl, title, onClose }) => {
    if (!pdfUrl) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-300">
            {/* Modal Container */}
            <div className="relative w-full h-[90dvh] max-w-[calc(90dvh*0.707)] mx-auto bg-transparent border-[3px] border-[#ff0000] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
                
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

const VideoCard = ({ videoSrc, title, institution, onClick }) => {
    const videoRef = useRef(null);
    const cardRef = useRef(null);
    const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    const [isHovered, setIsHovered] = useState(false);

    // Mobile specific auto-play and scroll-driven 3D tilt
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
            const distance = (cardCenter - viewportCenter) / viewportCenter;
            const clamped = Math.max(-1, Math.min(1, distance));
            
            // Tilt based on scroll! As it scrolls up, it tilts up and down
            const rotateX = clamped * 25; 
            const isNearCenter = Math.abs(clamped) < 0.45; // Active zone in middle of screen
            
            // Only update React state and video playback when entering/leaving the active zone
            if (isHoveredRef.current !== isNearCenter) {
                isHoveredRef.current = isNearCenter;
                setIsHovered(isNearCenter);
                
                if (isNearCenter && videoRef.current) {
                    videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
                } else if (!isNearCenter && videoRef.current) {
                    videoRef.current.pause();
                }
            }
            
            // Apply 3D transform based on scroll position
            setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(0deg) scale3d(${isNearCenter ? 1.02 : 1}, ${isNearCenter ? 1.02 : 1}, 1)`);
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
        const rotateX = ((y - centerY) / centerY) * -15; // Max tilt
        const rotateY = ((x - centerX) / centerX) * 15;
        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    };

    const handleCardMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.currentTime = 0; 
            videoRef.current.play(); 
        }
    };

    const handleCardMouseLeave = () => {
        setIsHovered(false);
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
        if (videoRef.current) {
            videoRef.current.pause(); 
        }
    };

    return (
        <div 
            onClick={onClick}
            className="flex flex-col items-center gap-5 w-full group cursor-pointer"
            style={{ perspective: '1000px' }}
        >
            <div
                ref={cardRef}
                className="w-full aspect-square flex items-center justify-center transform transition-transform duration-200 ease-out relative overflow-visible"
                style={{ transform, transformStyle: 'preserve-3d' }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
            >
                {/* 3D Floating Video Container with Comic Style */}
                <div 
                    className={`absolute inset-0 transition-all duration-300 ease-out rounded-[1.75rem] border-[3px] border-black bg-black ${isHovered ? 'shadow-[-10px_0_30px_rgba(0,85,255,0.8),10px_0_30px_rgba(255,0,0,0.8)] md:shadow-[-30px_0_60px_rgba(0,85,255,0.8),30px_0_60px_rgba(255,0,0,0.8)]' : 'shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)]'}`}
                    style={{ 
                        transform: 'translateZ(30px)', 
                        transformStyle: 'preserve-3d'
                    }}
                >
                    <video 
                        ref={videoRef}
                        src={videoSrc} 
                        className="w-full h-full object-cover rounded-[1.75rem]"
                        muted
                        playsInline
                        loop
                        preload="metadata"
                    />
                </div>
                
                {/* 'View' Label Overlay popping out further */}
                <span 
                    className="absolute bottom-6 left-8 text-black font-sans font-black uppercase text-sm md:text-base tracking-widest drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)] z-10 pointer-events-none flex items-center gap-2 group-hover:underline transition-transform duration-200 ease-out"
                    style={{ transform: 'translateZ(80px)' }}
                >
                    view --&gt;
                </span>
            </div>
            
            {/* Comic Style Labels */}
            <div className="flex flex-col items-center text-center transition-all duration-300 transform group-hover:-translate-y-2 mt-4 z-20">
                <div className="bg-[#facc15] border-[3px] border-black px-4 py-1 shadow-[4px_4px_0_rgba(0,0,0,1)] transform -skew-x-6 group-hover:bg-[#ff0000] transition-colors duration-300">
                    <h3 className="text-black font-sans font-black text-xl md:text-2xl tracking-widest uppercase group-hover:text-white transition-colors duration-300">
                        {title}
                    </h3>
                </div>
                <div className="bg-white border-[2.5px] border-black px-4 py-1 shadow-[3px_3px_0_rgba(0,0,0,1)] mt-3 transform rotate-1 group-hover:rotate-0 group-hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all duration-300">
                    <p className="text-black font-sans font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase">
                        {institution}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function Education() {
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState('');

    const openPdf = (url, title) => {
        setSelectedPdf(url);
        setSelectedTitle(title);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closePdf = () => {
        setSelectedPdf(null);
        setSelectedTitle('');
        document.body.style.overflow = 'unset';
    };

    return (
        <section id="education" className="relative w-full min-h-[100dvh] bg-transparent text-black px-6 md:px-16 lg:px-32 py-32 flex flex-col justify-center overflow-hidden">
            
            

            <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col -mt-16 md:-mt-24">
                
                {/* Main Heading (Comic Box Style) */}
                <div className="flex w-full mb-12 md:mb-16 overflow-hidden py-4 -my-4">
                    <h1 className="relative inline-flex items-baseline bg-[#facc15] border-[3px] border-black px-4 py-2 transform -skew-x-6 rotate-[-1deg] hover-glitch cursor-crosshair animate-in slide-in-from-left-full duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
                        style={{ boxShadow: '6px 6px 0px rgba(0,0,0,1)' }}>
                        <span className="font-sans font-black tracking-tighter text-black text-2xl md:text-4xl lg:text-[3.5rem] leading-none">EDU</span>
                        <span className="font-serif italic font-semibold text-black text-2xl md:text-4xl lg:text-[3.5rem] leading-none pr-1">CATION</span>
                        <span className="text-[#ff0000] font-serif text-2xl md:text-4xl lg:text-[3.5rem] leading-none">.</span>
                    </h1>
                </div>

                {/* 3 Video Cards Container */}
                <div className="relative z-20 w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <VideoCard 
                        videoSrc={video5th} 
                        title="CLASS 10 - 93%" 
                        institution="THE NEW CAMBRIDGE HIGH SCHOOL" 
                        onClick={() => openPdf(pdfClass10, "Class 10 Marks Card")}
                    />
                    <VideoCard 
                        videoSrc={videoPuc} 
                        title="PUC - 94%" 
                        institution="DEEKSHA COMP. PU COLLEGE" 
                        onClick={() => openPdf(pdfPuc, "PUC Marks Card")}
                    />
                    <VideoCard 
                        videoSrc={videoDegree} 
                        title="BCA - 8.54 CGPA" 
                        institution="ST JOSEPHS UNIVERSITY" 
                        onClick={() => openPdf(pdfDegree, "BCA Marks Card")}
                    />
                </div>
            </div>

            {/* Document Preview Modal */}
            {selectedPdf && (
                <DocumentViewerModal 
                    pdfUrl={selectedPdf} 
                    title={selectedTitle} 
                    onClose={closePdf} 
                />
            )}

        </section>
    );
}
