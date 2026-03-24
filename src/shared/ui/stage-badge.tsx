import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

const stageBadgeVariants = cva(
  'inline-flex items-center justify-center text-xs font-medium rounded-sm whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        default: 'px-2.5 py-1 bg-input text-light',
        completed: 'px-2.5 py-1 border border-color-input text-light',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type StageBadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof stageBadgeVariants> & {
    text: string;
  };

export const StageBadge = ({ text, variant, className, ...props }: StageBadgeProps) => {
  return (
    <span
      data-slot="stage-badge"
      data-variant={variant}
      className={cn(stageBadgeVariants({ variant }), className)}
      {...props}
    >
      {text}
    </span>
  );
};
