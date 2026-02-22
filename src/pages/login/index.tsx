import { LoginForm } from '@/features/auth/ui/LoginForm';

export const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[448px] flex flex-col items-center">
        <div className="mb-12 text-center">
          <h1>Interview Training Platform</h1>
          <p className="mt-2 text-muted-foreground">Подготовка к техническим интервью RS School</p>
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
