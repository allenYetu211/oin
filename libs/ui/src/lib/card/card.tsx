/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-10-08 16:18:57
 * @LastEditTime: 2023-10-08 16:29:38
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/libs/ui/src/lib/card/card.tsx
 */
import {
  Card as NextCard,
  CardHeader as NextCardHeader,
  CardBody as NextCardBody,
  CardProps,
} from '@nextui-org/react';
import { PropsWithChildren, FC, forwardRef } from 'react';
import { cn } from '@oin/utils';

type CardCustomProps = CardProps &
  FC<PropsWithChildren> & {
    bodyClassName?: string;
    header?: JSX.Element;
  };

export const Card = forwardRef<HTMLDivElement, CardCustomProps>(
  ({ className, children, header, bodyClassName, ...props }, ref) => {
    return (
      <NextCard className={cn(className)} ref={ref} {...props}>
        {header && <NextCardHeader>{header}</NextCardHeader>}
        <NextCardBody className={cn(bodyClassName)}>{children}</NextCardBody>
      </NextCard>
    );
  }
);
