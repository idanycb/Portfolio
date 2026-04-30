import { Marquee } from "@/components/animation/Marquee";

import { FadeIn } from "@/components/animation";
import { otherProjects, spotlightProjects } from "./data/projects";

const allTags = [
  ...new Set([
    ...spotlightProjects.flatMap((p) => p.tags),
    ...otherProjects.flatMap((p) => p.tags),
  ]),
];

const splitIndex = Math.ceil(allTags.length / 2);
const marqueeRows = [allTags.slice(0, splitIndex), allTags.slice(splitIndex)];

export function ProjectsMarquee() {
  return (
    <FadeIn scrollTrigger from="left">
      <Marquee tags={marqueeRows} />
    </FadeIn>
  );
}
