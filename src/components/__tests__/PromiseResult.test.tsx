import { render, screen } from '@testing-library/react';
import { PromiseResult } from '@/components/PromiseResult';

describe('PromiseResult', () => {
  describe('Success cases', () => {
    it('should show the happy dog illustration when status is success', () => {
      render(<PromiseResult status="success" />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', expect.stringContaining('happy-dog'));
    });

    it('should show the sad dog illustration when status is failed', () => {
      render(<PromiseResult status="failed" />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', expect.stringContaining('sad-dog'));
    });
  });
});
