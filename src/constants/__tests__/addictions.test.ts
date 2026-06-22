import { ADDICTIONS } from '@/constants/addictions';

describe('ADDICTIONS', () => {
  describe('Color data', () => {
    it('should give every addiction a non-empty primary and secondary color', () => {
      ADDICTIONS.forEach((item) => {
        expect(item.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(item.secondary).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });

    it('should give every addiction a distinct primary color', () => {
      const primaries = ADDICTIONS.map((item) => item.primary);

      expect(new Set(primaries).size).toBe(ADDICTIONS.length);
    });
  });
});
