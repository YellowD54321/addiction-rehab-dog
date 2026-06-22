import type { AddictionKey } from '@/constants/addictions';

export type PromiseStatus = 'pending' | 'success' | 'failed';

export interface PromiseRecord {
  id?: number;
  date: string; // YYYY-MM-DD
  addiction: AddictionKey;
  content: string;
  status: PromiseStatus;
  createdAt: number;
  updatedAt: number;
}
