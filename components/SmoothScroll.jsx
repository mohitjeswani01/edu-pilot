"use client"; // This component must be a client component

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2, // Adjust speed (higher is slower)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
            smoothTouch: true, // Enable smooth scroll on touch devices
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup function to destroy the instance on component unmount
        return () => {
            lenis.destroy();
        };
    }, []);

    return null; // This component doesn't render any visible HTML
}