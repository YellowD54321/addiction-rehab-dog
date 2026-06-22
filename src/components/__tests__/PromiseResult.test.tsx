import { render, screen } from '@testing-library/react';
import { PromiseResult } from '@/components/PromiseResult';

describe('PromiseResult', () => {
  describe('Success cases', () => {
    it('should show the happy dog illustration when status is success', () => {
      render(<PromiseResult status="success" />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', expect.stringContaining('happy-dog'));
    });

    it('should show the companion success message when status is success', () => {
      render(<PromiseResult status="success" />);

      expect(
        screen.getByText("Awesome, you made it today! 🎉 AR Dog Can't wait to see you tomorrow! 🎉"),
      ).toBeInTheDocument();
    });

    it('should show the sad dog illustration when status is failed', () => {
      render(<PromiseResult status="failed" />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', expect.stringContaining('sad-dog'));
    });

    it('should show the companion failed message when status is failed', () => {
      render(<PromiseResult status="failed" />);

      expect(
        screen.getByText('AR Dog gives you a hug. AR Dog expects to see you tomorrow.'),
      ).toBeInTheDocument();
    });
  });
});
