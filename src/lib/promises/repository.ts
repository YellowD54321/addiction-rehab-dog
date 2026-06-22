import { db } from '@/lib/db';
import { getToday } from '@/lib/date';
import type { AddictionKey } from '@/constants/addictions';
import type { PromiseRecord } from './types';

export async function getTodayPromise(): Promise<PromiseRecord | undefined> {
  return db.promises.where('date').equals(getToday()).first();
}

export async function createPromise(input: {
  addiction: AddictionKey;
  content: string;
}): Promise<PromiseRecord> {
  const now = Date.now();
  const record: PromiseRecord = {
    date: getToday(),
    addiction: input.addiction,
    content: input.content,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };
  const id = await db.promises.add(record); // date unique → 同日重複會 throw
  return { ...record, id };
}

async function setStatus(status: 'success' | 'failed'): Promise<void> {
  const today = await getTodayPromise();
  if (!today?.id) throw new Error('今日尚無約定，無法更新狀態');
  await db.promises.update(today.id, { status, updatedAt: Date.now() });
}

export const markSuccess = () => setStatus('success');
export const markFailed = () => setStatus('failed');
