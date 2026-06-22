'use client';

import { useState } from 'react';
import { ADDICTIONS, type AddictionKey } from '@/constants/addictions';

interface PromiseFormProps {
  onSubmit: (input: { addiction: AddictionKey; content: string }) => void;
}

export function PromiseForm({ onSubmit }: PromiseFormProps) {
  const [addiction, setAddiction] = useState<AddictionKey>(ADDICTIONS[0].key);
  const [content, setContent] = useState('');

  const trimmed = content.trim();
  const canSubmit = trimmed.length > 0;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit({ addiction, content: trimmed });
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4">
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-lg font-semibold">想戒除什麼？</legend>
        {ADDICTIONS.map((item) => (
          <label key={item.key} className="flex items-center gap-2">
            <input
              type="radio"
              name="addiction"
              value={item.key}
              checked={addiction === item.key}
              onChange={() => setAddiction(item.key)}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">今天的約定</span>
        <input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="例：我今天完全不開啟 IG 滑短影音"
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="rounded-full bg-foreground px-5 py-3 font-medium text-background transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      >
        訂下約定
      </button>
    </form>
  );
}
