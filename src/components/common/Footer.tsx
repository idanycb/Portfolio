import { BsArrow90DegRight } from "react-icons/bs";

export function Footer() {
  return (
    <footer className="bg-foreground text-background w-full px-4 py-10 sm:px-10 md:py-12 lg:py-18">
      <div className="relative container mx-auto">
        <span className="absolute -top-4 left-0 text-xs font-light text-neutral-300 md:left-1 lg:-top-5 lg:text-sm">
          your friendly neighborhood coder
        </span>
        <div className="flex items-center justify-between">
          <h5 className="font-body text-[1.6rem] font-medium md:text-5xl lg:text-7xl">
            Check out the site code
          </h5>
          <a href="" target="_blank" className="">
            <BsArrow90DegRight className="h-10 w-10 rounded-full bg-white p-2.5 text-black md:h-12 md:w-12 lg:h-16 lg:w-16 lg:p-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
