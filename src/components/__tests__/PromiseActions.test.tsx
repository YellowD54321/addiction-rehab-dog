import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PromiseActions } from '@/components/PromiseActions';

describe('PromiseActions', () => {
  describe('成功情境', () => {
    it('應該渲染兩個操作按鈕', () => {
      render(<PromiseActions onSuccess={jest.fn()} onFailed={jest.fn()} />);

      expect(screen.getByRole('button', { name: 'I made it!' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: "I didn't make it..." })).toBeInTheDocument();
    });

    it('點擊「I made it!」應該觸發 onSuccess', async () => {
      const user = userEvent.setup();
      const onSuccess = jest.fn();
      render(<PromiseActions onSuccess={onSuccess} onFailed={jest.fn()} />);

      await user.click(screen.getByRole('button', { name: 'I made it!' }));

      expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    it('點擊「I didn\'t make it...」應該觸發 onFailed', async () => {
      const user = userEvent.setup();
      const onFailed = jest.fn();
      render(<PromiseActions onSuccess={jest.fn()} onFailed={onFailed} />);

      await user.click(screen.getByRole('button', { name: "I didn't make it..." }));

      expect(onFailed).toHaveBeenCalledTimes(1);
    });
  });
});
