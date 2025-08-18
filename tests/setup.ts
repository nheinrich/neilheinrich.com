import { vi } from 'vitest'

// Only import jest-dom if we're in a test environment
if (typeof process !== 'undefined' && process.env.VITEST) {
  // @ts-ignore
  import('@testing-library/jest-dom')
}

// Mock window.matchMedia if needed
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  })
}