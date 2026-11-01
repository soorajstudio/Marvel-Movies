import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AppProvider, useApp } from './context/AppContext';
import VhsDefs from './components/VhsDefs';
import GreenFog from './components/GreenFog';
import Particles from './Particles';
import VhsOsd from './components/VhsOsd';
import FloatingAudioPlayer from './components/FloatingAudioPlayer';
import Header from './components/Header';
import TimelineNav from './components/TimelineNav';
import MobileMenu from './components/MobileMenu';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import DoomsdaySection from './components/DoomsdaySection';
import RewindSection from './components/RewindSection';
import Footer from './components/Footer';
import ViewShelf from './components/ViewShelf';
import ViewList from './components/ViewList';
import ViewMine from './components/ViewMine';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const { activeView } = useApp();

  // Initialize Lenis smooth scroll and connect to GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1
    });

    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <>
      <GreenFog />
      <div
        className="particles-bg-container"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      >
        <Particles
          particleColors={["#4dff8c", "#2ea860", "#66ff99", "#80ffaa"]}
          particleCount={220}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={35}
          glow={0.35}
          twinkle={0.3}
          moveParticlesOnHover
          hoverEffect="parallax"
          sizeRandomness={0.4}
          shape="circle"
          depthOfField={0}
          connections={false}
          connectionDistance={110}
          particleHoverFactor={1}
          hoverRadius={140}
          drift="none"
          driftSpeed={1}
          alphaParticles={false}
          disableRotation={false}
          cameraDistance={24}
          variation={0}
          opacity={0.9}
          clickBurst
          intro
          lightMode={false}
        />
      </div>
      <VhsDefs />
      <VhsOsd />
      <Header />
      <TimelineNav />
      <MobileMenu />
      <FloatingAudioPlayer />

      <main style={{ minHeight: '100vh', opacity: activeView !== 'scroll' ? 0.05 : 1, transition: 'opacity 0.3s ease' }}>
        <Hero />
        <Timeline />
        <DoomsdaySection />
        <RewindSection />
        <Footer />
      </main>

      <ViewShelf />
      <ViewList />
      <ViewMine />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
