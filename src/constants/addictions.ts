export const ADDICTIONS = [
  { key: 'instagram-reels', label: 'Instagram Reels' },
  { key: 'facebook-reels', label: 'Facebook 短影片' },
  { key: 'youtube-shorts', label: 'YouTube Shorts' },
  { key: 'threads', label: 'Threads' },
  { key: 'x', label: 'X' },
  { key: 'reddit', label: 'Reddit' },
  { key: 'ptt', label: 'PTT' },
] as const;

export type AddictionKey = (typeof ADDICTIONS)[number]['key'];
