const scanner = require("sonarqube-scanner");

scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "sqp_7f6206d84f39c5abb4b776801b463d16f8a67d20",
    options: {
      "sonar.projectName": "retailcore-mfe-create-credit-product",
      "sonar.projectDescription": "Here I can add a description of my project",
      "sonar.projectKey": "retailcore-mfe-create-credit-product",
      "sonar.projectVersion": "0.0.1",
      "sonar.sourceEncoding": "UTF-8",
      "sonar.tests": "src/__tests__",
      "sonar.test.inclusions": "*.test.tsx,*.test.ts",
      "sonar.exclusions": "**/__tests__/**",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
    },
  },
  () => process.exit()
);
