import React from 'react';
import slvImg from '../assets/SLV.PNG';
import snsImg from '../assets/SNS.PNG';
import teamAlphaImg from '../assets/teamalpha.PNG';
import momImg from '../assets/mom.PNG';

const ProjectCard = ({ title, imageSrc, description, linkUrl }) => {
    return (
        <a 
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col bg-[#E3D4C1] border-[3px] border-[#2C5E3B] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
        >
            
            {/* Image Container - Natural image ratio dictates height without any cropping */}
            <div className="w-full border-b-[3px] border-[#2C5E3B] overflow-hidden bg-white/30">
                <img 
                    src={imageSrc} 
                    alt={title} 
                    className="w-full h-auto block object-contain grayscale-[15%] group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-[1.02]"
                />
            </div>

            {/* Content Container */}
            <div className="p-6 md:p-10 flex flex-col group-hover:bg-[#2C5E3B]/5 transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-8 w-full">
                    
                    {/* Text Block */}
                    <div className="flex flex-col w-full md:w-3/4">
                        <h3 className="font-sans font-black text-[#1a1a1a] text-3xl md:text-5xl tracking-wide uppercase mb-3 md:mb-6">
                            {title}
                        </h3>
                        <p className="text-neutral-700 font-serif italic text-base md:text-xl leading-relaxed">
                            {description}
                        </p>
                    </div>
                    
                    {/* Visit Link Button - Full width on mobile, auto on desktop */}
                    <div className="group/btn relative overflow-hidden inline-flex items-center justify-center gap-3 text-[#1a1a1a] hover:text-[#E3D4C1] font-sans font-black tracking-widest uppercase border-[3px] border-[#1a1a1a] px-6 py-4 md:py-3 rounded-full transition-colors duration-500 w-full md:w-fit shrink-0 z-10 bg-transparent mt-2 md:mt-0">
                        <div className="absolute inset-0 bg-[#2C5E3B] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] z-[-1]"></div>
                        VISIT APP <span className="text-xl leading-none transform group-hover/btn:translate-x-1 transition-transform duration-500">→</span>
                    </div>

                </div>
            </div>

        </a>
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
        <section id="projects" className="relative w-full min-h-[100dvh] bg-[#E3D4C1] text-black px-6 md:px-16 lg:px-32 pt-4 md:pt-8 pb-32 flex flex-col justify-start">
            
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
                
                <h1 className="text-3xl md:text-4xl lg:text-[3rem] font-bold tracking-tight text-[#1a1a1a] mb-8 md:mb-12 text-left w-full leading-none flex items-baseline flex-wrap">
                    <span className="font-sans font-black tracking-tighter">PROJ</span>
                    <span className="font-serif italic font-normal tracking-normal pr-1">ECTS</span>
                    <span className="text-[#2C5E3B] font-serif">.</span>
                </h1>

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
