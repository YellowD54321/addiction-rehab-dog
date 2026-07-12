import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PromiseResult } from '@/components/PromiseResult';

const noop = jest.fn();

describe('PromiseResult', () => {
  describe('Success cases', () => {
    it('should show the happy dog illustration when status is success', () => {
      render(<PromiseResult status="success" addiction="instagram-reels" onBackHome={noop} />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', expect.stringContaining('happy-dog'));
    });

    it('should show the companion success message when status is success', () => {
      render(<PromiseResult status="success" addiction="instagram-reels" onBackHome={noop} />);

      expect(
        screen.getByText("Awesome, you made it today! 🎉 AR Dog can't wait to see you tomorrow!"),
      ).toBeInTheDocument();
    });

    it('should show the sad dog illustration when status is failed', () => {
      render(<PromiseResult status="failed" addiction="instagram-reels" onBackHome={noop} />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', expect.stringContaining('sad-dog'));
    });

    it('should show the companion failed message when status is failed', () => {
      render(<PromiseResult status="failed" addiction="instagram-reels" onBackHome={noop} />);

      expect(
        screen.getByText('AR Dog gives you a hug. AR Dog expects to see you tomorrow.'),
      ).toBeInTheDocument();
    });
  });

  describe('Selected addiction', () => {
    it('should show only the selected addiction button', () => {
      render(<PromiseResult status="success" addiction="youtube-shorts" onBackHome={noop} />);

      expect(screen.getByText('YouTube Shorts')).toBeInTheDocument();
      expect(screen.queryByText('Instagram Reels')).not.toBeInTheDocument();
    });

    it('should render the selected addiction as a non-interactive element (no button role)', () => {
      render(<PromiseResult status="success" addiction="youtube-shorts" onBackHome={noop} />);

      expect(screen.queryByRole('button', { name: 'YouTube Shorts' })).not.toBeInTheDocument();
    });

    it('should show the custom label instead of "Custom" for a custom addiction', () => {
      render(
        <PromiseResult
          status="success"
          addiction="custom"
          customLabel="smoking"
          onBackHome={noop}
        />,
      );

      expect(screen.getByText('smoking')).toBeInTheDocument();
      expect(screen.queryByText('Custom')).not.toBeInTheDocument();
    });
  });

  describe('Back to home', () => {
    it('should call onBackHome when the back button is clicked', async () => {
      const onBackHome = jest.fn();
      const user = userEvent.setup();
      render(<PromiseResult status="failed" addiction="x" onBackHome={onBackHome} />);

      await user.click(screen.getByRole('button', { name: 'Back to home' }));

      expect(onBackHome).toHaveBeenCalledTimes(1);
    });
  });
});
