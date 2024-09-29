import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        'antd/es/layout/style/index.scss',
        './src/styles/antd.theme.scss',
      ]
    }
  },
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style/index.scss`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ``,
      },
    }
  },
});
