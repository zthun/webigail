import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'node',
    testTimeout: 30000,
    coverage: {
      provider: 'istanbul'
    }
  }
});
