import { renderHook, waitFor, act } from '@testing-library/react';
import { db } from '@/lib/db';
import { useTodayPromise } from '@/hooks/useTodayPromise';

const TEST_CONSTANTS = {
  ADDICTION: 'instagram-reels' as const,
  CONTENT: "I won't open Instagram Reels at all today",
};

describe('useTodayPromise', () => {
  beforeEach(async () => {
    await db.promises.clear();
  });

  describe('Success cases', () => {
    it('promise should be undefined after loading when there is no promise today', async () => {
      const { result } = renderHook(() => useTodayPromise());

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.promise).toBeUndefined();
    });

    it('promise status should be pending after submit', async () => {
      const { result } = renderHook(() => useTodayPromise());
      await waitFor(() => expect(result.current.loading).toBe(false));

      await act(async () => {
        await result.current.submit({
          addiction: TEST_CONSTANTS.ADDICTION,
          content: TEST_CONSTANTS.CONTENT,
        });
      });

      expect(result.current.promise?.status).toBe('pending');
    });

    it('promise status should be success after markSuccess', async () => {
      const { result } = renderHook(() => useTodayPromise());
      await waitFor(() => expect(result.current.loading).toBe(false));
      await act(async () => {
        await result.current.submit({
          addiction: TEST_CONSTANTS.ADDICTION,
          content: TEST_CONSTANTS.CONTENT,
        });
      });

      await act(async () => {
        await result.current.markSuccess();
      });

      expect(result.current.promise?.status).toBe('success');
    });

    it('promise status should be failed after markFailed', async () => {
      const { result } = renderHook(() => useTodayPromise());
      await waitFor(() => expect(result.current.loading).toBe(false));
      await act(async () => {
        await result.current.submit({
          addiction: TEST_CONSTANTS.ADDICTION,
          content: TEST_CONSTANTS.CONTENT,
        });
      });

      await act(async () => {
        await result.current.markFailed();
      });

      expect(result.current.promise?.status).toBe('failed');
    });
  });
});
