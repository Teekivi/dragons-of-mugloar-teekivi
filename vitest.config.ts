import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    projects: [
      {
        resolve: {
          alias: {
            '~~': path.resolve(__dirname, '.'),
            '~': path.resolve(__dirname, '.'),
          },
        },
        test: {
          name: 'unit',
          include: ['test/unit/**/*.spec.ts'],
          environment: 'node',
          globals: true,
        },
      },
    ],
  },
});
