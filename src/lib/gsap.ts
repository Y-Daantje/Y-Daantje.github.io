import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export function scrollToSection(id: string) {
  gsap.to(window, {
    duration: 1.1,
    ease: 'power3.inOut',
    scrollTo: { y: `#${id}`, offsetY: id === 'home' ? 0 : 72 },
  });
}

export { gsap, ScrollTrigger, useGSAP };
