import { ForgotForm, FORGOT_PASSWORD_PAGE_TEXT } from '@/features/auth';

export const Forgot = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full flex flex-col items-center">
        <div className="mb-10 text-center">
          <h1>{FORGOT_PASSWORD_PAGE_TEXT.TITLE}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{FORGOT_PASSWORD_PAGE_TEXT.SUBTITLE}</p>
        </div>

        <ForgotForm />
      </div>
    </div>
  );
};
