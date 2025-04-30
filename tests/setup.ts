import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { vi } from 'vitest';

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Mock ResizeObserver which isn't available in the test environment
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock window.matchMedia which isn't available in the test environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock the crypto API for generating UUIDs
Object.defineProperty(window, 'crypto', {
  value: {
    getRandomValues: <T extends ArrayBufferView | null>(arr: T) => crypto.getRandomValues(arr),
    subtle: {},
    randomUUID: () => '12345678-1234-1234-1234-123456789012',
  },
});

// Mock the IntersectionObserver which isn't available in the test environment
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [0],
}));

// Run cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
