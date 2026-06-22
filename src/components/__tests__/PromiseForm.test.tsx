import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PromiseForm } from '@/components/PromiseForm';
import { ADDICTIONS } from '@/constants/addictions';

const TEST_CONSTANTS = {
  CONTENT: "I won't open Instagram Reels at all today",
};

describe('PromiseForm', () => {
  describe('Success cases', () => {
    it('should render all addiction options', () => {
      render(<PromiseForm onSubmit={jest.fn()} />);

      ADDICTIONS.forEach((addiction) => {
        expect(screen.getByText(addiction.label)).toBeInTheDocument();
      });
    });

    it('should call onSubmit with the selected addiction and content after typing and submitting', async () => {
      const user = userEvent.setup();
      const onSubmit = jest.fn();
      render(<PromiseForm onSubmit={onSubmit} />);

      await user.type(screen.getByRole('textbox'), TEST_CONSTANTS.CONTENT);
      await user.click(screen.getByRole('button', { name: 'Make a promise' }));

      expect(onSubmit).toHaveBeenCalledWith({
        addiction: ADDICTIONS[0].key,
        content: TEST_CONSTANTS.CONTENT,
      });
    });
  });

  describe('Error cases', () => {
    it('should disable the submit button when content is empty', () => {
      render(<PromiseForm onSubmit={jest.fn()} />);

      expect(screen.getByRole('button', { name: 'Make a promise' })).toBeDisabled();
    });

    it('should not call onSubmit when clicked with empty content', async () => {
      const user = userEvent.setup();
      const onSubmit = jest.fn();
      render(<PromiseForm onSubmit={onSubmit} />);

      await user.click(screen.getByRole('button', { name: 'Make a promise' }));

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
