import { getToday } from '@/lib/date';

describe('getToday', () => {
  describe('成功情境', () => {
    it('應該以本機時區回傳 YYYY-MM-DD 格式', () => {
      const result = getToday(new Date(2026, 5, 21));

      expect(result).toBe('2026-06-21');
    });
  });

  describe('邊界情境', () => {
    it('應該將個位數的月與日補零', () => {
      const result = getToday(new Date(2026, 0, 5));

      expect(result).toBe('2026-01-05');
    });
  });
});
