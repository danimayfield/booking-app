import React from "react";
import { twMerge } from "tailwind-merge";

type ContainerProps = React.PropsWithChildren & {
  className?: string;
};

export const Container = ({ className, children }: ContainerProps) => {
    return (
      <div
        className={twMerge(
          `w-full mx-auto max-w-screen-2xl px-6 md:px-16 ${className}`
        )}
      >
        {children}
      </div>
    );
};
