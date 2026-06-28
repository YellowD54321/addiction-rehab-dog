'use client';

import { useState } from 'react';
import { PromiseForm } from '@/components/PromiseForm';
import { PromiseActions } from '@/components/PromiseActions';
import { PromiseResult } from '@/components/PromiseResult';
import { useTodayPromise } from '@/hooks/useTodayPromise';
import type { AddictionKey } from '@/constants/addictions';

export default function Home() {
  const { promise, loading, submit, markSuccess, markFailed } = useTodayPromise();
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (input: { addiction: AddictionKey; content: string }) => {
    await submit(input);
    setShowForm(false);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8">
        <h1 className="text-3xl font-semibold tracking-tight">Daily Promise</h1>

        {loading ? (
          <p className="text-zinc-500">Loading…</p>
        ) : showForm || !promise ? (
          <PromiseForm onSubmit={handleSubmit} />
        ) : promise.status === 'pending' ? (
          <>
            <p className="text-lg">Your promise: {promise.content}</p>
            <PromiseActions onSuccess={markSuccess} onFailed={markFailed} />
          </>
        ) : (
          <PromiseResult
            status={promise.status}
            addiction={promise.addiction}
            onBackHome={() => setShowForm(true)}
          />
        )}
      </main>
    </div>
  );
}
