import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'node',
          environment: 'node',
        },
      },
      {
        test: {
          name: 'jsdom',
          environment: 'jsdom',
        },
      },
    ],
  },
});
