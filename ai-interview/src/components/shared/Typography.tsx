import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const TypographyH1 = ({ children, className }: TypographyProps) => (
  <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl font-heading text-white", className)}>
    {children}
  </h1>
);

export const TypographyH2 = ({ children, className }: TypographyProps) => (
  <h2 className={cn("scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 font-heading text-white", className)}>
    {children}
  </h2>
);

export const TypographyH3 = ({ children, className }: TypographyProps) => (
  <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight font-heading text-white", className)}>
    {children}
  </h3>
);

export const TypographyP = ({ children, className }: TypographyProps) => (
  <p className={cn("leading-7 [&:not(:first-child)]:mt-6 text-slate-400", className)}>
    {children}
  </p>
);

export const TypographyLead = ({ children, className }: TypographyProps) => (
  <p className={cn("text-xl text-slate-400 font-medium", className)}>
    {children}
  </p>
);

export const TypographyGradient = ({ children, className }: TypographyProps) => (
  <span className={cn("gradient-text font-bold", className)}>
    {children}
  </span>
);
