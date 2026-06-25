import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [tsconfigPaths({ projects: ['test/tsconfig.json'] })],
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
