import Dexie, { type Table } from 'dexie';
import type { PromiseRecord } from '@/lib/promises/types';

export class AppDatabase extends Dexie {
  promises!: Table<PromiseRecord, number>;

  constructor() {
    super('addiction-rehab-dog');
    // &date：date 為 unique index，落實「每日一筆」
    this.version(1).stores({
      promises: '++id, &date, status',
    });
  }
}

export const db = new AppDatabase();
