import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { PasswordInput } from '@/shared/ui/password-input';

export const LoginForm = () => {
  return (
    <Card className="w-full max-w-[448px]">
      <CardHeader>
        <CardTitle>Вход в систему</CardTitle>
        <CardDescription>Введите свои данные для входа</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              className="focus-visible:ring-primary/50 focus-visible:border-primary"
              type="email"
              autoComplete="email"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <PasswordInput
              id="password"
              className="focus-visible:ring-primary/50 focus-visible:border-primary"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" className="w-full cursor-pointer">
            Войти
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Нет аккаунта?{' '}
          <Link to={ROUTES.REGISTER} className="text-primary underline underline-offset-4">
            Зарегистрироваться
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
