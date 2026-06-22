import { useCallback, useEffect, useState } from 'react';
import {
  getTodayPromise,
  createPromise,
  markSuccess as markSuccessRepo,
  markFailed as markFailedRepo,
} from '@/lib/promises/repository';
import type { AddictionKey } from '@/constants/addictions';
import type { PromiseRecord } from '@/lib/promises/types';

interface UseTodayPromise {
  promise: PromiseRecord | undefined;
  loading: boolean;
  submit: (input: { addiction: AddictionKey; content: string }) => Promise<void>;
  markSuccess: () => Promise<void>;
  markFailed: () => Promise<void>;
}

export function useTodayPromise(): UseTodayPromise {
  const [promise, setPromise] = useState<PromiseRecord | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setPromise(await getTodayPromise());
  }, []);

  useEffect(() => {
    let active = true;
    getTodayPromise()
      .then((today) => {
        if (!active) return;
        setPromise(today);
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const submit = useCallback(
    async (input: { addiction: AddictionKey; content: string }) => {
      await createPromise(input);
      await refresh();
    },
    [refresh],
  );

  const markSuccess = useCallback(async () => {
    await markSuccessRepo();
    await refresh();
  }, [refresh]);

  const markFailed = useCallback(async () => {
    await markFailedRepo();
    await refresh();
  }, [refresh]);

  return { promise, loading, submit, markSuccess, markFailed };
}
