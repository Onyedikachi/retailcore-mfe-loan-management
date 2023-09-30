import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

export const useId = () => {
   return useMemo(() => uuid(), []);
};
