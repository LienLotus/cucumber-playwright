import { After, AfterAll, Before, BeforeAll, ITestCaseHookParameter, Status } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import fs from 'fs';
import path from 'path';

BeforeAll(async function () {
  const resultsDir = path.join(process.cwd(), 'test-results', 'screenshots');
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }
});

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  if (scenario.result && scenario.result.status === Status.FAILED && this.page) {
    const sanitizedName = scenario.pickle.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filePath = path.join('test-results', 'screenshots', `${sanitizedName}.png`);
    await this.page.screenshot({ path: filePath, fullPage: true });
  }

  await this.dispose();
});
