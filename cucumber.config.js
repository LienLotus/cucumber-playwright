module.exports = {
  default: {
    requireModule: ['ts-node/register', 'dotenv/config'],
    defaultTimeout: 20000,
    require: ['step-definitions/**/*.ts'],
    paths: ['features/**/*.feature'],

    format: [
      'progress',
      'json:test-results/cucumber-report.json',
      'html:test-results/cucumber-report.html'
    ],

    parallel: 2,
    tags: '@smoke or @regression'
  }
};
