import cx from "classix";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cx("container mx-auto px-8", className)}>{children}</div>;
}
