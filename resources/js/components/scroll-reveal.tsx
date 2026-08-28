import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade';

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    direction?: Direction;
    delay?: number; // in milliseconds
    duration?: number; // in milliseconds
    className?: string;
    distance?: number; // in pixels
    threshold?: number;
}

export function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 700,
    className = '',
    distance = 40,
    threshold = 0.12,
    ...props
}: ScrollRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Reversible: true when intersecting, false when scrolling away
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold]);

    const getTransform = () => {
        if (isVisible) {
            return 'none';
        }

        switch (direction) {
            case 'up':
                return `translate3d(0, ${distance}px, 0)`;
            case 'down':
                return `translate3d(0, -${distance}px, 0)`;
            case 'left':
                return `translate3d(${distance}px, 0, 0)`;
            case 'right':
                return `translate3d(-${distance}px, 0, 0)`;
            case 'zoom':
                return 'scale(0.92)';
            case 'fade':
            default:
                return 'none';
        }
    };

    return (
        <div
            ref={elementRef}
            className={cn('will-change-[transform,opacity]', className)}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transitionProperty: 'opacity, transform',
                transitionDuration: `${duration}ms`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${delay}ms`,
            }}
            {...props}
        >
            {children}
        </div>
    );
}

export default ScrollReveal;
