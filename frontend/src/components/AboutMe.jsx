import React, { useEffect, useRef, useState } from 'react';

// Custom Robotic Typewriter Component
const Typewriter = ({ text, delay = 0, isVisible, speed = 50, onComplete }) => {
    const [displayText, setDisplayText] = useState('');
    
    useEffect(() => {
        if (!isVisible) {
            setDisplayText('');
            return;
        }
        
        let timeout;
        let currentText = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                currentText += text.charAt(i);
                setDisplayText(currentText);
                i++;
                const randomSpeed = speed + (Math.random() * 40 - 20); 
                timeout = setTimeout(type, randomSpeed);
            } else if (onComplete) {
                onComplete();
            }
        };
        
        timeout = setTimeout(type, delay);
        
        return () => clearTimeout(timeout);
    }, [text, isVisible, delay, speed]);

    return <>{displayText}</>;
};

export default function AboutMe() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    
    const [part1Done, setPart1Done] = useState(false);
    const [part2Done, setPart2Done] = useState(false);
    const [headingDone, setHeadingDone] = useState(false);
    const [startReveal, setStartReveal] = useState(false);
    const [bioDone, setBioDone] = useState(false);

    useEffect(() => {
        if (headingDone) {
            const timer = setTimeout(() => setStartReveal(true), 50);
            return () => clearTimeout(timer);
        }
    }, [headingDone]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.4 } 
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const paragraphText = "Aspiring BCA graduate with a strong foundation in computer applications and real-time system development. Experienced in developing practical academic projects, demonstrating logical thinking and problem-solving abilities. Eager to apply classroom knowledge to real-world challenges in a collaborative way.";

    return (
        <section 
            id="about-me" 
            ref={sectionRef}
            className="relative w-full min-h-[100dvh] bg-transparent text-black px-6 md:px-16 lg:px-32 pt-4 md:pt-8 pb-32 flex flex-col justify-start overflow-hidden"
        >
            
            

            <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col">
                
                {/* Sequenced Robotic Typing Heading (Comic Style) */}
                <div className="flex w-full mb-8 md:mb-12 overflow-hidden py-4 -my-4">
                    <h1 className="relative inline-flex items-baseline bg-[#facc15] border-[3px] border-black px-4 py-2 transform -skew-x-6 rotate-[-1deg] hover-glitch cursor-crosshair animate-in slide-in-from-left-full duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
                        style={{ boxShadow: '6px 6px 0px rgba(0,0,0,1)' }}>
                        <span className="font-sans font-black tracking-tighter text-black text-2xl md:text-4xl lg:text-[3.5rem] leading-none">
                            <Typewriter text="ABOUT" isVisible={isVisible} speed={25} onComplete={() => setPart1Done(true)} />
                        </span>
                        <span className="font-serif italic font-semibold uppercase tracking-normal pl-2 md:pl-4 text-black text-2xl md:text-4xl lg:text-[3.5rem] leading-none">
                            {part1Done && <Typewriter text="ME" isVisible={true} speed={25} onComplete={() => setPart2Done(true)} />}
                        </span>
                        <span className="text-[#ff0000] font-serif text-2xl md:text-4xl lg:text-[3.5rem] leading-none">
                            {part2Done && <Typewriter text="." isVisible={true} speed={25} onComplete={() => setHeadingDone(true)} />}
                        </span>
                        {!headingDone && isVisible && <span className="ml-2 animate-[pulse_0.2s_infinite] text-[#ff0000] text-2xl md:text-4xl lg:text-[3.5rem] leading-none self-center md:self-auto translate-y-1 md:translate-y-0 shadow-[0_0_10px_#ff0000]">█</span>}
                    </h1>
                </div>

                {/* Content Paragraph - Narrator Box */}
                <div 
                    className="relative w-full max-w-4xl min-h-[80px] mt-8 bg-white border-[3px] border-black p-6 md:p-8 shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                    style={{
                        clipPath: startReveal ? 'inset(-50px -50px -50px -50px)' : 'inset(0 100% 0 0)',
                        transition: 'clip-path 1.5s cubic-bezier(0.22, 1, 0.36, 1)'
                    }}
                    onTransitionEnd={() => setBioDone(true)}
                >
                    {/* Marvel Style Badge */}
                    <div className="absolute -top-5 left-4 md:left-8 bg-[#ff0000] text-white font-['Anton'] text-sm md:text-xl px-3 py-1 tracking-widest uppercase border-[3px] border-black z-30 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        ORIGIN STORY
                    </div>
                    {/* Folded corner comic effect */}
                    <div className="absolute top-[-3px] right-[-3px] w-8 h-8 bg-[#E3D4C1] border-l-[3px] border-b-[3px] border-black z-20"></div>
                    <p 
                        className="relative text-sm md:text-xl text-black font-black font-sans leading-loose tracking-widest uppercase z-10" 
                    >
                        {headingDone && paragraphText}
                    </p>
                </div>

                {/* Tech Skills Grid - Fades in gently after Bio is done typing */}
                {bioDone && (
                    <div className="w-full mt-12 md:mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            
                            {/* Coding Languages */}
                            <div className="flex flex-col bg-[#E3D4C1] border-[3px] border-black p-6 md:p-8 transition-transform duration-300 hover:-translate-y-2 group shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                                <h4 className="font-sans font-black text-black text-lg md:text-xl uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <span className="w-4 h-4 bg-[#ff0000] border-2 border-black rotate-45 inline-block group-hover:rotate-90 transition-transform duration-300"></span>
                                    Coding Languages
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {['Java', 'Python', 'XML', 'C', 'C#', 'JavaScript'].map((skill, idx) => (
                                        <span key={skill} 
                                              className={`px-4 py-2 bg-white border-[2.5px] border-black text-black text-sm md:text-base font-black uppercase tracking-wider hover:bg-[#ff0000] hover:text-white active:bg-[#ff0000] active:text-white transition-all duration-300 cursor-default ${idx % 2 === 0 ? '-rotate-2' : 'rotate-2'} hover:rotate-0 hover:scale-110 active:scale-95 active:rotate-0`}
                                              style={{ boxShadow: '3px 3px 0px rgba(0,0,0,1)' }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Web Technologies */}
                            <div className="flex flex-col bg-[#E3D4C1] border-[3px] border-black p-6 md:p-8 transition-transform duration-300 hover:-translate-y-2 group shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                                <h4 className="font-sans font-black text-black text-lg md:text-xl uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <span className="w-4 h-4 bg-[#facc15] border-2 border-black rotate-45 inline-block group-hover:rotate-90 transition-transform duration-300"></span>
                                    Web Technologies
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {['Mongoose', 'Express', 'React', 'Node.js'].map((skill, idx) => (
                                        <span key={skill} 
                                              className={`px-4 py-2 bg-white border-[2.5px] border-black text-black text-sm md:text-base font-black uppercase tracking-wider hover:bg-[#0055ff] hover:text-white active:bg-[#0055ff] active:text-white transition-all duration-300 cursor-default ${idx % 2 === 0 ? '-rotate-2' : 'rotate-2'} hover:rotate-0 hover:scale-110 active:scale-95 active:rotate-0`}
                                              style={{ boxShadow: '3px 3px 0px rgba(0,0,0,1)' }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Databases */}
                            <div className="flex flex-col bg-[#E3D4C1] border-[3px] border-black p-6 md:p-8 transition-transform duration-300 hover:-translate-y-2 group shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                                <h4 className="font-sans font-black text-black text-lg md:text-xl uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <span className="w-4 h-4 bg-[#0055ff] border-2 border-black rotate-45 inline-block group-hover:rotate-90 transition-transform duration-300"></span>
                                    Databases & Cloud
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {['MongoDB', 'AWS'].map((skill, idx) => (
                                        <span key={skill} 
                                              className={`px-4 py-2 bg-white border-[2.5px] border-black text-black text-sm md:text-base font-black uppercase tracking-wider hover:bg-[#ff0000] hover:text-white active:bg-[#ff0000] active:text-white transition-all duration-300 cursor-default ${idx % 2 === 0 ? '-rotate-2' : 'rotate-2'} hover:rotate-0 hover:scale-110 active:scale-95 active:rotate-0`}
                                              style={{ boxShadow: '3px 3px 0px rgba(0,0,0,1)' }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Others */}
                            <div className="flex flex-col bg-[#E3D4C1] border-[3px] border-black p-6 md:p-8 transition-transform duration-300 hover:-translate-y-2 group shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                                <h4 className="font-sans font-black text-black text-lg md:text-xl uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <span className="w-4 h-4 bg-white border-2 border-black rotate-45 inline-block group-hover:rotate-90 transition-transform duration-300"></span>
                                    Others
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {['CyberSecurity', 'Data Structures', 'PowerBI'].map((skill, idx) => (
                                        <span key={skill} 
                                              className={`px-4 py-2 bg-white border-[2.5px] border-black text-black text-sm md:text-base font-black uppercase tracking-wider hover:bg-[#facc15] hover:text-black active:bg-[#facc15] active:text-black transition-all duration-300 cursor-default ${idx % 2 === 0 ? '-rotate-2' : 'rotate-2'} hover:rotate-0 hover:scale-110 active:scale-95 active:rotate-0`}
                                              style={{ boxShadow: '3px 3px 0px rgba(0,0,0,1)' }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
