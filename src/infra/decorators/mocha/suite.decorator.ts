import 'reflect-metadata';
import {ReflectionTypes, SuiteParams, SuiteReflectModel, TestReflectModel} from "../../models/mocha";

export function Suite(params?: SuiteParams) {
  return function (target: unknown & { name: string }): void {
    const suiteConfig: SuiteReflectModel = {
      name: target.name,
      params
    };

    const name = params && params.name || target.name;

    switch (params && params.execution) {
      case 'only':
        // TODO
        describe.only(name, () => {
          // TODO
        });
        break;
      case 'skip':
        // TODO
        describe.skip(name, () => {
        // TODO
        });
        break;
      case 'pending':
        // TODO
        describe.skip(name, () => {
        // TODO
        });
        break;
      default:
        describe(name, function (this: Mocha.Suite) {
          const instance = new (target as any)();
          const tests: TestReflectModel[] = Reflect.getMetadata(ReflectionTypes.Test, instance);
          const beforeSuiteArray = Reflect.getMetadata(ReflectionTypes.BeforeSuite, instance) || [];
          const beforeTests = Reflect.getMetadata(ReflectionTypes.BeforeTest, instance) || [];
          const afterTests = Reflect.getMetadata(ReflectionTypes.AfterTest, instance) || [];

          before(function () {
            beforeSuiteArray.forEach(beforeSuite => instance[beforeSuite.name]());
          });

          beforeEach(function () {
            beforeTests.forEach(beforeTest => instance[beforeTest.name]());
          });

          tests.forEach(function (test) {
            it(test.name, function (done?) {
              return instance[test.name](done);
            });
          });

          afterEach(function () {
            afterTests.forEach(beforeTest => instance[beforeTest.name]());
          })
        });
    }
  };
}
