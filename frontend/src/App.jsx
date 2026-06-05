import React, { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Education from './components/Education'
import AboutMe from './components/AboutMe'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Preloader from './components/Preloader'
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Intentionally left empty since we want it to run on every refresh
  }, []);

  const handlePreloadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Preloader overlay (with high z-index) */}
      {isLoading && (
        <div className="fixed inset-0 z-[99999]">
          <Preloader onComplete={handlePreloadComplete} />
        </div>
      )}

      {/* Main content is rendered immediately so the browser downloads all heavy videos and images in the background! */}
      <main className={`w-full relative overflow-clip ${isLoading ? 'h-screen' : ''}`}>
        {/* Global Pattern & Lighting Background */}
        <div className="fixed inset-0 z-0 bg-[#E3D4C1] pointer-events-none">
          {/* Vibrant Neon Blue & Red Ambient Lighting */}
          <div
            className="absolute inset-0 opacity-100 mix-blend-multiply"
            style={{
              background: 'radial-gradient(circle at 0% 40%, rgba(0, 85, 255, 0.8) 0%, transparent 55%), radial-gradient(circle at 100% 60%, rgba(255, 0, 0, 0.8) 0%, transparent 55%)'
            }}
          />
          {/* Core Glow for true neon feel */}
          <div
            className="absolute inset-0 opacity-50 mix-blend-color-burn"
            style={{
              background: 'radial-gradient(circle at 0% 40%, rgba(0, 85, 255, 1) 0%, transparent 40%), radial-gradient(circle at 100% 60%, rgba(255, 0, 0, 1) 0%, transparent 40%)'
            }}
          />
          {/* Subtle Premium Noise Texture for Cinematic Blending */}
          <div
            className="absolute inset-0 opacity-[0.8] mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '150px 150px'
            }}
          />
          {/* Comic Book Halftone Print Pattern */}
          <div
            className="absolute inset-0 opacity-[0.25] mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='1.5' fill='%23000000'/%3E%3C/svg%3E")`,
              backgroundSize: '6px 6px'
            }}
          />
          {/* Glowing Curvy Spider Web Pattern Background */}
          <div
            className="absolute inset-0 opacity-100"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23000000' stroke-width='0.1' stroke-linecap='round' stroke-linejoin='round' fill='none' stroke-opacity='1'%3E%3Cpath d='M50 50 L50 10 M50 50 L90 50 M50 50 L50 90 M50 50 L10 50 M50 50 L78 22 M50 50 L78 78 M50 50 L22 78 M50 50 L22 22' /%3E%3Cpath d='M50 10 Q 62 20 78 22 Q 80 38 90 50 Q 80 62 78 78 Q 62 80 50 90 Q 38 80 22 78 Q 20 62 10 50 Q 20 38 22 22 Q 38 20 50 10' /%3E%3Cpath d='M50 20 Q 58 28 71 29 Q 72 42 80 50 Q 72 58 71 71 Q 58 72 50 80 Q 42 72 29 71 Q 28 58 20 50 Q 28 42 29 29 Q 42 28 50 20' /%3E%3Cpath d='M50 30 Q 56 35 64 36 Q 65 44 70 50 Q 65 56 64 64 Q 56 65 50 70 Q 44 65 36 64 Q 35 56 30 50 Q 35 44 36 36 Q 44 35 50 30' /%3E%3Cpath d='M50 40 Q 53 42 57 43 Q 58 47 60 50 Q 58 53 57 57 Q 53 58 50 60 Q 47 58 43 57 Q 42 53 40 50 Q 42 47 43 43 Q 47 42 50 40' /%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '150vmax 150vmax',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.4))'
            }}
          />
        </div>

        <div className="w-full min-h-screen relative z-10">
          <Hero />
        </div>
        <div className="w-full min-h-screen relative z-10">
          <Education />
        </div>
        <div className="w-full relative z-10">
          <AboutMe />
        </div>
        <div className="w-full relative z-10">
          <Projects />
        </div>
        <div className="w-full min-h-screen relative z-10">
          <Contact />
        </div>
      </main>
    </>
  )
}

export default App
