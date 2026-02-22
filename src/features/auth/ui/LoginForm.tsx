import { useState } from 'react';
import { Link } from 'react-router-dom';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[448px] rounded-xl border border-border bg-card p-4">
      <div className="space-y-6">
        <div>
          <h3>Вход в систему</h3>
          <p className="mt-1 text-sm text-muted-foreground">Введите свои данные для входа</p>
        </div>

        <form className="space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-light">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-light focus:border-primary outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm text-light">
              Пароль
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full rounded-md border border-border bg-input px-3 py-2 pr-16 text-sm text-light focus:border-primary outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-primary cursor-pointer"
              >
                {showPassword ? 'Скрыть' : 'Показать'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors"
          >
            Войти
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Нет аккаунта?{' '}
          <Link to="/register" className="text-primary">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};
