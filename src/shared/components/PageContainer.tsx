import React from 'react';
import { twMerge } from 'tailwind-merge';

type PageContainerProps = React.PropsWithChildren & {
  className?: string;
};

export const PageContainer = ({ className, children }: PageContainerProps) => {
  return (
    <div
      className={twMerge(
        `mx-auto w-full max-w-screen-2xl px-6 md:px-16 ${className}`
      )}
    >
      {children}
    </div>
  );
};
