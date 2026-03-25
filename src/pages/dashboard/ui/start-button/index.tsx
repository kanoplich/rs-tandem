import { Link } from 'react-router-dom';

import { START_BUTTON_TEXT } from '../../locales';

import { Button, ROUTES } from '@/shared';

export const StartButton = () => {
  return (
    <section className="py-4 flex justify-center">
      <Button asChild className="w-full sm:w-auto px-9 py-7 text-lg">
        <Link to={ROUTES.TOPICS}>{START_BUTTON_TEXT}</Link>
      </Button>
    </section>
  );
};
