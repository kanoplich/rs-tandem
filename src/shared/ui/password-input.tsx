import { Eye, EyeOff } from 'lucide-react';
import { useState, useRef, forwardRef } from 'react';

import { cn } from '../lib/utils';

import { Input } from '@/shared/ui';

type PasswordInputProps = React.ComponentProps<'input'>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleToggle = () => {
      const input = inputRef.current;
      if (!input) return;

      const start = input.selectionStart;
      const end = input.selectionEnd;

      setShow((prev) => !prev);

      requestAnimationFrame(() => {
        input.setSelectionRange(start, end);
      });
    };

    return (
      <div className="relative">
        <Input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.RefObject<HTMLInputElement | null>).current = node;
          }}
          type={show ? 'text' : 'password'}
          className={cn('pr-10', className)}
          {...props}
        />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleToggle}
          className="absolute right-0 top-0 h-full px-3 flex items-center justify-center cursor-pointer text-muted-foreground"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';
