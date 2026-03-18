import { TopicsHeader, StageTabs } from './ui';

export const Topics = () => {
  // const navigate = useNavigate();
  // const topics = 'closures,functions,this-keyword';

  // const handleClick = () => {
  //   navigate({
  //     pathname: '/task/id:1',
  //     search: `?topics=${topics}`,
  //   });
  // };

  return (
    <div className="flex flex-col">
      <TopicsHeader />
      <StageTabs />
    </div>
  );
};
