import { db } from '@/lib/db';
import {
  createPromise,
  getTodayPromise,
  markSuccess,
  markFailed,
} from '@/lib/promises/repository';

const TEST_CONSTANTS = {
  ADDICTION: 'instagram-reels' as const,
  CONTENT: '我今天完全不開啟 IG 滑短影音',
};

describe('Promise Repository', () => {
  beforeEach(async () => {
    await db.promises.clear();
  });

  describe('成功情境', () => {
    it('應該建立今日約定且狀態為 pending', async () => {
      const result = await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: TEST_CONSTANTS.CONTENT,
      });

      expect(result.status).toBe('pending');
    });

    it('getTodayPromise 應該回傳今日已建立的約定', async () => {
      await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: TEST_CONSTANTS.CONTENT,
      });

      const today = await getTodayPromise();

      expect(today?.content).toBe(TEST_CONSTANTS.CONTENT);
    });

    it('markSuccess 應該將狀態更新為 success 並更新 updatedAt', async () => {
      const created = await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: TEST_CONSTANTS.CONTENT,
      });

      await markSuccess();
      const today = await getTodayPromise();

      expect(today?.status).toBe('success');
      expect(today?.updatedAt).toBeGreaterThanOrEqual(created.updatedAt);
    });

    it('markFailed 應該將狀態更新為 failed', async () => {
      await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: TEST_CONSTANTS.CONTENT,
      });

      await markFailed();
      const today = await getTodayPromise();

      expect(today?.status).toBe('failed');
    });
  });

  describe('錯誤情境', () => {
    it('同一天重複建立約定應該拋錯（每日一筆）', async () => {
      await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: TEST_CONSTANTS.CONTENT,
      });

      await expect(
        createPromise({
          addiction: TEST_CONSTANTS.ADDICTION,
          content: TEST_CONSTANTS.CONTENT,
        }),
      ).rejects.toThrow();
    });

    it('今日無約定時呼叫 markSuccess 應該拋錯', async () => {
      await expect(markSuccess()).rejects.toThrow();
    });

    it('今日無約定時呼叫 markFailed 應該拋錯', async () => {
      await expect(markFailed()).rejects.toThrow();
    });
  });

  describe('邊界情境', () => {
    it('今日尚未建立約定時 getTodayPromise 應該回傳 undefined', async () => {
      const today = await getTodayPromise();

      expect(today).toBeUndefined();
    });
  });
});
