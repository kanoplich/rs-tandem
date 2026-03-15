import { AUTH_LOGIN_ERRORS } from '../locales';

import { PROVIDERS, Button } from '@/shared';
import { signInWithOAuth } from '@/shared/api';
import { GoogleIcon, GithubIcon } from '@/shared/assets/icons';

type Props = {
  onError: (error: string) => void;
};

export const OAuthButtons = ({ onError }: Props) => {
  const manageSignIn = (provider: 'google' | 'github') => {
    onError('');
    signInWithOAuth(provider).catch((error) => {
      console.error(AUTH_LOGIN_ERRORS.OAUTH_ERROR, error);
      onError(AUTH_LOGIN_ERRORS.OAUTH_ERROR);
    });
  };

  return (
    <div className="flex justify-center gap-3 mt-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => manageSignIn(PROVIDERS.GOOGLE)}
        className="flex-1 h-10 flex items-center justify-center cursor-pointer bg-card border-2 hover:border-primary"
      >
        <GoogleIcon />
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={() => manageSignIn(PROVIDERS.GITHUB)}
        className="flex-1 h-10 flex items-center justify-center cursor-pointer bg-card border-2 hover:border-primary"
      >
        <GithubIcon className="fill-white" />
      </Button>
    </div>
  );
};
