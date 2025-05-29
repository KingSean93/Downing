import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://bonds-client-test.downinglabs.co.uk/',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
});
