import { DASHBOARD_HEADER_TEXT } from '../../locales';

export const DashboardHeader = () => {
  return (
    <section className="mb-8 flex flex-col gap-2.5">
      <h1 className="text-2xl font-normal leading-9">{DASHBOARD_HEADER_TEXT.TITLE}</h1>
      <p>{DASHBOARD_HEADER_TEXT.DESCRIPTION}</p>
    </section>
  );
};
