export const ADDICTIONS = [
  { key: 'instagram-reels', label: 'Instagram Reels', primary: '#E1306C', secondary: '#FFFFFF' },
  { key: 'facebook-reels', label: 'Facebook Reels', primary: '#1877F2', secondary: '#FFFFFF' },
  { key: 'youtube-shorts', label: 'YouTube Shorts', primary: '#FF0000', secondary: '#FFFFFF' },
  { key: 'threads', label: 'Threads', primary: '#000000', secondary: '#FFFFFF' },
  { key: 'x', label: 'X', primary: '#000000', secondary: '#FFFFFF' },
  { key: 'reddit', label: 'Reddit', primary: '#FF4500', secondary: '#FFFFFF' },
  { key: 'ptt', label: 'PTT', primary: '#000000', secondary: '#FFFFFF' },
  { key: 'custom', label: 'Custom', primary: '#000000', secondary: '#FFFFFF' },
] as const;

export type AddictionKey = (typeof ADDICTIONS)[number]['key'];

export const CUSTOM_KEY = 'custom' satisfies AddictionKey;
