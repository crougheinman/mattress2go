import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
    children: ReactNode;
    /** Extra classes applied to the wrapper (e.g. spacing). */
    className?: string;
    /** Delay before the reveal transition, in milliseconds. */
    delay?: number;
}

/**
 * Lightweight "animate on scroll" wrapper. Fades + slides its children up the
 * first time they enter the viewport. Dependency-free, only animates opacity
 * and a small vertical translate (no horizontal overflow), and respects the
 * user's reduced-motion preference.
 */
const Reveal = ({ children, className = '', delay = 0 }: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Reduced motion: show immediately, no animation.
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            } ${className}`}
        >
            {children}
        </div>
    );
};

export default Reveal;
