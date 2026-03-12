import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from './footer';

import { evaluateTheory, signUp, singIn } from '@/shared/api';
import { Button } from '@/shared/ui/button';

export const AppLayout = () => {
  const [llmResult, setLlmResult] = useState<string>('');

  const taskId = 'closures__lexical-environment-closures';
  const answer =
    'Замыкание — это когда функция "помнит" переменные из своего лексического окружения даже после того, как внешняя функция завершила работу.';

  const handleSignUp = async () => {
    const session = await signUp({ email: 'seva.kavalenka@gmail.com', password: 'Qwerty12345' });
    console.log('Signed up session:', session);
  };

  const handleSignIn = async () => {
    const session = await singIn({ email: 'seva.kavalenka@gmail.com', password: 'Qwerty12345' });
    console.log('Signed in session:', session);
  };

  const handleGroqApi = async () => {
    setLlmResult('');

    const reader = (await evaluateTheory(
      taskId,
      answer,
      'stream'
    )) as ReadableStreamDefaultReader<Uint8Array>;

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const token = decoder.decode(value);
      setLlmResult((prev) => prev + token);
    }

    const result = await evaluateTheory(taskId, answer, 'json');

    console.log(result);
  };

  return (
    <>
      <main>
        <Button onClick={() => handleSignUp()}>SignUp</Button>
        <Button onClick={() => handleSignIn()}>SignIn</Button>
        <Button onClick={() => handleGroqApi()}>Groq_API</Button>
        <div style={{ marginTop: 20 }}>
          <pre
            style={{
              background: '#f4f4f4',
              margin: 10,
              padding: 10,
              borderRadius: 6,
              maxHeight: 400,
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {llmResult}
          </pre>
        </div>

        <Outlet />
      </main>
      <Footer />
    </>
  );
};
