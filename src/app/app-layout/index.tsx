import { Outlet } from 'react-router-dom';

import { Footer } from './footer';

import { evaluateTheory } from '@/shared/api';
import { Button } from '@/shared/ui/button';

export const AppLayout = () => {
  const handleGroqApi = async () => {
    const result = await evaluateTheory('123', 'Привет');
    console.log(result);
  };

  return (
    <>
      <main>
        <Button onClick={() => handleGroqApi()}>Groq_API</Button>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
