import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared';

export const Topics = () => {
  const navigate = useNavigate();
  const topics = 'closures,functions,this-keyword';

  const handleClick = () => {
    navigate({
      pathname: '/task/id:1',
      search: `?topics=${topics}`,
    });
  };

  return (
    <>
      <div>Topic</div>
      <Button onClick={handleClick}>Go to task</Button>
    </>
  );
};
