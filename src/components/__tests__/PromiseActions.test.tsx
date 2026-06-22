import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PromiseActions } from '@/components/PromiseActions';

describe('PromiseActions', () => {
  describe('Success cases', () => {
    it('should render the two action buttons', () => {
      render(<PromiseActions onSuccess={jest.fn()} onFailed={jest.fn()} />);

      expect(screen.getByRole('button', { name: 'I made it!' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: "I didn't make it..." })).toBeInTheDocument();
    });

    it('should call onSuccess when "I made it!" is clicked', async () => {
      const user = userEvent.setup();
      const onSuccess = jest.fn();
      render(<PromiseActions onSuccess={onSuccess} onFailed={jest.fn()} />);

      await user.click(screen.getByRole('button', { name: 'I made it!' }));

      expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    it('should call onFailed when "I didn\'t make it..." is clicked', async () => {
      const user = userEvent.setup();
      const onFailed = jest.fn();
      render(<PromiseActions onSuccess={jest.fn()} onFailed={onFailed} />);

      await user.click(screen.getByRole('button', { name: "I didn't make it..." }));

      expect(onFailed).toHaveBeenCalledTimes(1);
    });
  });
});
