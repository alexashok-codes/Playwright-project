module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'steps/**/*.ts',
      'support/**/*.ts',
      'hooks/hooks.ts'
    ],
    paths: ['features/**/*.feature'],

    format: [
      "progress",
      "json:reports/cucumber.json"
    ],

    publishQuiet: true
  }
};
