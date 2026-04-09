import { toast } from 'sonner';

import { AUTH_LOGIN_ERRORS } from '../locales';

import { PROVIDERS, Button } from '@/shared';
import { signInWithOAuth } from '@/shared/api';
import { GoogleIcon, GithubIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/lib/utils';

type Props = {
  onError: (error: string) => void;
  className?: string;
};

export const OAuthButtons = ({ onError, className }: Props) => {
  const manageSignIn = (provider: 'google' | 'github') => {
    onError('');
    signInWithOAuth(provider).catch((error: unknown) => {
      if (error instanceof Error) {
        console.error(AUTH_LOGIN_ERRORS.OAUTH_ERROR, error.message);
        toast.error(error.message);
      } else {
        console.error(AUTH_LOGIN_ERRORS.OAUTH_ERROR);
        toast.error(AUTH_LOGIN_ERRORS.OAUTH_ERROR);
      }

      onError(AUTH_LOGIN_ERRORS.OAUTH_ERROR);
    });
  };

  return (
    <div className="flex gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={() => manageSignIn(PROVIDERS.GOOGLE)}
        className={cn(
          'flex-1 h-10 items-center justify-center cursor-pointer hover:ring-3 hover:ring-primary',
          className
        )}
      >
        <GoogleIcon />
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={() => manageSignIn(PROVIDERS.GITHUB)}
        className={cn(
          'flex-1 h-10 items-center justify-center cursor-pointer hover:ring-3 hover:ring-primary',
          className
        )}
      >
        <GithubIcon className="w-5 h-5 text-light fill-current" />
      </Button>
    </div>
  );
};
