/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-26 00:10:04
 * @LastEditTime: 2023-10-08 15:15:26
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/libs/ui/src/lib/button/button.tsx
 */
/* eslint-disable-next-line */

import { Button as NextButton } from '@nextui-org/react';
import type { ButtonProps } from '@nextui-org/react';
import { forwardRef } from 'react';
import { cn } from '@oin/utils';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, color = 'primary', ...props }, ref) => {
    return (
      <NextButton
        color={color}
        className={cn('rounded-lg', className)}
        ref={ref}
        {...props}
      />
    );
  }
);

export { Button, ButtonProps };
