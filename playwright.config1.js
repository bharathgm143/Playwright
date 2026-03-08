// @ts-check
const {devices}=require('@playwright/test');
const { worker, workers } = require('node:cluster');
//import { defineConfig, devices } from '@playwright/test';

const config = {
//export default defineConfig({
  testDir: './tests',
  retries: 1,
  //default worker will be 5
  workers: 1,


  /* Maximum time one test can run */
  timeout: 40 * 10000,

  expect: {
    /* Timeout for assertions */
    timeout: 5000,
  },

  reporter: 'html',

  projects: [{
    name: 'safari',
    use: {
      browserName: 'webkit',
      headless: false,
      screenshot: "off",
      trace: 'on',
      //...devices['iPad (gen 11)'],
    }
  },
  {
    name: 'chrome',
    use: {
      browserName: 'chromium',//firefox, webkit
      headless: false,
      screenshot: "on",
      video: 'retain-on-failure',
      ignoreHTTPSErrors: true,
      permissions: ['geolocation'],
      //trace: "on", //Everytime trace with screenshot
      trace: 'on', //Trace only on failure  On, off
      viewport: {width: 720,height: 720}

    }
  }]
};

module.exports = config