module.exports = {
  launch: {
    headless: true,
    args: [
      '--max-old-space-size=4096',
    ],
    devtools: true,
  },
  browserContext: 'default',
  server: {
    command: 'npm run serve',
  },
};
