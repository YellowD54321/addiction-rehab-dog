import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PromisePending } from '@/components/PromisePending';

const noop = jest.fn();
const CONTENT = "I won't open Instagram Reels at all today";

describe('PromisePending', () => {
  describe('Success cases', () => {
    it('should show the trusting dog illustration', () => {
      render(<PromisePending content={CONTENT} onSuccess={noop} onFailed={noop} />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', expect.stringContaining('trusting-dog'));
    });

    it('should show the promise content with the "Your promise:" label', () => {
      render(<PromisePending content={CONTENT} onSuccess={noop} onFailed={noop} />);

      expect(screen.getByText(`Your promise: ${CONTENT}`)).toBeInTheDocument();
    });

    it('should show the trust message', () => {
      render(<PromisePending content={CONTENT} onSuccess={noop} onFailed={noop} />);

      expect(
        screen.getByText('AR Dog is watching you with strong trust.'),
      ).toBeInTheDocument();
    });

    it('should render the two action buttons', () => {
      render(<PromisePending content={CONTENT} onSuccess={noop} onFailed={noop} />);

      expect(screen.getByRole('button', { name: 'I made it!' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: "I didn't make it..." })).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('should call onSuccess when "I made it!" is clicked', async () => {
      const onSuccess = jest.fn();
      const user = userEvent.setup();
      render(<PromisePending content={CONTENT} onSuccess={onSuccess} onFailed={noop} />);

      await user.click(screen.getByRole('button', { name: 'I made it!' }));

      expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    it('should call onFailed when "I didn\'t make it..." is clicked', async () => {
      const onFailed = jest.fn();
      const user = userEvent.setup();
      render(<PromisePending content={CONTENT} onSuccess={noop} onFailed={onFailed} />);

      await user.click(screen.getByRole('button', { name: "I didn't make it..." }));

      expect(onFailed).toHaveBeenCalledTimes(1);
    });
  });
});
