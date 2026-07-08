import { db } from '@/lib/db';
import {
  createPromise,
  getLatestPromise,
  getActivePromise,
  acknowledgeLatest,
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
    it("should create a promise with status pending", async () => {
      const result = await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: TEST_CONSTANTS.CONTENT,
      });

      expect(result.status).toBe('pending');
    });

    it('getLatestPromise should return the existing promise', async () => {
      await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: TEST_CONSTANTS.CONTENT,
      });

      const latest = await getLatestPromise();

      expect(latest?.content).toBe(TEST_CONSTANTS.CONTENT);
    });

    it('should allow creating multiple promises on the same day', async () => {
      await createPromise({ addiction: TEST_CONSTANTS.ADDICTION, content: 'first' });
      await createPromise({ addiction: TEST_CONSTANTS.ADDICTION, content: 'second' });

      const count = await db.promises.count();

      expect(count).toBe(2);
    });

    it('getLatestPromise should return the most recently created promise', async () => {
      await createPromise({ addiction: TEST_CONSTANTS.ADDICTION, content: 'first' });
      await createPromise({ addiction: TEST_CONSTANTS.ADDICTION, content: 'second' });

      const latest = await getLatestPromise();

      expect(latest?.content).toBe('second');
    });

    it('markSuccess should update the latest promise status to success and bump updatedAt', async () => {
      const created = await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: TEST_CONSTANTS.CONTENT,
      });

      await markSuccess();
      const latest = await getLatestPromise();

      expect(latest?.status).toBe('success');
      expect(latest?.updatedAt).toBeGreaterThanOrEqual(created.updatedAt);
    });

    it('markFailed should update the latest promise status to failed', async () => {
      await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: TEST_CONSTANTS.CONTENT,
      });

      await markFailed();
      const latest = await getLatestPromise();

      expect(latest?.status).toBe('failed');
    });

    it('markSuccess should update only the most recent promise', async () => {
      await createPromise({ addiction: TEST_CONSTANTS.ADDICTION, content: 'first' });
      const second = await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: 'second',
      });

      await markSuccess();

      const all = await db.promises.toArray();
      const first = all.find((p) => p.content === 'first');
      const latest = all.find((p) => p.id === second.id);
      expect(first?.status).toBe('pending');
      expect(latest?.status).toBe('success');
    });

    it('acknowledgeLatest should set acknowledgedAt on the latest promise', async () => {
      await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: TEST_CONSTANTS.CONTENT,
      });

      await acknowledgeLatest();
      const latest = await getLatestPromise();

      expect(latest?.acknowledgedAt).toEqual(expect.any(Number));
    });

    it('getActivePromise should return the latest promise when it is not acknowledged', async () => {
      await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: TEST_CONSTANTS.CONTENT,
      });
      await markSuccess();

      const active = await getActivePromise();

      expect(active?.status).toBe('success');
    });

    it('getActivePromise should return undefined when the latest promise is acknowledged', async () => {
      await createPromise({
        addiction: TEST_CONSTANTS.ADDICTION,
        content: TEST_CONSTANTS.CONTENT,
      });
      await markSuccess();
      await acknowledgeLatest();

      const active = await getActivePromise();

      expect(active).toBeUndefined();
    });
  });

  describe('Error cases', () => {
    it('markSuccess should throw when there is no promise', async () => {
      await expect(markSuccess()).rejects.toThrow();
    });

    it('markFailed should throw when there is no promise', async () => {
      await expect(markFailed()).rejects.toThrow();
    });

    it('acknowledgeLatest should throw when there is no promise', async () => {
      await expect(acknowledgeLatest()).rejects.toThrow();
    });
  });

  describe('Edge cases', () => {
    it('getLatestPromise should return undefined when no promise exists', async () => {
      const latest = await getLatestPromise();

      expect(latest).toBeUndefined();
    });

    it('getActivePromise should return undefined when no promise exists', async () => {
      const active = await getActivePromise();

      expect(active).toBeUndefined();
    });
  });
});
