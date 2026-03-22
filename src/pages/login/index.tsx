import { AUTH_LOGIN_PAGE_TEXT, LoginForm } from '@/features/auth';

export const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full flex flex-col items-center">
        <div className="mb-10 text-center">
          <h1>{AUTH_LOGIN_PAGE_TEXT.TITLE}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{AUTH_LOGIN_PAGE_TEXT.SUBTITLE}</p>
        </div>

        <LoginForm />

        <div className="mt-6 max-w-[308px] text-center text-sm text-muted-foreground">
          {AUTH_LOGIN_PAGE_TEXT.FOOTER}
        </div>
      </div>
    </div>
  );
};
