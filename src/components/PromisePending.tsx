import Image from 'next/image';
import { PromiseActions } from '@/components/PromiseActions';

interface PromisePendingProps {
  content: string;
  onSuccess: () => void;
  onFailed: () => void;
}

const TRUST_MESSAGE = 'AR Dog is watching over you with complete trust.';

export function PromisePending({ content, onSuccess, onFailed }: PromisePendingProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image src="/dog/trusting-dog.svg" alt="Trusting dog" width={200} height={200} priority />
      <p className="text-lg">Your promise: {content}</p>
      <p className="text-xl font-semibold">{TRUST_MESSAGE}</p>
      <PromiseActions onSuccess={onSuccess} onFailed={onFailed} />
    </div>
  );
}
