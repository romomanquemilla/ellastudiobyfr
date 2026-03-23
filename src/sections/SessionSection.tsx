import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SessionSectionProps {
  className?: string;
}

const SessionSection = ({ className = '' }: SessionSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        }
      });

      tl.fromTo(contentRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, ease: 'power2.out' },
        0
      );

      tl.fromTo(contentRef.current,
        { opacity: 1, x: 0 },
        { opacity: 0, x: -30, ease: 'power1.in' },
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
      id="session"
      className={`section-pinned ${className}`}
    >
      <img
        src="./images/session_kneeling.jpg"
        alt="Session"
        className="bg-image"
        style={{ objectPosition: '50% 50%' }}
        loading="lazy"
      />
      
      <div className="vignette-overlay" />

      <div 
        ref={contentRef}
        className="absolute inset-0 px-[6vw] py-[10vh]"
      >
        <div className="pt-[8vh] flex justify-between">
          <div className="max-w-[40vw]">
            <span className="font-mono-label text-cream/70 block mb-4">
              SESSION
            </span>
            
            <h2 className="font-serif text-cream text-[clamp(34px,3.6vw,56px)] leading-[1.05]">
              A calm space.<br />A clear plan.
            </h2>
          </div>
          
          <div className="max-w-[34vw] pt-[8vh]">
            <p className="text-cream/80 text-base md:text-lg leading-relaxed">
              We start with a consultation, build a mood board, and shoot with intention—so you never feel rushed or exposed.
            </p>
          </div>
        </div>

        <div className="absolute bottom-[10vh] left-[6vw] right-[6vw] flex justify-between items-end">
          <div className="max-w-[30vw]">
            <div className="hairline mb-6" />
            <p className="text-cream/70 text-sm leading-relaxed">
              2–3 hour session · Same-week proofs · Private gallery
            </p>
          </div>
          
          <button 
            onClick={() => scrollToSection('booking')}
            className="btn-accent"
          >
            Check availability
          </button>
        </div>
      </div>
    </section>
  );
};

export default SessionSection;
