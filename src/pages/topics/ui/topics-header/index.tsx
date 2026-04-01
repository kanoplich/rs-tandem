import { TOPICS_HEADER_TEXT } from '../../locales';

export const TopicsHeader = () => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-normal leading-9">{TOPICS_HEADER_TEXT.TITLE}</h1>
      <p className="text-base text-foreground">{TOPICS_HEADER_TEXT.DESCRIPTION}</p>
    </div>
  );
};
