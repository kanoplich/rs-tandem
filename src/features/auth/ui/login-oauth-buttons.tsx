import { PROVIDERS } from '@/shared';
import { signInWithOAuth } from '@/shared/api/auth';
import { GoogleIcon, GithubIcon } from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';

export const LoginOAuthButtons = () => {
  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        onClick={() => signInWithOAuth(PROVIDERS.GOOGLE)}
        className="flex gap-2 cursor-pointer"
      >
        <GoogleIcon />
        Войти через Google
      </Button>

      <Button
        variant="outline"
        onClick={() => signInWithOAuth(PROVIDERS.GITHUB)}
        className="flex gap-2 cursor-pointer"
      >
        <GithubIcon />
        Войти через GitHub
      </Button>
    </div>
  );
};
