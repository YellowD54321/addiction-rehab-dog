'use client';

import { useState } from 'react';
import { ADDICTIONS, type AddictionKey } from '@/constants/addictions';

interface PromiseFormProps {
  onSubmit: (input: { addiction: AddictionKey; content: string; customLabel?: string }) => void;
}

export function PromiseForm({ onSubmit }: PromiseFormProps) {
  const [addiction, setAddiction] = useState<AddictionKey>(ADDICTIONS[0].key);
  const [content, setContent] = useState('');
  const [customLabel, setCustomLabel] = useState('');

  const isCustom = addiction === 'custom';
  const trimmed = content.trim();
  const trimmedCustom = customLabel.trim();
  const canSubmit = trimmed.length > 0 && (!isCustom || trimmedCustom.length > 0);

  const selected = ADDICTIONS.find((item) => item.key === addiction) ?? ADDICTIONS[0];
  const placeholder = `e.g. I will do ____ (something) instead of opening ${selected.label} today`;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      addiction,
      content: trimmed,
      customLabel: isCustom ? trimmedCustom : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4">
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-lg font-semibold">
          Addiction Rehab Dog is expecting your promise
        </legend>
        <div role="radiogroup" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ADDICTIONS.map((item) => {
            const isSelected = addiction === item.key;
            return (
              <button
                key={item.key}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setAddiction(item.key)}
                className="cursor-pointer rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors"
                style={
                  isSelected
                    ? {
                        backgroundColor: item.primary,
                        color: item.secondary,
                        borderColor: item.primary,
                      }
                    : {
                        backgroundColor: item.secondary,
                        color: item.primary,
                        borderColor: item.primary,
                      }
                }
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {isCustom && (
        <label className="flex flex-col gap-2">
          <span className="text-lg font-semibold">What do you want to quit?</span>
          <input
            value={customLabel}
            onChange={(event) => setCustomLabel(event.target.value)}
            placeholder="e.g. smoking, alcohol, gambling…"
            className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
      )}

      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Your promise</span>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder={placeholder}
          rows={3}
          className="resize-y rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="cursor-pointer rounded-full bg-foreground px-5 py-3 font-medium text-background transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      >
        Make a promise
      </button>
    </form>
  );
}
