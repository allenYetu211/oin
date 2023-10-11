/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-07-02 02:29:02
 * @LastEditTime: 2023-10-09 14:44:38
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/libs/ui/src/lib/text/text.tsx
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@oin/utils';

const textsVariants = cva('flex items-center text-left leading-none', {
  variants: {
    variant: {
      default: 'text-[14px]',
      h1: 'text-[28px]',
      h2: 'text-[18px]',
      h3: 'text-[14px]',
      h4: 'text-[12px]',
    },
    textColor: {
      default: 'text-zinc-800',
      white: 'text-zinc-100',
      warning: 'text-amber-300',
      error: 'text-rose-600',
    },
  },
  defaultVariants: {
    variant: 'default',
    textColor: 'default',
  },
});

// extends VariantProps<typeof textsVariants>
export interface TextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof textsVariants> {
  asChild?: boolean;
}

/**
 * basis card
 */
export const Text = React.forwardRef<HTMLDivElement, TextProps>(
  ({ className, variant, textColor, asChild = false, ...props }, ref) => {
    const Comp = 'span';
    return (
      <Comp
        className={cn(textsVariants({ variant, textColor, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
