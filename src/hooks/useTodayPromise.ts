import { useCallback, useEffect, useState } from 'react';
import {
  getActivePromise,
  acknowledgeLatest,
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
  acknowledge: () => Promise<void>;
}

export function useTodayPromise(): UseTodayPromise {
  const [promise, setPromise] = useState<PromiseRecord | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setPromise(await getActivePromise());
  }, []);

  useEffect(() => {
    let active = true;
    getActivePromise()
      .then((latest) => {
        if (!active) return;
        setPromise(latest);
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

  const acknowledge = useCallback(async () => {
    await acknowledgeLatest();
    await refresh();
  }, [refresh]);

  return { promise, loading, submit, markSuccess, markFailed, acknowledge };
}
