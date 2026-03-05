import { Outlet } from 'react-router-dom';

import { Footer } from './footer';

import { evaluateTheory, signUp, singIn } from '@/shared/api';
import { Button } from '@/shared/ui/button';

export const AppLayout = () => {
  const handleSignUp = async () => {
    const session = await signUp({ email: 'seva.kavalenka@gmail.com', password: 'Qwerty12345' });
    console.log('Signed up session:', session);
  };

  const handleSignIn = async () => {
    const session = await singIn({ email: 'seva.kavalenka@gmail.com', password: 'Qwerty12345' });
    console.log('Signed in session:', session);
  };

  const handleGroqApi = async () => {
    const result = await evaluateTheory(
      'closures_basics_1',
      'Замыкание — это функция, которая запоминает свое лексическое окружение даже после того, как внешняя функция завершила выполнение.'
    );
    console.log(result);
  };

  return (
    <>
      <main>
        <Button onClick={() => handleSignUp()}>SignUp</Button>
        <Button onClick={() => handleSignIn()}>SignIn</Button>
        <Button onClick={() => handleGroqApi()}>Groq_API</Button>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
