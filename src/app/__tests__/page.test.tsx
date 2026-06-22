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
  content: "I won't open Instagram Reels at all today",
  status,
  createdAt: 0,
  updatedAt: 0,
});

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading', () => {
    it('should show the loading message when loading is true', () => {
      mockedUseTodayPromise.mockReturnValue({ ...baseHook, loading: true });

      render(<Home />);

      expect(screen.getByText('Loading…')).toBeInTheDocument();
    });
  });

  describe('No promise today', () => {
    it('should show the promise form', () => {
      mockedUseTodayPromise.mockReturnValue({ ...baseHook, promise: undefined });

      render(<Home />);

      expect(screen.getByRole('button', { name: 'Make a promise' })).toBeInTheDocument();
    });
  });

  describe('Promise in progress (pending)', () => {
    it('should show the two action buttons', () => {
      mockedUseTodayPromise.mockReturnValue({ ...baseHook, promise: makeRecord('pending') });

      render(<Home />);

      expect(screen.getByRole('button', { name: 'I made it!' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: "I didn't make it..." })).toBeInTheDocument();
    });
  });

  describe('Promise succeeded (success)', () => {
    it('should show the happy dog illustration', () => {
      mockedUseTodayPromise.mockReturnValue({ ...baseHook, promise: makeRecord('success') });

      render(<Home />);

      expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('happy-dog'));
    });
  });

  describe('Promise failed (failed)', () => {
    it('should show the sad dog illustration', () => {
      mockedUseTodayPromise.mockReturnValue({ ...baseHook, promise: makeRecord('failed') });

      render(<Home />);

      expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('sad-dog'));
    });
  });
});
