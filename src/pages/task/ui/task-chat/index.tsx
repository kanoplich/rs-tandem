import { TASK_CHAT } from '../../locales';

import { SendButton } from '@/shared/assets/icons';

export const TaskChat = () => {
  return (
    <section className="pb-6">
      <div className="mx-auto max-w-5xl min-h-[360px] p-6 rounded-t-xl bg-card border border-border"></div>
      <div className="mx-auto max-w-5xl p-6 rounded-b-xl bg-card border-x border-b border-border">
        <div className="flex items-end gap-2">
          <textarea
            className="w-full min-h-[80px] px-3 py-2 rounded-md bg-input focus:outline-none resize-none"
            name="task-message"
            id="task-chat"
            placeholder={TASK_CHAT.PLACEHOLDER}
          ></textarea>
          <SendButton />
        </div>
      </div>
    </section>
  );
};
