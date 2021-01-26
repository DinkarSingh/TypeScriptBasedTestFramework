import { expect } from 'chai';
import { CoreLogin } from '../../../src/pages/jellycorePages/login/coreLogin.page';
import { CoreHomePage } from '../../../src/pages/jellycorePages/coreHomePage/coreHome.page';
import { projConfig } from '../../../src/infra/resources/projConfig';
import { TestBuildingBlocks } from '../../../src/infra/utilities/testBuildingBlock';
import allureReporter from '@wdio/allure-reporter';
import { TestLogger } from '../../../src/infra/loggers/test-logger'

const coreLogin = new CoreLogin();
const coreHomePage = new CoreHomePage();
const currentTestName: string = '';
let logger: TestLogger;
let testIndex = 0;

describe('Jellycore: Login page tests cases', () => {

    before(() => {
        logger = new TestLogger();
        browser.url('/');
    });

    beforeEach(() => {
        testIndex++;
        browser.url('/');
    });

    it('TestC1- Verify that user with invalid UserID as credentials', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Enter the userID`, () => {
            coreLogin.enterUserId(projConfig.invalideUserID);
            expect(coreLogin.isInputUserNameExisting()).to.equal(true, 'Password button was not displaying');
        });

        TestBuildingBlocks.addStepAndExecute(`Enter the user password`, () => {
            coreLogin.enterPassword(projConfig.password);
            expect(coreLogin.isInputUserPasswordExisting()).to.equal(true, 'Submit button was not displaying');
        });

        TestBuildingBlocks.addStepAndExecute(`Click on submit button`, () => {
            coreLogin.clickSubmitButton();
            expect(coreLogin.getErrorMessageExisting()).to.equal('User not found', 'Successfully logged in Jellycore');
        });
    });

    it('Verify that user can with invalid passworkd as credentials', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Enter the userID`, () => {
            coreLogin.enterUserId(projConfig.userID);
            expect(coreLogin.isInputUserNameExisting()).to.equal(true, 'Password button was not displaying');
        });

        TestBuildingBlocks.addStepAndExecute(`Enter the user password`, () => {
            coreLogin.enterPassword(projConfig.invalidePassword);
            expect(coreLogin.isInputUserPasswordExisting()).to.equal(true, 'Submit button was not displaying');
        });

        TestBuildingBlocks.addStepAndExecute(`Click on submit button`, () => {
            coreLogin.clickSubmitButton();
            expect(coreLogin.getErrorMessageExisting()).to.equal('Wrong username or password.', 'Successfully logged in Jellycore');
        });
    });

    it('Verify that user with invalde UserID and Password as credentials', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Enter the userID`, () => {
            coreLogin.enterUserId(projConfig.invalideUserID);
            expect(coreLogin.isInputUserNameExisting()).to.equal(true, 'Password button was not displaying');
        });

        TestBuildingBlocks.addStepAndExecute(`Enter the user password`, () => {
            coreLogin.enterPassword(projConfig.invalidePassword);
            expect(coreLogin.isInputUserPasswordExisting()).to.equal(true, 'Submit button was not displaying');
        });

        TestBuildingBlocks.addStepAndExecute(`Click on submit button`, () => {
            coreLogin.clickSubmitButton();
            expect(coreLogin.getErrorMessageExisting()).to.equal('User not found', 'Successfully logged in Jellycore');
        });
    });

    it('Verify that formar user should not login in the core', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Enter the userID`, () => {
            coreLogin.enterUserId(projConfig.formarUser);
            expect(coreLogin.isInputUserNameExisting()).to.equal(true, 'Password button was not displaying');
        });

        TestBuildingBlocks.addStepAndExecute(`Enter the user password`, () => {
            coreLogin.enterPassword(projConfig.formarUserPassword);
            expect(coreLogin.isInputUserPasswordExisting()).to.equal(true, 'Submit button was not displaying');
        });

        TestBuildingBlocks.addStepAndExecute(`Click on submit button`, () => {
            coreLogin.clickSubmitButton();
            expect(coreLogin.getErrorMessageExisting()).to.equal('User not found', 'Successfully logged in Jellycore');
        });
    });

    it('Verify that user can successfully login with valid credentials', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Enter the userID and password`, () => {
            coreLogin.login(projConfig.userID, projConfig.password);
            expect(coreHomePage.isNewPostDisplaying()).to.equal(true, 'No home page displaying');
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            expect(coreHomePage.isNewPostDisplaying()).to.equal(true, 'Home page menus are not displaying');
        });
    });
});