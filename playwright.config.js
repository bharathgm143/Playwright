// @ts-check

import { defineConfig, devices } from '@playwright/test';
import { config } from 'node:process';

//const config = ({
export default defineConfig({
  testDir: './tests',

  /* Maximum time one test can run */
  timeout: 180 * 1000,

  expect: {
    /* Timeout for assertions */
    timeout: 5000,
  },

  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: "on",
    //trace: "on", //Everytime trace with screenshot
    trace: 'on', //Trace only on failure  On, off
    //firefox
    //webkit

  },
});
//module.exports = config