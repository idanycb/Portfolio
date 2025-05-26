type HeroProps = {
  children: React.ReactNode;
};

export function HeroWithNav({ children }: HeroProps) {
  return (
    <>
      <section className="flex h-svh w-full flex-col overflow-hidden">{children}</section>
    </>
  );
}
