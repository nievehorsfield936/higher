import { useMemo } from 'react';

import { buildFocusSession } from './buildFocusSession';
import { useStudyBrain } from '@/src/hooks/useStudyBrain';

export function useFocusSession() {
  const brain = useStudyBrain();

  return useMemo(() => {
    return buildFocusSession(brain.preparation);
  }, [brain.preparation]);
}