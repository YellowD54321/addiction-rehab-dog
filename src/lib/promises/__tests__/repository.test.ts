import { db } from '@/lib/db';
import {
  createPromise,
  getTodayPromise,
  markSuccess,
  markFailed,
} from '@/lib/promises/repository';

const TEST_CONSTANTS = {
  ADDICTION: 'instagram-reels' as const,
  CONTENT: "I won't open Instagram Reels at all today",
};

describe('Promise Repository', () => {
  beforeEach(async () => {
    await db.promises.clear();
  });

  describe('Success cases', () => {
    it("should create today's promise with status pending", async () => {
      const result = await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: TEST_CONSTANTS.CONTENT,
      });

      expect(result.status).toBe('pending');
    });

    it("getTodayPromise should return today's existing promise", async () => {
      await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: TEST_CONSTANTS.CONTENT,
      });

      const today = await getTodayPromise();

      expect(today?.content).toBe(TEST_CONSTANTS.CONTENT);
    });

    it('markSuccess should update status to success and update updatedAt', async () => {
      const created = await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: TEST_CONSTANTS.CONTENT,
      });

      await markSuccess();
      const today = await getTodayPromise();

      expect(today?.status).toBe('success');
      expect(today?.updatedAt).toBeGreaterThanOrEqual(created.updatedAt);
    });

    it('markFailed should update status to failed', async () => {
      await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: TEST_CONSTANTS.CONTENT,
      });

      await markFailed();
      const today = await getTodayPromise();

      expect(today?.status).toBe('failed');
    });
  });

  describe('Error cases', () => {
    it('should throw when creating a second promise on the same day (one per day)', async () => {
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

    it('markSuccess should throw when there is no promise today', async () => {
      await expect(markSuccess()).rejects.toThrow();
    });

    it('markFailed should throw when there is no promise today', async () => {
      await expect(markFailed()).rejects.toThrow();
    });
  });

  describe('Edge cases', () => {
    it('getTodayPromise should return undefined when no promise exists today', async () => {
      const today = await getTodayPromise();

      expect(today).toBeUndefined();
    });
  });
});
