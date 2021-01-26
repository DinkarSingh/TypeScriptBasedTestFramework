import allureReporter from '@wdio/allure-reporter';
import { logger, Logger } from "../decorators/logger-decorators";
import { TestLogger } from "../loggers/test-logger";
import { BaseTestData } from "../models/base-test-data";

@logger()
export class TestBuildingBlocks implements Logger {

  public static addStepAndExecute(stepName: string, callback: () => void, cleanUp?) {
    allureReporter.startStep(stepName);
    let success: boolean = false;
    try {
      callback();
      success = true;
      allureReporter.endStep();
    } finally {
      if (!success) {
        allureReporter.endStep('failed');
        new TestLogger('General').error(`step "${stepName}" failed please check the report  \n\n`);
      }
      if (cleanUp !== undefined && typeof cleanUp === 'function') {
        allureReporter.startStep('Cleanup');
        new TestLogger('General').info('Entering cleanup phase');
        try {
          cleanUp();
        } catch (ex) {
          TestLogger.getGeneralLogger().error('failure in cleanup pahse');
        }
        allureReporter.endStep();
      }
    }
  }
  public logger!: TestLogger;
  protected testData: BaseTestData;

  // tslint:disable-next-line: no-empty
  constructor(testData) {
    this.testData = testData;
  }
}
