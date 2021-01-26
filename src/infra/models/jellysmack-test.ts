import {TestLogger} from "../loggers/test-logger";

export interface Jellysmack extends WebdriverIO.Test {
  type: string;
  title: string;
  parent: string;
  fullTitle: string;
  pending: boolean;
  file: string;
  duration: number;
  currentTest: string;
  passed: boolean;
  testLogger: TestLogger;
}
