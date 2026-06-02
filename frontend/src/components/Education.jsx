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
            <div className="relative w-full h-[90dvh] max-w-[calc(90dvh*0.707)] mx-auto bg-[#E3D4C1] border-[3px] border-[#2C5E3B] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
                
                {/* Header */}
                <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b-[3px] border-[#2C5E3B] bg-[#E3D4C1] z-10">
                    <h2 className="text-[#1a1a1a] font-sans font-bold text-lg md:text-2xl tracking-tight truncate pr-4">
                        {title}
                    </h2>
                    
                    <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                        {/* Green Download Icon Button */}
                        <a 
                            href={pdfUrl} 
                            download 
                            title="Download PDF"
                            className="p-2 md:p-2.5 bg-[#2C5E3B] text-white rounded-full hover:bg-[#1f432a] transition-all duration-300 shadow-[0_0_10px_rgba(44,94,59,0.3)] hover:shadow-[0_0_15px_rgba(44,94,59,0.6)] flex items-center justify-center transform hover:-translate-y-0.5"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        </a>
                        {/* Close Icon Button */}
                        <button 
                            onClick={onClose}
                            title="Close Preview"
                            className="p-2 md:p-2.5 border-2 border-transparent hover:border-[#2C5E3B] text-[#2C5E3B] hover:text-white hover:bg-[#2C5E3B] rounded-full transition-all duration-300 flex items-center justify-center"
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

    // Mobile specific auto-play on scroll behavior
    useEffect(() => {
        const isMobile = window.matchMedia("(hover: none)").matches;
        if (!isMobile) return; // Ignore on desktop

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
                    }
                } else {
                    if (videoRef.current) {
                        videoRef.current.pause();
                    }
                }
            },
            { threshold: 0.5 } // Trigger when 50% visible
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0; 
            videoRef.current.play(); 
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause(); 
        }
    };

    return (
        <div 
            onClick={onClick}
            className="flex flex-col items-center gap-5 w-full group cursor-pointer"
        >
            <div
                className="w-full aspect-square bg-transparent border-[3px] border-[#2C5E3B] rounded-[2rem] shadow-lg flex items-center justify-center transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:bg-[#2C5E3B]/5 relative overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <video 
                    ref={videoRef}
                    src={`${videoSrc}#t=0.001`} 
                    className="w-full h-full object-cover rounded-[1.75rem]"
                    muted
                    playsInline
                    preload="metadata"
                />
                
                {/* 'View' Label Overlay */}
                <span className="absolute bottom-5 left-6 text-[#2C5E3B] font-serif italic text-sm md:text-base tracking-wide drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] z-10 pointer-events-none flex items-center gap-1 group-hover:underline">
                    view --&gt;
                </span>
            </div>
            
            {/* Stylish Labels */}
            <div className="flex flex-col items-center text-center transition-all duration-300 transform group-hover:-translate-y-1">
                <h3 className="text-black font-sans font-bold text-2xl md:text-3xl tracking-wide opacity-90 group-hover:opacity-100">
                    {title}
                </h3>
                <p className="text-neutral-600 font-serif italic text-sm md:text-base tracking-wide mt-1 opacity-80 group-hover:opacity-100">
                    {institution}
                </p>
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
        <section id="education" className="relative w-full min-h-[100dvh] bg-[#E3D4C1] text-black px-6 md:px-16 lg:px-32 py-32 flex flex-col justify-center">
            
            {/* Glowing Curvy Spider Web Pattern Background */}
            <div 
                className="absolute inset-0 z-0 pointer-events-none opacity-80"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%2368d391' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round' fill='none' stroke-opacity='0.4'%3E%3Cpath d='M50 50 L50 10 M50 50 L90 50 M50 50 L50 90 M50 50 L10 50 M50 50 L78 22 M50 50 L78 78 M50 50 L22 78 M50 50 L22 22' /%3E%3Cpath d='M50 10 Q 62 20 78 22 Q 80 38 90 50 Q 80 62 78 78 Q 62 80 50 90 Q 38 80 22 78 Q 20 62 10 50 Q 20 38 22 22 Q 38 20 50 10' /%3E%3Cpath d='M50 20 Q 58 28 71 29 Q 72 42 80 50 Q 72 58 71 71 Q 58 72 50 80 Q 42 72 29 71 Q 28 58 20 50 Q 28 42 29 29 Q 42 28 50 20' /%3E%3Cpath d='M50 30 Q 56 35 64 36 Q 65 44 70 50 Q 65 56 64 64 Q 56 65 50 70 Q 44 65 36 64 Q 35 56 30 50 Q 35 44 36 36 Q 44 35 50 30' /%3E%3Cpath d='M50 40 Q 53 42 57 43 Q 58 47 60 50 Q 58 53 57 57 Q 53 58 50 60 Q 47 58 43 57 Q 42 53 40 50 Q 42 47 43 43 Q 47 42 50 40' /%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '180px 180px',
                    filter: 'drop-shadow(0px 0px 4px rgba(104, 211, 145, 0.5))'
                }}
            ></div>

            <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col -mt-16 md:-mt-24">
                
                {/* Main Heading */}
                <h1 className="text-xl md:text-4xl lg:text-[3rem] font-bold tracking-tight text-[#1a1a1a] mb-16 text-left w-full leading-[0.95]">
                    <span className="font-sans tracking-tight">EDU</span>
                    <span className="font-serif italic font-normal tracking-normal pr-1">CATION</span>
                    <span className="text-[#2C5E3B] font-serif">.</span>
                </h1>

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
