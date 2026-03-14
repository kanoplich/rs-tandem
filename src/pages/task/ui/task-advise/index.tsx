import { TASK_ADVISE } from '../../locales';

export const TaskAdvise = () => {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-5xl p-6 rounded-xl border border-secondary bg-secondary/45">
        <div className="flex gap-4">
          <img src="/images/bg-landing2.png" alt="RS School interview" className="w-24 h-24" />
          <div className="flex flex-col">
            <h3 className="text-base pb-2">{TASK_ADVISE.TITLE}</h3>
            <ul className="text-sm pl-4 list-disc space-y-1">
              <li>{TASK_ADVISE.ADVISE_1}</li>
              <li>{TASK_ADVISE.ADVISE_2}</li>
              <li>{TASK_ADVISE.ADVISE_3}</li>
              <li>{TASK_ADVISE.ADVISE_4}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
