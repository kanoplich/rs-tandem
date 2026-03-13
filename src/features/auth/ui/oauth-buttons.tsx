import { PROVIDERS } from '@/shared/';
import { signInWithOAuth } from '@/shared/api/auth';
import { GoogleIcon, GithubIcon } from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';

export const OAuthButtons = () => {
  const manageSignIn = async (provider: 'google' | 'github') => {
    try {
      await signInWithOAuth(provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center gap-3 mt-2">
      <Button
        variant="outline"
        onClick={() => manageSignIn(PROVIDERS.GOOGLE)}
        className="w-48 h-10 flex items-center justify-center cursor-pointer bg-card hover:border-primary"
      >
        <GoogleIcon />
      </Button>

      <Button
        variant="outline"
        onClick={() => manageSignIn(PROVIDERS.GITHUB)}
        className="w-48 h-10 flex items-center justify-center cursor-pointer bg-card hover:border-primary"
      >
        <GithubIcon className="fill-light" />
      </Button>
    </div>
  );
};
