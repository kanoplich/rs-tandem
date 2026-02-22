import { signUp } from '@/shared/api';
import type { AuthCredentials } from '@/shared/api/auth/types';
import { Button } from '@/shared/ui/button';

export const Register = () => {
  const handleRegistration = async () => {
    const viewer: AuthCredentials = {
      email: 'andrei.kanoplich@gmail.com',
      password: 'QdfFDfdsfsdwerty',
    };

    await signUp({ ...viewer });
  };

  return (
    <>
      <Button onClick={handleRegistration}></Button>
      <div>register</div>
    </>
  );
};
