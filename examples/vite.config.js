import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { pluginRollupOptions } from 'vite-plugin-rollup-options';

export default defineConfig({
  plugins: [
    svelte(),
    pluginRollupOptions({
      plugins: [
        {
          name: 'set-javascript-mime-type',
          rollupOptions: {
            output: {
              chunkFileNames: 'assets/chunk-[hash].js',
              entryFileNames: '[name].js',
              sourcemap: true,
              format: 'iife',
              plugins: [
                {
                  name: 'rollup-plugin-inject',
                  options: {
                    source: `window.__vite_env = ${JSON.stringify(process.env)}`,
                  },
                },
              ],
            },
            plugins: [
              {
                name: 'vite-plugin-image-optimizations',
                options: {
                  quality: 70,
                  optimizePNG: true,
                  optimizeSVG: true,
                  optimizeJpeg: true,
                },
              },
              {
                name: 'set-javascript-mime-type',
                options: {
                  // Set MIME type for JavaScript files
                  contentType: 'application/javascript',
                },
              },
            ],
          },
        },
      ],
    }),
  ],
});
