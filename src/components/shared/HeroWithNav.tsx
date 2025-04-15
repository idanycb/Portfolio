import { Header, StickyNav } from "@/components/ui";

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
