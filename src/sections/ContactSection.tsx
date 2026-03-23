import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hola! Me interesa agendar una sesión de boudoir. ¿Podemos conversar?');
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className={`section-pinned ${className}`}
    >
      <img
        src="./images/contact_closing.jpg"
        alt="Contact"
        className="bg-image"
        style={{ objectPosition: '55% 50%' }}
        loading="lazy"
      />
      
      <div className="vignette-overlay" />

      <div 
        ref={contentRef}
        className="absolute inset-0 px-[6vw] py-[10vh]"
      >
        <div className="pt-[8vh] flex justify-between">
          <div className="max-w-[42vw]">
            <span className="font-mono-label text-cream/70 block mb-4">
              CONTACT
            </span>
            
            <h2 className="font-serif text-cream text-[clamp(34px,3.6vw,56px)] leading-[1.05]">
              Let's plan your session.
            </h2>
          </div>
          
          <div className="max-w-[34vw] pt-[8vh]">
            <p className="text-cream/80 text-base md:text-lg leading-relaxed mb-8">
              Tell me what you're dreaming up. I'll reply within 24 hours with availability and next steps.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-cream/30 text-cream placeholder:text-cream/50 py-3 focus:outline-none focus:border-gold transition-colors"
                required
              />
              <input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-cream/30 text-cream placeholder:text-cream/50 py-3 focus:outline-none focus:border-gold transition-colors"
                required
              />
              <textarea
                placeholder="Tell me about your vision..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-cream/30 text-cream placeholder:text-cream/50 py-3 focus:outline-none focus:border-gold transition-colors resize-none h-24"
                required
              />
              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  className="btn-accent-filled flex items-center gap-2"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? 'Sent!' : (
                    <>
                      <Send size={16} />
                      Send message
                    </>
                  )}
                </button>
                <button 
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="btn-accent flex items-center gap-2"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="absolute bottom-[10vh] left-[6vw] right-[6vw] flex justify-between items-end">
          <div className="max-w-[30vw]">
            <div className="hairline mb-6" />
            <p className="text-cream/70 text-sm leading-relaxed">
              hello@ellastudio.studio · @ellastudio
            </p>
          </div>
          
          <p className="text-cream/50 text-xs font-mono tracking-wider">
            RESPONDING WITHIN 24H
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
