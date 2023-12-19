import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    testTimeout: 30000,
    coverage: {
      provider: 'istanbul'
    }
  }
});
