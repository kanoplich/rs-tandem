import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { supabase } from '@/shared/api/supabase-client';
import { Button } from '@/shared/ui/button';

export const LoginOAuthButtons = () => {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" onClick={signInWithGoogle} className="flex gap-2 cursor-pointer">
        <FcGoogle size={18} />
        Войти через Google
      </Button>

      <Button variant="outline" onClick={signInWithGithub} className="flex gap-2 cursor-pointer">
        <FaGithub size={18} />
        Войти через GitHub
      </Button>
    </div>
  );
};
