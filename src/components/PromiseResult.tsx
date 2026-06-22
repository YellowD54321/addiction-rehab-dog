import Image from 'next/image';

interface PromiseResultProps {
  status: 'success' | 'failed';
}

const RESULT = {
  success: {
    src: '/dog/happy-dog.svg',
    alt: '開心的狗狗',
    message: '太棒了，今天你做到了！🎉',
  },
  failed: {
    src: '/dog/sad-dog.svg',
    alt: '沮喪的狗狗',
    message: '沒關係，明天再試一次吧…',
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
