import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EditorialSectionProps {
  className?: string;
}

const EditorialSection = ({ className = '' }: EditorialSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=110%',
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        }
      });

      tl.fromTo(contentRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0
      );

      tl.fromTo(contentRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -20, ease: 'power1.in' },
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
      id="editorial"
      className={`section-pinned ${className}`}
    >
      {/* Two Column Images */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full">
          <img
            src="./images/editorial_left.jpg"
            alt="Editorial Detail"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="w-1/2 h-full">
          <img
            src="./images/editorial_right.jpg"
            alt="Editorial Full"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      
      <div className="vignette-overlay" />

      <div 
        ref={contentRef}
        className="absolute inset-0 px-[6vw] py-[10vh]"
      >
        <div className="pt-[8vh] flex justify-between">
          <div className="max-w-[38vw]">
            <span className="font-mono-label text-cream/70 block mb-4">
              EDITORIAL
            </span>
            
            <h2 className="font-serif text-cream text-[clamp(34px,3.6vw,56px)] leading-[1.05]">
              Mood first.<br />Posing second.
            </h2>
          </div>
          
          <div className="max-w-[34vw] pt-[8vh]">
            <p className="text-cream/80 text-base md:text-lg leading-relaxed">
              We build the scene around feeling—light, texture, silence—then guide you into shapes that feel natural.
            </p>
          </div>
        </div>

        <div className="absolute bottom-[10vh] left-[6vw] right-[6vw] flex justify-between items-end">
          <div className="max-w-[34vw]">
            <div className="hairline mb-6" />
            <p className="text-cream/70 text-sm leading-relaxed">
              Film-inspired color · Clean retouching · Print-ready files
            </p>
          </div>
          
          <button 
            onClick={() => scrollToSection('testimonial')}
            className="btn-accent"
          >
            View the portfolio
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
