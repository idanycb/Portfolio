import Image from "next/image";
import { TextFadeIn } from "../animation";
import { FadeIn } from "../animation/FadeIn";
import HeroLogo from "./HeroLogo.svg";

export function HeroLayout({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      className="font-heading flex h-full w-full max-w-md px-4 pt-10 pb-14 text-[10px] sm:max-w-full sm:px-6 lg:pb-8 lg:text-[12px]"
    >
      <div className="flex w-1/2 flex-col">
        <FadeIn delay={0.5} duration={1.5} className="w-full">
          <Image
            src={HeroLogo}
            alt="logo"
            priority
            className="w-full max-w-[100px] sm:max-w-[124px] lg:max-w-[138px]"
          />
        </FadeIn>
        <div className="flex grow items-center lg:items-end">
          <TextFadeIn
            delay={0.5}
            className="font-serif text-xs leading-tight font-extrabold sm:text-sm md:text-xs"
          >
            Passionate Designer & Full Stack Developer
          </TextFadeIn>
        </div>
      </div>
      <div className="flex w-1/2 flex-col">{children}</div>
    </div>
  );
}
