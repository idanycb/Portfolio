"use client";

import { cx } from "classix";
import Image from "next/image";
import { type ComponentProps, useEffect, useRef } from "react";

type ImageProps = ComponentProps<typeof Image>;

interface ParallaxImageProps extends Omit<ImageProps, "className"> {
  className?: string;
  imageClassName?: string;
  amount?: number;
  scale?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  sizes: string;
}

export function ParallaxImage({
  className,
  imageClassName,
  alt,
  sizes,
  amount = 18,
  scale = 1.12,
  start = "top bottom",
  end = "bottom top",
  scrub = true,
  fill: _fill,
  onLoad,
  ...imageProps
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const refreshScrollTriggerRef = useRef<() => void>(() => {});

  useEffect(() => {
    let canceled = false;
    let cleanup: (() => void) | undefined;

    const run = async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");

      if (canceled) return;
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      refreshScrollTriggerRef.current = () => ScrollTrigger.refresh();

      const container = containerRef.current;
      const frame = frameRef.current;
      const image = imageRef.current;

      if (!container || !frame || !image) {
        return;
      }

      let travel = 0;
      let centerOffset = 0;
      const setY = gsap.quickSetter(frame, "y", "px");

      const updateImagePosition = (progress: number) => {
        setY(centerOffset + gsap.utils.interpolate(-travel, travel, progress));
      };

      const updateParallaxMetrics = (self: ScrollTrigger) => {
        const scrollDistance = Math.max(1, self.end - self.start);
        const containerHeight = Math.max(1, container.offsetHeight);
        const imageHeight = Math.max(1, image.offsetHeight);
        const imageScale = Math.max(1, scale);
        const scaledImageHeight = imageHeight * imageScale;
        const maxTravel = Math.max(0, (scaledImageHeight - containerHeight) / 2);
        const requestedTravel = (scrollDistance * (amount / 100)) / 2;

        centerOffset = -imageHeight / 2;
        travel = Math.min(requestedTravel, maxTravel);

        gsap.set(image, {
          scale: imageScale,
        });

        updateImagePosition(self.progress);
      };

      gsap.set(image, {
        transformOrigin: "center center",
        willChange: "transform",
      });

      gsap.set(frame, {
        willChange: "transform",
      });

      const scrollTrigger = ScrollTrigger.create({
        trigger: container,
        start,
        end,
        scrub,
        invalidateOnRefresh: true,
        onRefresh: updateParallaxMetrics,
        onUpdate: (self) => {
          updateImagePosition(self.progress);
        },
      });

      const resizeObserver = new ResizeObserver(() => {
        scrollTrigger.refresh();
      });

      resizeObserver.observe(container);
      resizeObserver.observe(image);

      cleanup = () => {
        resizeObserver.disconnect();
        scrollTrigger.kill();
      };
    };

    run();

    return () => {
      canceled = true;
      refreshScrollTriggerRef.current = () => {};
      cleanup?.();
    };
  }, [amount, end, scale, scrub, start]);

  return (
    <div ref={containerRef} className={cx("absolute inset-0 overflow-hidden", className)}>
      <div ref={frameRef} className="absolute top-1/2 left-0 w-full">
        <Image
          {...imageProps}
          alt={alt}
          sizes={sizes}
          ref={imageRef}
          onLoad={(event) => {
            onLoad?.(event);
            refreshScrollTriggerRef.current();
          }}
          className={cx("block h-auto w-full max-w-none object-contain", imageClassName)}
        />
      </div>
    </div>
  );
}
