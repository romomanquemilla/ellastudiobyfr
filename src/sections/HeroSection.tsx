import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll animation - simplified
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        }
      })
      .fromTo(contentRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -50, ease: 'power1.in' },
        0.6
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 0 },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="hero"
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <img
        src="./images/hero_signature.jpg"
        alt="Ella Studio Boudoir"
        className="bg-image"
        style={{ objectPosition: '55% 50%' }}
        loading="eager"
      />
      
      {/* Vignette Overlay */}
      <div className="vignette-overlay" />

      {/* Content */}
      <div 
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-between px-[6vw] py-[10vh]"
      >
        {/* Top Content */}
        <div className="pt-[8vh]">
          <span className="font-mono-label text-cream/70 block mb-4">
            ELLA STUDIO
          </span>
          
          <div className="max-w-[44vw]">
            <h1 className="font-serif text-cream text-[clamp(44px,5.2vw,78px)] leading-[1.05]">
              Boudoir that feels like you.
            </h1>
          </div>
          
          <p className="text-cream/80 text-lg md:text-xl max-w-[36vw] mt-6 leading-relaxed">
            Soft light. Honest moments. A studio experience designed around comfort.
          </p>
        </div>

        {/* Bottom Content */}
        <div className="flex justify-between items-end">
          <div className="max-w-[34vw]">
            <div className="hairline mb-6" />
            <p className="text-cream/70 text-sm leading-relaxed">
              Based in the city. Available for destination sessions.
            </p>
          </div>
          
          <button 
            onClick={() => scrollToSection('collection')}
            className="btn-accent"
          >
            Explore collections
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
