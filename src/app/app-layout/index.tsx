import { Outlet } from 'react-router-dom';

import { Footer } from './footer';

import { signUp, singIn, singOut } from '@/shared/api';
import { Button } from '@/shared/ui/button';

export const AppLayout = () => {
  const handleSingUp = async () => {
    const viewer = {
      email: 'andrei.kanoplich@gmail.com',
      password: 'QdfFDfdsfsdwerty',
    };

    await signUp({ ...viewer });
  };

  const handleSingIn = async () => {
    const viewer = {
      email: 'andrei.kanoplich@gmail.com',
      password: 'QdfFDfdsfsdwerty',
    };

    await singIn({ ...viewer });
  };

  const handleSingOut = async () => {
    await singOut();
  };

  return (
    <>
      <main>
        <Button onClick={handleSingUp}>SingUp</Button>
        <Button onClick={handleSingIn}>SingIn</Button>
        <Button onClick={handleSingOut}>SingOut</Button>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
