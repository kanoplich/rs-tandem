import { AUTH_LOGIN_ERRORS } from '../locales';

import { PROVIDERS } from '@/shared/';
import { signInWithOAuth } from '@/shared/api/auth';
import { GoogleIcon, GithubIcon } from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';

type Props = {
  onError: (error: string) => void;
};
export const OAuthButtons = ({ onError }: Props) => {
  const manageSignIn = (provider: 'google' | 'github') => {
    signInWithOAuth(provider).catch((error) => {
      console.error(AUTH_LOGIN_ERRORS.OAUTH_ERROR, error);
      onError(AUTH_LOGIN_ERRORS.OAUTH_ERROR);
    });
  };

  return (
    <div className="flex justify-center gap-3 mt-2">
      <Button
        variant="outline"
        onClick={() => manageSignIn(PROVIDERS.GOOGLE)}
        className="flex-1 h-10 flex items-center justify-center cursor-pointer bg-card border-2 hover:border-primary"
      >
        <GoogleIcon />
      </Button>

      <Button
        variant="outline"
        onClick={() => manageSignIn(PROVIDERS.GITHUB)}
        className="flex-1 h-10 flex items-center justify-center cursor-pointer bg-card border-2 hover:border-primary"
      >
        <GithubIcon className="fill-light" />
      </Button>
    </div>
  );
};
