import Image from 'next/image';

interface PromiseResultProps {
  status: 'success' | 'failed';
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

export function PromiseResult({ status }: PromiseResultProps) {
  const { src, alt, message } = RESULT[status];

  return (
    <div className="flex flex-col items-center gap-4">
      <Image src={src} alt={alt} width={200} height={200} priority />
      <p className="text-xl font-semibold">{message}</p>
    </div>
  );
}
