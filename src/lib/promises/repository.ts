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
  customLabel?: string;
}): Promise<PromiseRecord> {
  const now = Date.now();
  const customLabel =
    input.addiction === 'custom' ? input.customLabel?.trim() || undefined : undefined;
  const record: PromiseRecord = {
    date: getToday(),
    addiction: input.addiction,
    ...(customLabel ? { customLabel } : {}),
    content: input.content,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };
  const id = await db.promises.add(record); // date is no longer unique → multiple per day allowed
  return { ...record, id };
}

// 圖表分組鍵：固定項目用 addiction；自定義用 trim 後的 customLabel（保留大小寫，「完全一樣」語意）。
export function getAddictionGroupKey(
  record: Pick<PromiseRecord, 'addiction' | 'customLabel'>,
): string {
  if (record.addiction === 'custom') return (record.customLabel ?? '').trim();
  return record.addiction;
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
