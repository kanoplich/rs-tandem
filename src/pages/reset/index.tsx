import { ResetForm } from '@/features/auth';
import { RESET_PASSWORD_PAGE_TEXT } from '@/features/auth';

export const Reset = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full flex flex-col items-center">
        <div className="mb-10 text-center">
          <h1 className="text-[30px] leading-[36px] font-bold text-white">
            {RESET_PASSWORD_PAGE_TEXT.TITLE}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{RESET_PASSWORD_PAGE_TEXT.SUBTITLE}</p>
        </div>

        <ResetForm />
      </div>
    </div>
  );
};
