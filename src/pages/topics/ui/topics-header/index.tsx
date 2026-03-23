import { TOPICS_HEADER_TEXT } from '@/pages/topics/locales';

export const TopicsHeader = () => {
  return (
    <section className="container mx-auto max-w-7xl px-4 pt-6">
      <div className="max-w-87.5 h-17 flex flex-col gap-2">
        <h1>{TOPICS_HEADER_TEXT.TITLE}</h1>
        <p className="text-base text-foreground">{TOPICS_HEADER_TEXT.DESCRIPTION}</p>
      </div>
    </section>
  );
};
