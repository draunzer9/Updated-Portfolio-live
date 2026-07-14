import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        amazonUx: resolve(__dirname, 'amazon-ux.html'),
        growgrid: resolve(__dirname, 'growgrid.html'),
        jtbd: resolve(__dirname, 'jtbd.html'),
        spotRide: resolve(__dirname, 'spot-ride.html'),
        vitaFit: resolve(__dirname, 'vita-fit.html'),
        xGrowth: resolve(__dirname, 'x-growth.html'),
        zepto: resolve(__dirname, 'zepto.html'),
        zomato: resolve(__dirname, 'zomato.html'),
        gymbuddy: resolve(__dirname, 'gymbuddy.html')
      }
    }
  }
});
