import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('首頁 (Home)', () => {
  describe('成功情境', () => {
    it('應該渲染主標題 heading', () => {
      render(<Home />);

      const heading = screen.getByRole('heading', { level: 1 });

      expect(heading).toBeInTheDocument();
    });
  });
});
