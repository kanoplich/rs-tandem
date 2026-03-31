import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { HISTORY_PAGE_TEXT } from '../locales';

import { getPassedSubmissionHistory, type Submission } from '@/shared/api';

export const useHistory = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getPassedSubmissionHistory();

        setSubmissions(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : HISTORY_PAGE_TEXT.ERROR.LOAD;

        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return { submissions, isLoading };
};
