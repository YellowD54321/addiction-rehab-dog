import { getToday } from '@/lib/date';

describe('getToday', () => {
  describe('Success cases', () => {
    it('should return YYYY-MM-DD in the local timezone', () => {
      const result = getToday(new Date(2026, 5, 21));

      expect(result).toBe('2026-06-21');
    });
  });

  describe('Edge cases', () => {
    it('should zero-pad single-digit months and days', () => {
      const result = getToday(new Date(2026, 0, 5));

      expect(result).toBe('2026-01-05');
    });
  });
});
