import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import StudioNotesSection from './sections/StudioNotesSection';
import CollectionSection from './sections/CollectionSection';
import SessionSection from './sections/SessionSection';
import BookingSection from './sections/BookingSection';
import EditorialSection from './sections/EditorialSection';
import TestimonialSection from './sections/TestimonialSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const snapTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    // Delay snap creation to ensure all ScrollTriggers are registered
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      snapTriggerRef.current = ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.05 && value <= r.end + 0.05);
            if (!inPinned) return value;
            
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      if (snapTriggerRef.current) {
        snapTriggerRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      <Navigation />
      <main className="relative">
        <HeroSection className="z-10" />
        <StudioNotesSection className="z-20" />
        <CollectionSection className="z-30" />
        <SessionSection className="z-40" />
        <BookingSection className="z-50" />
        <EditorialSection className="z-60" />
        <TestimonialSection className="z-70" />
        <ContactSection className="z-80" />
        <Footer />
      </main>
    </div>
  );
}

export default App;
