import { useState } from 'react';

import { PROVIDERS } from '@/shared/';
import { signInWithOAuth } from '@/shared/api/auth';
import { GoogleIcon, GithubIcon } from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';

export const OAuthButtons = () => {
  const [loading, setLoading] = useState(false);

  const manageSignIn = async (provider: 'google' | 'github') => {
    if (loading) return;
    setLoading(true);
    try {
      await signInWithOAuth(provider);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
