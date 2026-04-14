import { TASK_ADVICE } from '../../locales';

export const TaskAdvice = () => {
  return (
    <section className="pb-6">
      <div className="p-6 rounded-xl border border-secondary bg-secondary/45">
        <div className="flex gap-4 flex-col-reverse items-center sm:items-start sm:flex-row">
          <img src="/images/bg-landing2.webp" alt="RS School interview" className="w-24 h-24" />
          <div className="flex flex-col">
            <h3 className="text-base pb-2">{TASK_ADVICE.TITLE}</h3>
            <ul className="text-sm pl-4 list-disc space-y-1">
              <li>{TASK_ADVICE.ADVICE_1}</li>
              <li>{TASK_ADVICE.ADVICE_2}</li>
              <li>{TASK_ADVICE.ADVICE_3}</li>
              <li>{TASK_ADVICE.ADVICE_4}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
