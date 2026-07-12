'use client';

import { PromiseForm } from '@/components/PromiseForm';
import { PromisePending } from '@/components/PromisePending';
import { PromiseResult } from '@/components/PromiseResult';
import { useTodayPromise } from '@/hooks/useTodayPromise';

export default function Home() {
  const { promise, loading, submit, markSuccess, markFailed, acknowledge } =
    useTodayPromise();

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8">
        <h1 className="text-3xl font-semibold tracking-tight">Daily Promise</h1>

        {loading ? (
          <p className="text-zinc-500">Loading…</p>
        ) : !promise ? (
          <PromiseForm onSubmit={submit} />
        ) : promise.status === 'pending' ? (
          <PromisePending
            content={promise.content}
            onSuccess={markSuccess}
            onFailed={markFailed}
          />
        ) : (
          <PromiseResult
            status={promise.status}
            addiction={promise.addiction}
            customLabel={promise.customLabel}
            onBackHome={acknowledge}
          />
        )}
      </main>
    </div>
  );
}
