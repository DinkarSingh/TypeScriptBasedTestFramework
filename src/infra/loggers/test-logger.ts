import * as async_hooks from "async_hooks";
import * as Path from "path";
import Winston from 'winston';
import {Jellysmack} from '../models/jellysmack-test';
import {ThreadLocalStorage} from '../models/threadLocalStorage';

const colorizer = Winston.format.colorize();

export class TestLogger {

  get loggerById():TestLogger {
    const currentTest = ThreadLocalStorage.get<Jellysmack>(async_hooks.executionAsyncId());
    if (!currentTest) {
      return new TestLogger('General');
    }
    return currentTest.testLogger;
  }

  public static getGeneralLogger(): Winston.Logger {
    if (!this.winstonGeneralLogger) {
      this.winstonGeneralLogger = TestLogger.createLogger('General');
    }
    return this.winstonGeneralLogger;
  }

  private static winstonGeneralLogger: Winston.Logger;

  private static createLogger(name: string): Winston.Logger {
    const logPath = `logs/${ name }`;
    const logger = Winston.createLogger({
      level: 'debug',
      format: Winston.format.combine(
        Winston.format.timestamp(),
        Winston.format.simple(),
        Winston.format.printf((msg) =>
          colorizer.colorize(msg.level, `[ ${ name } ] ${ msg.timestamp } - ${ msg.level }: ${ msg.message }`)
        )
      ),
      transports: [
        new Winston.transports.File({
          dirname: logPath,
          filename: 'general.log',
          level: 'debug',
          options: {
            flags: 'w'
          },
          format: Winston.format.combine(Winston.format.splat(), Winston.format.simple())
        }),
        new Winston.transports.File({
          dirname: logPath,
          filename: 'error.log',
          level: 'error',
          options: {
            flags: 'w'
          }
        }),
        new Winston.transports.Console({
          level: 'debug'
        })
      ]
    });
    return logger;
  }

  public logName: string;
  // to do change to protected
  protected winstonLogger: Winston.Logger;
  private PROJECT_ROOT = '';

  constructor(testName: string = '') {
    this.PROJECT_ROOT = Path.join(__dirname, '..');
    this.winstonLogger = testName.length > 0
        ? TestLogger.createLogger(testName)
        : this.loggerById.winstonLogger;
    this.logName = testName;
  }

  public info(msg: string) {
    this.winstonLogger.info.apply(this.winstonLogger, this.formatLogArguments([msg]));
  }

  public warn(msg: string) {
    this.winstonLogger.warn.apply(this.winstonLogger, this.formatLogArguments([msg]));
  }

  public error(msg: string) {
    this.winstonLogger.error.apply(this.winstonLogger, this.formatLogArguments([msg]));
  }

  /**
   * Attempts to add file and line number info to the given log arguments.
   */
  private formatLogArguments(args) {
    args = Array.prototype.slice.call(args);

    const stackInfo = this.getStackInfo(1);

    if (stackInfo) {
      // get file path relative to project root
      const calleeStr = '[' + stackInfo.relativePath + ':' + stackInfo.line + ']';

      if (typeof (args[0]) === 'string') {
        args[0] = args[0] + ' ' + calleeStr;
      } else {
        args.unshift(calleeStr);
      }
    }

    return args;
  }

  /**
   * Parses and returns info about the call stack at the given index.
   */
  private getStackInfo(stackIndex) {
    // get call stack, and analyze it
    // get all file, method, and line numbers
    let stacklist = [''];
    const stack = (new Error()).stack;
    if (stack !== undefined) {
      stacklist = stack.split('\n').slice(3);
    }

    // stack trace format:
    // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
    // do not remove the regex expresses to outside of this method (due to a BUG in node.js)
    const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
    const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

    const s = stacklist[stackIndex] || stacklist[0];
    const sp = stackReg.exec(s) || stackReg2.exec(s);

    if (sp && sp.length === 5) {
      return {
        method: sp[1],
        relativePath: Path.relative(this.PROJECT_ROOT, sp[2]),
        line: sp[3],
        pos: sp[4],
        file: Path.basename(sp[2]),
        stack: stacklist.join('\n')
      };
    }
  }
}
