import Image from "next/image";
import { FadeIn } from "../animation/FadeIn";
import { HeroLayout } from "../layouts/HeroLayout";
import SelfPortrait from "./img/portrait-grayscale.png";

export const HeroPage = () => {
  return (
    <section className="relative flex h-svh justify-center overflow-hidden">
      <HeroLayout>
        <div className="absolute right-0 h-[350px] w-1/2 max-w-[200px] sm:top-0 sm:h-full sm:max-w-full">
          <FadeIn className="relative h-full" from="right" delay={1} duration={1.5}>
            <Image
              src={SelfPortrait}
              fill
              priority
              className="bg-neutral-600 object-cover object-[40%_0%] pt-4 sm:pt-8"
              alt="image of Daniel Thomas"
            />
          </FadeIn>
        </div>
      </HeroLayout>
    </section>
  );
};
