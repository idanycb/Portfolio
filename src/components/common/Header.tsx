import { TextFadeIn } from "../animation";

export function Header() {
  return (
    <header className="font-heading flex w-full justify-between px-4 pt-8 text-[10px] text-black sm:px-10 lg:px-16 lg:text-[12px]">
      <TextFadeIn delay={0.5} className="shrink-0 font-medium">
        @ Code by Dany
      </TextFadeIn>
      <TextFadeIn delay={0.5} className="w-54 self-end text-right font-light lg:w-84">
        Passionate Creative Designer and Developer, dedicated to crafting innovative solutions and
        exceptional digital experiences through modern technologies
      </TextFadeIn>
    </header>
  );
}
