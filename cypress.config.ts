import { defineConfig } from 'cypress';

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    specPattern: 'cypress/e2e/**/*.ts',
  },
});
