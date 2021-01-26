export type Execution = undefined | 'pending' | 'only' | 'skip';

export interface SuiteParams {
  name?: string;
  execution?: Execution;
}

export interface TestParams {
  name?: string;
  story?: string;
  testId?: string;
  issueId?: string;
  severity?: SeverityType;
  feature?: string;
}

export interface StepParams {
  name: string;
  markBrokenOn?: any[];
}

export enum StepStatus {
  passed = 'passed',
  failed = 'failed',
  broken = 'broken'
}

export interface SuiteReflectModel {
  name: string,
  params: SuiteParams
}

export interface TestReflectModel {
  name: string;
  params: TestParams
}

export enum SeverityType {
  Low = 'low',
  Normal = 'normal',
  High = 'high',
  Critical = 'critical',
  Blocker = 'blocker'
}
