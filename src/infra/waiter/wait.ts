import {Timeouts} from "../enum/timeouts";

export function waitUntil(
  condition: () => boolean,
  timeout: Timeouts,
  timeoutMessage: string,
  interval?: Timeouts
): boolean {
return browser.waitUntil(condition, timeout, `Timeout after ${ timeout } milliseconds\n ${ timeoutMessage }`, interval);
}
