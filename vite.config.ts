import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    testTimeout: 30000,
    coverage: {
      provider: 'istanbul'
    }
  }
});
