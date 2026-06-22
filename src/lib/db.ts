import Dexie, { type Table } from 'dexie';
import type { PromiseRecord } from '@/lib/promises/types';

export class AppDatabase extends Dexie {
  promises!: Table<PromiseRecord, number>;

  constructor() {
    super('addiction-rehab-dog');
    // &date: date is a unique index, enforcing one record per day
    this.version(1).stores({
      promises: '++id, &date, status',
    });
  }
}

export const db = new AppDatabase();
