import { renderHook, waitFor, act } from '@testing-library/react';
import { db } from '@/lib/db';
import { useTodayPromise } from '@/hooks/useTodayPromise';

const TEST_CONSTANTS = {
  ADDICTION: 'instagram-reels' as const,
  CONTENT: '我今天完全不開啟 IG 滑短影音',
};

describe('useTodayPromise', () => {
  beforeEach(async () => {
    await db.promises.clear();
  });

  describe('成功情境', () => {
    it('今日無約定時，載入完成後 promise 為 undefined', async () => {
      const { result } = renderHook(() => useTodayPromise());

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.promise).toBeUndefined();
    });

    it('submit 後 promise 狀態應為 pending', async () => {
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

    it('markSuccess 後 promise 狀態應為 success', async () => {
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

    it('markFailed 後 promise 狀態應為 failed', async () => {
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
