const Configuration = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  ignores: [(commit) => commit === ''],
  defaultIgnores: true,
};

module.exports = Configuration;
