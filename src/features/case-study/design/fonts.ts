import { Source_Serif_4 } from "next/font/google";

// The exports set the case-study prose in Georgia, which is not installed on
// Linux or Android — there it silently fell back to the browser's default
// Times, far lighter than the surrounding Archivo. Source Serif 4 is
// self-hosted so every visitor sees the same face, and its weight and
// x-height sit much closer to Archivo's.
//
// Loaded here rather than in the root layout so it is only preloaded on case
// studies. On the home page the preload competed with the hero portrait for
// bandwidth and pushed out mobile LCP.
export const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});
