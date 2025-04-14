import { Header } from "@/components/ui/Header";
import { StickyNav } from "./StickyNav";

type HeroProps = {
  children: React.ReactNode;
};

export function HeroWithNav({ children }: HeroProps) {
  return (
    <>
      <div className="h-svh w-full overflow-hidden">
        <Header />
        {children}
      </div>
      <StickyNav />
    </>
  );
}
