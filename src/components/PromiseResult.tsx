import Image from 'next/image';
import { ADDICTIONS, type AddictionKey } from '@/constants/addictions';

interface PromiseResultProps {
  status: 'success' | 'failed';
  addiction: AddictionKey;
  onBackHome: () => void;
}

const RESULT = {
  success: {
    src: '/dog/happy-dog.svg',
    alt: 'Happy dog',
    message: "Awesome, you made it today! 🎉 AR Dog Can't wait to see you tomorrow! 🎉",
  },
  failed: {
    src: '/dog/sad-dog.svg',
    alt: 'Sad dog',
    message: 'AR Dog gives you a hug. AR Dog expects to see you tomorrow.',
  },
} as const;

export function PromiseResult({ status, addiction, onBackHome }: PromiseResultProps) {
  const { src, alt, message } = RESULT[status];
  const selected = ADDICTIONS.find((item) => item.key === addiction) ?? ADDICTIONS[0];

  return (
    <div className="flex flex-col items-center gap-4">
      <Image src={src} alt={alt} width={200} height={200} priority />
      <p className="text-xl font-semibold">{message}</p>

      {/* Display-only: only the selected addiction, in its selected style */}
      <span
        className="rounded-lg border-2 px-4 py-3 text-sm font-medium"
        style={{
          backgroundColor: selected.primary,
          color: selected.secondary,
          borderColor: selected.primary,
        }}
      >
        {selected.label}
      </span>

      <button
        type="button"
        onClick={onBackHome}
        className="cursor-pointer rounded-full bg-foreground px-5 py-3 font-medium text-background transition-colors"
      >
        Back to home
      </button>
    </div>
  );
}
