import '@testing-library/jest-dom';

// jsdom 測試環境未提供 structuredClone，fake-indexeddb 需要它
if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = (value) => JSON.parse(JSON.stringify(value));
}

import 'fake-indexeddb/auto';
