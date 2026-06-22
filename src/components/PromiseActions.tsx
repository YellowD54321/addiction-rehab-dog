'use client';

interface PromiseActionsProps {
  onSuccess: () => void;
  onFailed: () => void;
}

export function PromiseActions({ onSuccess, onFailed }: PromiseActionsProps) {
  return (
    <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
      <button
        type="button"
        onClick={onSuccess}
        className="flex-1 rounded-full bg-green-600 px-5 py-3 font-medium text-white transition-colors hover:bg-green-700"
      >
        I made it!
      </button>
      <button
        type="button"
        onClick={onFailed}
        className="flex-1 rounded-full bg-red-600 px-5 py-3 font-medium text-white transition-colors hover:bg-red-700"
      >
        I didn&apos;t make it...
      </button>
    </div>
  );
}
