import React from 'react'
import Hero from './components/Hero'
import Education from './components/Education'
import AboutMe from './components/AboutMe'
import Projects from './components/Projects'

function App() {
  return (
    <main className="w-full bg-black overflow-x-hidden">
      <div className="w-full min-h-screen">
        <Hero />
      </div>
      <div className="w-full min-h-screen">
        <Education />
      </div>
      <div className="w-full min-h-screen">
        <AboutMe />
      </div>
      <div className="w-full min-h-screen">
        <Projects />
      </div>
    </main>
  )
}

export default App
