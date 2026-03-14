import { TopicsHeader, StageTabs } from './ui';

export const Topics = () => {
  return (
    <>
      <div className="flex flex-col">
        <TopicsHeader />
        <StageTabs />
        {/*  <StageOverview />
        <ActionBar />
        <TopicGrid /> */}
      </div>
    </>
  );
};
