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

// 驅動畫面的「作用中約定」：最近一筆，但若已確認離開則視為無作用中約定。
export async function getActivePromise(): Promise<PromiseRecord | undefined> {
  const latest = await getLatestPromise();
  if (!latest) return undefined;
  return latest.acknowledgedAt ? undefined : latest;
}

// 將最近一筆標記為「已確認離開」（持久化 Back to home 意圖）。
export async function acknowledgeLatest(): Promise<void> {
  const latest = await getLatestPromise();
  if (!latest?.id) throw new Error('No promise exists; cannot acknowledge.');
  await db.promises.update(latest.id, { acknowledgedAt: Date.now() });
}

async function setStatus(status: 'success' | 'failed'): Promise<void> {
  const latest = await getLatestPromise();
  if (!latest?.id) throw new Error('No promise exists; cannot update status.');
  await db.promises.update(latest.id, { status, updatedAt: Date.now() });
}

export const markSuccess = () => setStatus('success');
export const markFailed = () => setStatus('failed');
