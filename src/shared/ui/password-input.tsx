import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/input';

type PasswordInputProps = React.ComponentProps<'input'>;

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = React.useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={show ? 'text' : 'password'}
          className={cn('pr-10', className)}
          {...props}
        />
        <button
          type="button"
          className="absolute right-0 top-0 h-full px-3 flex items-center justify-center cursor-pointer text-muted-foreground"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
