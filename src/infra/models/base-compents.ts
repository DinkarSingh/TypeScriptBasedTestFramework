import {logger, Logger} from "../decorators/logger-decorators";
import {TestLogger} from "../loggers/test-logger";

@logger()
export class BaseComponent implements Logger {
  // creating empty logger
  public logger!: TestLogger;
  protected parentElement;

  /**
   *
   * constructor
   * @param fileName the component file name
   * @param rootElement the element that contains the component (the container)
   */
  constructor(rootElement?: WebdriverIO.Element) {
    this.parentElement = rootElement;
  }


  /**
   * return component container web element
   */
  public get element() {
    return this.parentElement;
  }

  /**
   * check is component container exists
   */
  public isExistsAndDisplayed(): boolean {
    return this.parentElement.isExisting() && this.parentElement.isDisplayed();
  }

  /**
   * this function will cut the path from the full file name
   * @param fileName
   */
  protected getShortFileName(fileName: string): string {
    return fileName.replace(/^.*[\\\/]/, '');
  }

  /**
   * Will click on element by JS
   */
  protected clickJS(elementToClickOn: WebdriverIO.Element) {
    const jsClick = function (argument) {
      argument.click();
    };
    browser.execute(jsClick, elementToClickOn);
  }
}
