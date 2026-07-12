import type { AddictionKey } from '@/constants/addictions';

export type PromiseStatus = 'pending' | 'success' | 'failed';

export interface PromiseRecord {
  id?: number;
  date: string; // YYYY-MM-DD
  addiction: AddictionKey;
  customLabel?: string; // 使用者自定義成癮文字（已 trim）；僅 addiction === 'custom' 時有值
  content: string;
  status: PromiseStatus;
  createdAt: number;
  updatedAt: number;
  acknowledgedAt?: number; // 使用者按下 Back to home 的時間；未設定＝尚未確認離開
}
