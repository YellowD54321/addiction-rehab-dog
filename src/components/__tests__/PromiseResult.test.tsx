import { render, screen } from '@testing-library/react';
import { PromiseResult } from '@/components/PromiseResult';

describe('PromiseResult', () => {
  describe('成功情境', () => {
    it('status 為 success 時應顯示開心的狗狗插畫', () => {
      render(<PromiseResult status="success" />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', expect.stringContaining('happy-dog'));
    });

    it('status 為 failed 時應顯示沮喪的狗狗插畫', () => {
      render(<PromiseResult status="failed" />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', expect.stringContaining('sad-dog'));
    });
  });
});
