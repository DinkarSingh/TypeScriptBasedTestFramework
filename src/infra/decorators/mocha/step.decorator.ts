import allureReporter from '@wdio/allure-reporter';
import {StepParams, StepStatus} from "../../models/mocha";

export function Step(params: StepParams) {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const oldExecutable = descriptor.value;
    descriptor.value = function (...args: unknown[]) {
      allureReporter.startStep(params && params.name || '');
      try {
        const result = oldExecutable.apply(target, args);
        allureReporter.endStep(StepStatus.passed);
        return result;
      } catch (e) {
        const broken = (params.markBrokenOn || []).some((type: any) => (e instanceof type));
        if (broken) {
          allureReporter.endStep(StepStatus.broken);
        } else {
          allureReporter.endStep(StepStatus.failed);
        }

        throw e;
      }
    };
    return descriptor;
  }
}
