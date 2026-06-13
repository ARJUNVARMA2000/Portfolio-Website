import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, ScrambleTextPlugin, useGSAP);
}

/** matchMedia condition strings shared by every motion component. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 768px)";
export const FINE_POINTER = "(pointer: fine)";

/** House eases: entrances settle hard, draws/wipes breathe. */
export const EASE_OUT = "power4.out";
export const EASE_INOUT = "power3.inOut";

/** Character set for the "terminal decode" scramble signature. */
export const SCRAMBLE_CHARS = "▮▯/\\·01";

export { gsap, ScrollTrigger, SplitText, useGSAP };
