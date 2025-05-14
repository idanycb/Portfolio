import { Header, StickyNav } from "@/components/common";

type HeroProps = {
  children: React.ReactNode;
};

export function HeroWithNav({ children }: HeroProps) {
  return (
    <>
      <div className="flex h-svh w-full flex-col overflow-hidden">
        <Header />
        {children}
      </div>
      <StickyNav />
    </>
  );
}
