type Stage = 1 | 2 | 3;

let activeStage: Stage = 1;
const listeners: Array<(stage: Stage) => void> = [];

export const setActiveStage = (stage: Stage) => {
  activeStage = stage;
  listeners.forEach((listener) => listener(stage));
};

export const getActiveStage = (): Stage => activeStage;

export const subscribeToStage = (listener: (stage: Stage) => void) => {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) listeners.splice(index, 1);
  };
};
