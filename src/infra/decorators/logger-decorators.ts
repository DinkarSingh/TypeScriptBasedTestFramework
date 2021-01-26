import {TestLogger} from "../loggers/test-logger";

export interface Logger {
  logger: TestLogger;
}

export function logger() {
  return function <T extends new(...args: any[]) => {}>(constructor: T) {
    return class extends constructor {
      public logger = new TestLogger();
    };
  };
}