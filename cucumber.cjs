const commonPath = "./e2e/";

const common = [
  `${commonPath}/features/escenarios.feature`,
  "--require-module ts-node/register", //typescript cucumber
  `--require ${commonPath}/stepDefinitions/*.ts`,
  `--require ${commonPath}/world/PlaywrightWorld.ts`,
  "--fail-fast",
  "--format progress-bar",
].join(" ");

module.exports = {
  default: common,
};
