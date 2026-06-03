import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
import signatureVideo from '../assets/signature.mp4';

const SocialIcon = ({ type }) => {
    // ... SVG paths ...
    switch(type) {
        case 'whatsapp':
            return (
                <svg className="w-6 h-6 md:w-10 md:h-10 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
            );
        case 'instagram':
            return (
                <svg className="w-6 h-6 md:w-10 md:h-10 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
            );
        case 'linkedin':
            return (
                <svg className="w-6 h-6 md:w-10 md:h-10 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            );
        case 'github':
            return (
                <svg className="w-6 h-6 md:w-10 md:h-10 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
            );
        case 'facebook':
            return (
                <svg className="w-6 h-6 md:w-10 md:h-10 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            );
        case 'spidey':
            return (
                <svg className="w-6 h-6 md:w-10 md:h-10 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c-4 0-7 2-8 7 0 2 1 5 3 7l-2 5h4l1-3h4l1 3h4l-2-5c2-2 3-5 3-7-1-5-4-7-8-7zm-4 7c1 0 2.5 1 2.5 3 0 1-1.5 1-2.5 1-1 0-2 0-2-1s1-3 2-3zm8 0c1 0 2 2 2 3s-1 1-2 1-2.5-1-2.5-1 1.5-3 2.5-3z"/>
                </svg>
            );
        default:
            return null;
    }
};

const links = {
    whatsapp: "https://wa.me/917337347118",
    instagram: "https://instagram.com/vikas._.16",
    linkedin: "https://www.linkedin.com/in/vikas-m-170334338/",
    github: "https://github.com/vikasmahadev05-dev",
    spidey: "#",
    facebook: "#"
};

const IconLink = ({ type, hoverColor = "hover:text-[#ff0000] active:text-[#ff0000]" }) => (
    <a href={links[type]} target="_blank" rel="noreferrer" className={`w-8 h-8 md:w-16 md:h-16 flex items-center justify-center hover:scale-150 active:scale-125 hover:rotate-12 active:rotate-12 transition-all duration-200 cursor-pointer pointer-events-auto z-50 ${hoverColor}`}>
        <SocialIcon type={type} />
    </a>
);

const Contact = () => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    
    // Get scroll progress relative to this specific section entering and filling the viewport
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"] // Starts exactly when the section enters the bottom of the screen
    });
    
    // Smooth out the raw scroll value with a spring physics engine for buttery smooth video scrubbing
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,  // Softer spring gives the browser more time to decode reverse frames
        damping: 20,
        restDelta: 0.001
    });
    
    // Scrub the video based on the smoothed scroll progress!
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (videoRef.current && videoRef.current.duration) {
            requestAnimationFrame(() => {
                if (videoRef.current) {
                    videoRef.current.currentTime = latest * videoRef.current.duration;
                }
            });
        }
    });
    
    // Rollers move purely on scroll
    const yellowX = useTransform(scrollYProgress, [0, 1], [0, -2000]);
    // Start red deeply offset so it can move right
    const redX = useTransform(scrollYProgress, [0, 1], [-2000, 0]);

    return (
        <div ref={containerRef}>
        <section id="contact" className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
            
            {/* Background Diagonal Rollers (Icons Only) */}
            <div className="absolute inset-0 overflow-hidden z-0 flex items-center justify-center">
                
                {/* Yellow Strip (Top-Left to Bottom-Right) */}
                <div className="absolute w-[200vw] md:w-[150vw] bg-[#facc15] border-y-[3px] md:border-y-[4px] border-black py-2 md:py-4 transform rotate-[8deg] md:rotate-[10deg] shadow-[0_6px_0_rgba(0,0,0,1)] md:shadow-[0_10px_0_rgba(0,0,0,1)] flex overflow-hidden pointer-events-auto">
                    <motion.div style={{ x: yellowX }} className="flex w-full">
                        <div className="flex items-center whitespace-nowrap w-max">
                            {/* Repeat content multiple times for seamless scroll */}
                            {[...Array(40)].map((_, i) => (
                                <div key={`yellow-${i}`} className="flex items-center gap-4 md:gap-20 px-3 md:px-10 shrink-0 text-black">
                                    <IconLink type="whatsapp" />
                                    <IconLink type="instagram" />
                                    <IconLink type="linkedin" />
                                    <IconLink type="github" />
                                    <IconLink type="spidey" />
                                    <IconLink type="facebook" />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Red Strip (Bottom-Left to Top-Right) */}
                <div className="absolute w-[200vw] md:w-[150vw] bg-[#ff0000] border-y-[3px] md:border-y-[4px] border-black py-2 md:py-4 transform rotate-[-15deg] md:rotate-[-10deg] shadow-[0_6px_0_rgba(0,0,0,1)] md:shadow-[0_10px_0_rgba(0,0,0,1)] flex overflow-hidden">
                    <motion.div style={{ x: redX }} className="flex w-full">
                        <div className="flex items-center whitespace-nowrap w-max">
                            {[...Array(40)].map((_, i) => (
                                <div key={`red-${i}`} className="flex items-center gap-4 md:gap-20 px-3 md:px-10 shrink-0 text-white">
                                    <IconLink type="facebook" hoverColor="hover:text-black active:text-black" />
                                    <IconLink type="spidey" hoverColor="hover:text-black active:text-black" />
                                    <IconLink type="github" hoverColor="hover:text-black active:text-black" />
                                    <IconLink type="linkedin" hoverColor="hover:text-black active:text-black" />
                                    <IconLink type="instagram" hoverColor="hover:text-black active:text-black" />
                                    <IconLink type="whatsapp" hoverColor="hover:text-black active:text-black" />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col justify-center px-6 md:px-12 h-full py-8 md:py-12 pointer-events-none">
                
                {/* Contact Header (Comic Style) */}
                <div className="flex w-full mb-4 md:mb-8 shrink-0 relative z-30 pointer-events-auto">
                    <h1 className="relative inline-flex items-baseline bg-[#facc15] border-[3px] border-black px-4 py-2 transform -skew-x-6 rotate-[-1deg] hover-glitch cursor-crosshair animate-in slide-in-from-left-full duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
                        style={{ boxShadow: '6px 6px 0px rgba(0,0,0,1)' }}>
                        <span className="font-sans font-black tracking-tighter text-black text-3xl md:text-5xl lg:text-[4rem] leading-none">CON</span>
                        <span className="font-serif italic font-semibold text-black text-3xl md:text-5xl lg:text-[4rem] leading-none pr-1">TACT</span>
                        <span className="text-[#ff0000] font-serif text-3xl md:text-5xl lg:text-[4rem] leading-none">.</span>
                    </h1>
                </div>

                {/* Signature Video & CTA */}
                <div className="w-full relative flex flex-col items-center justify-center mt-6 mb-4 z-20 pointer-events-none">
                    
                    {/* Signature Video Comic Panel */}
                    <div className="relative w-[55vw] h-[55vw] max-w-[200px] max-h-[200px] md:max-w-none md:max-h-none md:w-96 md:h-96 border-[4px] border-black overflow-hidden shadow-[8px_8px_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_rgba(255,0,0,1)] transition-all duration-300 cursor-pointer bg-black rounded-sm transform rotate-[-3deg] hover:rotate-0 hover:-translate-y-2 mb-6 md:mb-8 pointer-events-auto">
                        <video 
                            ref={videoRef}
                            src={signatureVideo}
                            muted
                            playsInline
                            className="w-full h-full object-cover filter contrast-125 saturate-150 mix-blend-screen"
                        />
                    </div>

                    {/* Floating Call to Action Button */}
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=vikasmahadev05@gmail.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-black font-['Anton'] text-lg md:text-xl px-6 py-2 border-[3px] border-black hover:bg-[#facc15] hover:text-black shadow-[6px_6px_0_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-y-1 hover:rotate-2 cursor-pointer z-30 pointer-events-auto">
                        REACH OUT
                    </a>
                </div>

            </div>
        </section>
        
        {/* Extra scroll space and Footer */}
        <div className="relative w-full h-[20vh] bg-transparent flex items-end justify-center pb-4 md:pb-8 z-10 pointer-events-auto">
            <div className="font-sans font-black tracking-widest uppercase text-black text-xs md:text-sm border-[3px] border-black bg-white px-6 py-2 shadow-[4px_4px_0_rgba(0,0,0,1)] hover:bg-[#facc15] hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(0,0,0,1)] transition-all duration-300 cursor-default">
                © <span className="text-[#ff0000] ml-1">Developed By</span> <span className="ml-1">Vikas</span>
            </div>
        </div>
        </div>
    );
};

export default Contact;
