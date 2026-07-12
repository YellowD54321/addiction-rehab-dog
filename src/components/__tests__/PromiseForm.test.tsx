import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PromiseForm } from '@/components/PromiseForm';
import { ADDICTIONS } from '@/constants/addictions';

const TEST_CONSTANTS = {
  CONTENT: "I won't open Instagram Reels at all today",
};

describe('PromiseForm', () => {
  describe('Success cases', () => {
    it('should render the expecting-your-promise heading', () => {
      render(<PromiseForm onSubmit={jest.fn()} />);

      expect(
        screen.getByText('Addiction Rehab Dog is expecting your promise'),
      ).toBeInTheDocument();
    });

    it('should render a multiline textarea for the promise content', () => {
      render(<PromiseForm onSubmit={jest.fn()} />);

      expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
    });

    it('should render all addiction options', () => {
      render(<PromiseForm onSubmit={jest.fn()} />);

      ADDICTIONS.forEach((addiction) => {
        expect(screen.getByRole('radio', { name: addiction.label })).toBeInTheDocument();
      });
    });

    it('should mark the first addiction option as selected by default', () => {
      render(<PromiseForm onSubmit={jest.fn()} />);

      expect(screen.getByRole('radio', { name: ADDICTIONS[0].label })).toHaveAttribute(
        'aria-checked',
        'true',
      );
    });

    it('should select only one option at a time', async () => {
      const user = userEvent.setup();
      render(<PromiseForm onSubmit={jest.fn()} />);

      await user.click(screen.getByRole('radio', { name: 'YouTube Shorts' }));

      expect(screen.getByRole('radio', { name: 'YouTube Shorts' })).toHaveAttribute(
        'aria-checked',
        'true',
      );
      expect(screen.getByRole('radio', { name: ADDICTIONS[0].label })).toHaveAttribute(
        'aria-checked',
        'false',
      );
    });

    it('should update the placeholder to match the selected app', async () => {
      const user = userEvent.setup();
      render(<PromiseForm onSubmit={jest.fn()} />);

      await user.click(screen.getByRole('radio', { name: 'YouTube Shorts' }));

      expect(
        screen.getByPlaceholderText(
          'e.g. I will do ____ (something) instead of opening YouTube Shorts today',
        ),
      ).toBeInTheDocument();
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

  describe('Custom addiction', () => {
    const CUSTOM_PLACEHOLDER = 'e.g. smoking, alcohol, gambling…';

    it('should not show the custom label input by default', () => {
      render(<PromiseForm onSubmit={jest.fn()} />);

      expect(screen.queryByPlaceholderText(CUSTOM_PLACEHOLDER)).not.toBeInTheDocument();
    });

    it('should show the custom label input after selecting Custom', async () => {
      const user = userEvent.setup();
      render(<PromiseForm onSubmit={jest.fn()} />);

      await user.click(screen.getByRole('radio', { name: 'Custom' }));

      expect(screen.getByPlaceholderText(CUSTOM_PLACEHOLDER)).toBeInTheDocument();
    });

    it('should keep the submit button disabled when custom label is empty', async () => {
      const user = userEvent.setup();
      render(<PromiseForm onSubmit={jest.fn()} />);

      await user.click(screen.getByRole('radio', { name: 'Custom' }));
      await user.type(screen.getByPlaceholderText(/instead of opening/), TEST_CONSTANTS.CONTENT);

      expect(screen.getByRole('button', { name: 'Make a promise' })).toBeDisabled();
    });

    it('should call onSubmit with the trimmed custom label after filling both fields', async () => {
      const user = userEvent.setup();
      const onSubmit = jest.fn();
      render(<PromiseForm onSubmit={onSubmit} />);

      await user.click(screen.getByRole('radio', { name: 'Custom' }));
      await user.type(screen.getByPlaceholderText(/instead of opening/), TEST_CONSTANTS.CONTENT);
      await user.type(screen.getByPlaceholderText(CUSTOM_PLACEHOLDER), '  smoking  ');
      await user.click(screen.getByRole('button', { name: 'Make a promise' }));

      expect(onSubmit).toHaveBeenCalledWith({
        addiction: 'custom',
        content: TEST_CONSTANTS.CONTENT,
        customLabel: 'smoking',
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
