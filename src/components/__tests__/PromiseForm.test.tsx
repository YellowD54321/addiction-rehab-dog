import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PromiseForm } from '@/components/PromiseForm';
import { ADDICTIONS } from '@/constants/addictions';

const TEST_CONSTANTS = {
  CONTENT: '我今天完全不開啟 IG 滑短影音',
};

describe('PromiseForm', () => {
  describe('成功情境', () => {
    it('應該渲染所有成癮項目選項', () => {
      render(<PromiseForm onSubmit={jest.fn()} />);

      ADDICTIONS.forEach((addiction) => {
        expect(screen.getByText(addiction.label)).toBeInTheDocument();
      });
    });

    it('輸入內容並送出後應該以選定項目與內容觸發 onSubmit', async () => {
      const user = userEvent.setup();
      const onSubmit = jest.fn();
      render(<PromiseForm onSubmit={onSubmit} />);

      await user.type(screen.getByRole('textbox'), TEST_CONSTANTS.CONTENT);
      await user.click(screen.getByRole('button', { name: '訂下約定' }));

      expect(onSubmit).toHaveBeenCalledWith({
        addiction: ADDICTIONS[0].key,
        content: TEST_CONSTANTS.CONTENT,
      });
    });
  });

  describe('錯誤情境', () => {
    it('內容為空時送出按鈕應該被禁用', () => {
      render(<PromiseForm onSubmit={jest.fn()} />);

      expect(screen.getByRole('button', { name: '訂下約定' })).toBeDisabled();
    });

    it('內容為空時點擊不應觸發 onSubmit', async () => {
      const user = userEvent.setup();
      const onSubmit = jest.fn();
      render(<PromiseForm onSubmit={onSubmit} />);

      await user.click(screen.getByRole('button', { name: '訂下約定' }));

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
