'use client';

import { PromiseForm } from '@/components/PromiseForm';
import { PromiseActions } from '@/components/PromiseActions';
import { PromiseResult } from '@/components/PromiseResult';
import { useTodayPromise } from '@/hooks/useTodayPromise';

export default function Home() {
  const { promise, loading, submit, markSuccess, markFailed } = useTodayPromise();

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8">
        <h1 className="text-3xl font-semibold tracking-tight">戒癮約定</h1>

        {loading ? (
          <p className="text-zinc-500">載入中…</p>
        ) : !promise ? (
          <PromiseForm onSubmit={submit} />
        ) : promise.status === 'pending' ? (
          <>
            <p className="text-lg">今日約定：{promise.content}</p>
            <PromiseActions onSuccess={markSuccess} onFailed={markFailed} />
          </>
        ) : (
          <PromiseResult status={promise.status} />
        )}
      </main>
    </div>
  );
}
