import { cn } from '@utils';
import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const inputVariants = cva(
  'flex h-9 w-full rounded-md border  px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        clean:
          'flex h-9 w-full rounded-md border  px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        outline:
          'border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input type={type} className={cn('', className)} ref={ref} {...props} />
    );
  }
);
Input.displayName = 'Input';

export { Input };
