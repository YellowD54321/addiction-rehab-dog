import { ADDICTIONS, CUSTOM_KEY } from '@/constants/addictions';

describe('ADDICTIONS', () => {
  describe('Color data', () => {
    it('should give every addiction a non-empty primary and secondary color', () => {
      ADDICTIONS.forEach((item) => {
        expect(item.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(item.secondary).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });

    it('should give every addiction a distinct key', () => {
      const keys = ADDICTIONS.map((item) => item.key);

      expect(new Set(keys).size).toBe(ADDICTIONS.length);
    });

    it('should use a black/white palette for PTT', () => {
      const ptt = ADDICTIONS.find((item) => item.key === 'ptt');

      expect(ptt?.primary).toBe('#000000');
      expect(ptt?.secondary).toBe('#FFFFFF');
    });

    it('should use a black/white palette for X', () => {
      const x = ADDICTIONS.find((item) => item.key === 'x');

      expect(x?.primary).toBe('#000000');
      expect(x?.secondary).toBe('#FFFFFF');
    });
  });

  describe('Custom option', () => {
    it('should expose a custom addiction with a black/white palette', () => {
      const custom = ADDICTIONS.find((item) => item.key === 'custom');

      expect(custom?.label).toBe('Custom');
      expect(custom?.primary).toBe('#000000');
      expect(custom?.secondary).toBe('#FFFFFF');
    });

    it('should expose CUSTOM_KEY matching the custom option key', () => {
      expect(CUSTOM_KEY).toBe('custom');
    });
  });
});
