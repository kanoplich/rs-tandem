import { LoginForm } from '@/features/auth/ui/LoginForm';

export const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full flex flex-col items-center">
        <div className="mb-10 text-center">
          <h1 className="text-[30px] leading-[36px] font-bold text-white">
            Interview Training Platform
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Подготовка к техническим интервью RS School
          </p>
        </div>

        <LoginForm />

        <div className="mt-16 text-center text-sm text-muted-foreground">
          Тренируйте навыки технического интервью
          <br />
          для этапов отбора в RS School
        </div>
      </div>
    </div>
  );
};
