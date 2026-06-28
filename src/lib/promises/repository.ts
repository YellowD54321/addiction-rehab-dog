import { db } from '@/lib/db';
import { getToday } from '@/lib/date';
import type { AddictionKey } from '@/constants/addictions';
import type { PromiseRecord } from './types';

export async function getLatestPromise(): Promise<PromiseRecord | undefined> {
  // The most recent record regardless of date. ++id is monotonic, so the
  // highest id is the latest created promise.
  return db.promises.orderBy('id').last();
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
  const id = await db.promises.add(record); // date is no longer unique → multiple per day allowed
  return { ...record, id };
}

async function setStatus(status: 'success' | 'failed'): Promise<void> {
  const latest = await getLatestPromise();
  if (!latest?.id) throw new Error('No promise exists; cannot update status.');
  await db.promises.update(latest.id, { status, updatedAt: Date.now() });
}

export const markSuccess = () => setStatus('success');
export const markFailed = () => setStatus('failed');
