import { BsArrow90DegRight } from "react-icons/bs";

export function Footer() {
  return (
    <footer className="bg-foreground text-background w-full px-4 py-6">
      <div className="relative flex w-fit flex-col justify-center gap-2">
        <span className="absolute top-2 font-light">your friendly neighborhood coder</span>
        <a href="" target="_blank" className="self-end">
          <BsArrow90DegRight className="h-10 w-10 rounded-full bg-white p-2.5 text-black" />
        </a>
        <h5 className="font-body w-fit text-3xl font-medium">Check out the site code</h5>
      </div>
    </footer>
  );
}
