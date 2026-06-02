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
    
    // Sequencing states
    const [part1Done, setPart1Done] = useState(false);
    const [part2Done, setPart2Done] = useState(false);
    const [headingDone, setHeadingDone] = useState(false);
    const [bioDone, setBioDone] = useState(false);

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
            className="relative w-full min-h-[100dvh] bg-[#E3D4C1] text-black px-6 md:px-16 lg:px-32 pt-4 md:pt-8 pb-32 flex flex-col justify-start"
        >
            
            {/* Glowing Curvy Spider Web Pattern Background */}
            <div 
                className="absolute inset-0 z-0 pointer-events-none opacity-80"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%2368d391' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round' fill='none' stroke-opacity='0.4'%3E%3Cpath d='M50 50 L50 10 M50 50 L90 50 M50 50 L50 90 M50 50 L10 50 M50 50 L78 22 M50 50 L78 78 M50 50 L22 78 M50 50 L22 22' /%3E%3Cpath d='M50 10 Q 62 20 78 22 Q 80 38 90 50 Q 80 62 78 78 Q 62 80 50 90 Q 38 80 22 78 Q 20 62 10 50 Q 20 38 22 22 Q 38 20 50 10' /%3E%3Cpath d='M50 20 Q 58 28 71 29 Q 72 42 80 50 Q 72 58 71 71 Q 58 72 50 80 Q 42 72 29 71 Q 28 58 20 50 Q 28 42 29 29 Q 42 28 50 20' /%3E%3Cpath d='M50 30 Q 56 35 64 36 Q 65 44 70 50 Q 65 56 64 64 Q 56 65 50 70 Q 44 65 36 64 Q 35 56 30 50 Q 35 44 36 36 Q 44 35 50 30' /%3E%3Cpath d='M50 40 Q 53 42 57 43 Q 58 47 60 50 Q 58 53 57 57 Q 53 58 50 60 Q 47 58 43 57 Q 42 53 40 50 Q 42 47 43 43 Q 47 42 50 40' /%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '180px 180px',
                    filter: 'drop-shadow(0px 0px 4px rgba(104, 211, 145, 0.5))'
                }}
            ></div>

            <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col">
                
                {/* Sequenced Robotic Typing Heading */}
                <h1 className="text-3xl md:text-4xl lg:text-[3rem] font-bold tracking-tight mb-8 md:mb-12 text-left w-full leading-none flex items-baseline flex-wrap">
                    <span className="font-sans font-black tracking-tighter text-[#1a1a1a]">
                        <Typewriter text="ABOUT" isVisible={isVisible} speed={70} onComplete={() => setPart1Done(true)} />
                    </span>
                    <span className="font-serif italic font-normal uppercase tracking-normal pl-2 md:pl-4 text-[#1a1a1a] text-[0.85em]">
                        {part1Done && <Typewriter text="ME" isVisible={true} speed={70} onComplete={() => setPart2Done(true)} />}
                    </span>
                    <span className="text-[#2C5E3B] font-serif">
                        {part2Done && <Typewriter text="." isVisible={true} speed={70} onComplete={() => setHeadingDone(true)} />}
                    </span>
                    {/* Blinking robotic cursor for heading */}
                    {!headingDone && isVisible && <span className="ml-2 animate-pulse text-[#2C5E3B] self-center md:self-auto translate-y-1 md:translate-y-0">█</span>}
                </h1>

                {/* Content Paragraph - Types out after heading finishes */}
                <div className="w-full text-base md:text-xl text-neutral-800 font-sans max-w-4xl leading-relaxed min-h-[80px]">
                    <p>
                        {headingDone && (
                            <>
                                <Typewriter text={paragraphText} isVisible={true} speed={25} onComplete={() => setBioDone(true)} />
                                {!bioDone && <span className="ml-1 animate-pulse text-[#2C5E3B]">█</span>}
                            </>
                        )}
                    </p>
                </div>

                {/* Tech Skills Grid - Fades in gently after Bio is done typing */}
                {bioDone && (
                    <div className="w-full mt-8 md:mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            
                            {/* Coding Languages */}
                            <div className="flex flex-col bg-transparent border-[3px] border-[#2C5E3B] rounded-[2rem] p-6 md:p-8 shadow-lg hover:shadow-2xl hover:bg-[#2C5E3B]/5 transition-all duration-300 hover:-translate-y-2 group">
                                <h4 className="font-sans font-black text-[#1a1a1a] text-lg md:text-xl uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-[#2C5E3B] rounded-full inline-block group-hover:scale-y-125 transition-transform duration-300"></span>
                                    Coding Languages
                                </h4>
                                <div className="flex flex-wrap gap-2.5">
                                    {['Java', 'Python', 'XML', 'C', 'C#', 'JavaScript'].map(skill => (
                                        <span key={skill} className="px-4 py-2 bg-transparent border-2 border-[#1a1a1a] text-[#1a1a1a] text-sm font-bold rounded-full hover:bg-[#1a1a1a] hover:text-[#E3D4C1] transition-colors duration-300 cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Web Technologies */}
                            <div className="flex flex-col bg-transparent border-[3px] border-[#2C5E3B] rounded-[2rem] p-6 md:p-8 shadow-lg hover:shadow-2xl hover:bg-[#2C5E3B]/5 transition-all duration-300 hover:-translate-y-2 group">
                                <h4 className="font-sans font-black text-[#1a1a1a] text-lg md:text-xl uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-[#2C5E3B] rounded-full inline-block group-hover:scale-y-125 transition-transform duration-300"></span>
                                    Web Technologies
                                </h4>
                                <div className="flex flex-wrap gap-2.5">
                                    {['Mongoose', 'Express', 'React', 'Node.js'].map(skill => (
                                        <span key={skill} className="px-4 py-2 bg-transparent border-2 border-[#1a1a1a] text-[#1a1a1a] text-sm font-bold rounded-full hover:bg-[#1a1a1a] hover:text-[#E3D4C1] transition-colors duration-300 cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Databases */}
                            <div className="flex flex-col bg-transparent border-[3px] border-[#2C5E3B] rounded-[2rem] p-6 md:p-8 shadow-lg hover:shadow-2xl hover:bg-[#2C5E3B]/5 transition-all duration-300 hover:-translate-y-2 group">
                                <h4 className="font-sans font-black text-[#1a1a1a] text-lg md:text-xl uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-[#2C5E3B] rounded-full inline-block group-hover:scale-y-125 transition-transform duration-300"></span>
                                    Databases & Cloud
                                </h4>
                                <div className="flex flex-wrap gap-2.5">
                                    {['MongoDB', 'AWS'].map(skill => (
                                        <span key={skill} className="px-4 py-2 bg-transparent border-2 border-[#1a1a1a] text-[#1a1a1a] text-sm font-bold rounded-full hover:bg-[#1a1a1a] hover:text-[#E3D4C1] transition-colors duration-300 cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Others */}
                            <div className="flex flex-col bg-transparent border-[3px] border-[#2C5E3B] rounded-[2rem] p-6 md:p-8 shadow-lg hover:shadow-2xl hover:bg-[#2C5E3B]/5 transition-all duration-300 hover:-translate-y-2 group">
                                <h4 className="font-sans font-black text-[#1a1a1a] text-lg md:text-xl uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-[#2C5E3B] rounded-full inline-block group-hover:scale-y-125 transition-transform duration-300"></span>
                                    Others
                                </h4>
                                <div className="flex flex-wrap gap-2.5">
                                    {['CyberSecurity', 'Data Structures', 'PowerBI'].map(skill => (
                                        <span key={skill} className="px-4 py-2 bg-transparent border-2 border-[#1a1a1a] text-[#1a1a1a] text-sm font-bold rounded-full hover:bg-[#1a1a1a] hover:text-[#E3D4C1] transition-colors duration-300 cursor-default">
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
