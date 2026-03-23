import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: element, offsetY: 0 },
        ease: "power3.inOut"
      });
    }
  };

  const navLinks = [
    { label: 'Work', id: 'collection' },
    { label: 'Collections', id: 'studio-notes' },
    { label: 'The Experience', id: 'session' },
    { label: 'Contact', id: 'contact' },
    { label: 'Privacy', id: '' },
  ];

  return (
    <footer 
      ref={footerRef}
      className="bg-cream text-dark py-[8vh] px-[6vw]"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left Column */}
          <div>
            <h3 className="font-serif text-3xl md:text-4xl mb-4">
              Boudoir photography that feels like you.
            </h3>
            <p className="text-dark/70 mb-6">
              hello@ellastudio.studio
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 border border-dark/20 flex items-center justify-center hover:bg-dark hover:text-cream transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="mailto:hello@ellastudio.studio"
                className="w-10 h-10 border border-dark/20 flex items-center justify-center hover:bg-dark hover:text-cream transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col md:items-end">
            <nav className="mb-8">
              <ul className="flex flex-wrap gap-x-8 gap-y-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => link.id && scrollToSection(link.id)}
                      className="text-dark/80 hover:text-dark transition-colors text-sm font-mono tracking-wider uppercase"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="flex gap-6 text-sm text-dark/60">
              <a href="#" className="hover:text-dark transition-colors">Instagram</a>
              <a href="#" className="hover:text-dark transition-colors">Pinterest</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-dark/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-dark/50 text-sm">
            © Ella Studio by FR. All rights reserved.
          </p>
          <p className="text-dark/50 text-xs font-mono tracking-wider">
            CRAFTED WITH CARE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
