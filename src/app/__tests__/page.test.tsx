import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { useTodayPromise } from '@/hooks/useTodayPromise';
import type { PromiseRecord } from '@/lib/promises/types';

jest.mock('@/hooks/useTodayPromise');

const mockedUseTodayPromise = useTodayPromise as jest.MockedFunction<typeof useTodayPromise>;

const baseHook = {
  promise: undefined as PromiseRecord | undefined,
  loading: false,
  submit: jest.fn(),
  markSuccess: jest.fn(),
  markFailed: jest.fn(),
};

const makeRecord = (status: PromiseRecord['status']): PromiseRecord => ({
  id: 1,
  date: '2026-06-21',
  addiction: 'instagram-reels',
  content: '我今天完全不開啟 IG 滑短影音',
  status,
  createdAt: 0,
  updatedAt: 0,
});

describe('首頁 (Home)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('載入中', () => {
    it('loading 為 true 時應顯示載入提示', () => {
      mockedUseTodayPromise.mockReturnValue({ ...baseHook, loading: true });

      render(<Home />);

      expect(screen.getByText('載入中…')).toBeInTheDocument();
    });
  });

  describe('今日無約定', () => {
    it('應顯示訂約定表單', () => {
      mockedUseTodayPromise.mockReturnValue({ ...baseHook, promise: undefined });

      render(<Home />);

      expect(screen.getByRole('button', { name: '訂下約定' })).toBeInTheDocument();
    });
  });

  describe('約定進行中 (pending)', () => {
    it('應顯示兩個操作按鈕', () => {
      mockedUseTodayPromise.mockReturnValue({ ...baseHook, promise: makeRecord('pending') });

      render(<Home />);

      expect(screen.getByRole('button', { name: 'I made it!' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: "I didn't make it..." })).toBeInTheDocument();
    });
  });

  describe('約定成功 (success)', () => {
    it('應顯示開心的狗狗插畫', () => {
      mockedUseTodayPromise.mockReturnValue({ ...baseHook, promise: makeRecord('success') });

      render(<Home />);

      expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('happy-dog'));
    });
  });

  describe('約定失敗 (failed)', () => {
    it('應顯示沮喪的狗狗插畫', () => {
      mockedUseTodayPromise.mockReturnValue({ ...baseHook, promise: makeRecord('failed') });

      render(<Home />);

      expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('sad-dog'));
    });
  });
});
