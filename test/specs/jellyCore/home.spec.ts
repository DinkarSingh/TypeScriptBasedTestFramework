import { expect } from 'chai';
import { CoreHomePage } from '../../../src/pages/jellycorePages/coreHomePage/coreHome.page';
import { TestBuildingBlocks } from '../../../src/infra/utilities/testBuildingBlock';
import { TestLogger } from '../../../src/infra/loggers/test-logger';
import allureReporter from '@wdio/allure-reporter';
import { LoginDetails } from "../../../src/infra/models/login-detail";
import { BaseTestData } from "../../../src/infra/models/base-test-data";
import { JellycoreTestBuildingBlocks } from '../../../src/infra/utilities/jellycore-test-buildingBlock';
import { jellyCoreConfig } from '../../../src/infra/config/jellyCore.config';
const path = require('path');

let coreHomePage = new CoreHomePage();
let logger: TestLogger;
let testIndex = 0;
let testData: BaseTestData = new BaseTestData(undefined);
let jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);


describe('Jellycore: Home module test cases', () => {

    before(() => {
        logger = new TestLogger();
        testData = new BaseTestData(new LoginDetails(jellyCoreConfig.JellycoreEmail, jellyCoreConfig.JellycorePassword));
        jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);
        coreHomePage = jellycoreTestBuildingBlocks.navigateToCoreHomePage();
    });

    beforeEach(() => {
        testIndex++;
        coreHomePage = jellycoreTestBuildingBlocks.navigateToCoreHomePage();
        coreHomePage.selectSmashMonth('November');
    });

    it('[Smash] Verify that de-smash a video is possible', () => {
        allureReporter.addSeverity('critical');
        coreHomePage.clickOnSmashMonthDropdown();
        const smashOption = 'Not a smash';
        TestBuildingBlocks.addStepAndExecute(`Click on option button for Open and select as ${smashOption}`, () => {
            coreHomePage.ClickOnTableOptionButton();
            coreHomePage.waitTillOptionLoadReloads();
            coreHomePage.selectDeSmash(smashOption);
            expect(coreHomePage.isDeSmashValidationButtonExisting()).to.equal(true, `De smash validation was unsuccesfull`);
        });
    });

    it('[Smash] Verify that how the smash is calculated (modal explaining)', () => {
        allureReporter.addSeverity('critical');
        coreHomePage.clickOnSmashMonthDropdown();
        browser.pause(2000);
        TestBuildingBlocks.addStepAndExecute(`Click on Smash how to defined`, () => {
            coreHomePage.clickOnSmashDefine();
        });
        TestBuildingBlocks.addStepAndExecute(`Check that Smash defined pop up existing`, () => {
            expect(coreHomePage.isSmashDefinePopUpExisting()).to.equal(true, `Smash define pop up was not existing`);
        });
    });

    it('[Smash] Verify that how the bonus is calculated (modal explaining)', () => {
        allureReporter.addSeverity('critical');
        coreHomePage.clickOnSmashMonthDropdown();
        browser.pause(2000);
        TestBuildingBlocks.addStepAndExecute(`Click on Bonus how to defined`, () => {
            coreHomePage.clickOnBonusDefine();
        });
        TestBuildingBlocks.addStepAndExecute(`Check that Smash defined pop up existing`, () => {
            expect(coreHomePage.isBonusPopUpExisting()).to.equal(true, `Bonus pop up was not existing`);
        });
    });

    it('[Smash] Verify that Jellysmashers of the month', () => {
        allureReporter.addSeverity('critical');
        coreHomePage.clickOnSmashMonthDropdown();
        browser.pause(2000);
        TestBuildingBlocks.addStepAndExecute(`Checking jellysmaker of the month existing`, () => {
            expect(coreHomePage.isJellysmackMonthExisting()).to.equal(true, `Jellysmackers of the month was not displaying`);
        });
    });

    it('[Smash] Verify that user’s stats from the Creators dropdown', () => {
        allureReporter.addSeverity('critical');
        coreHomePage.clickOnSmashMonthDropdown();
        const creatorName = 'Alexandre Prevost';
        TestBuildingBlocks.addStepAndExecute(`Select the creator program from the list`, () => {
            coreHomePage.selectCreatorProgram(creatorName);
            expect(coreHomePage.isCreatorProgramStatus(creatorName)).to.equal(true, `Creator program ${creatorName} was not selected`);
        });
    });

    it('[Smash] Verify that Smash bonus change status is displaying or not', () => {
        allureReporter.addSeverity('critical');
        coreHomePage.clickOnSmashMonthDropdown();
        TestBuildingBlocks.addStepAndExecute(`Checking smash bonus status displaying`, () => {
            expect(coreHomePage.isSmashBonusChangeExisting()).to.equal(true, `Smash and bonus changes status was not displaying`);
        });
    });

    it('[Smash] Verify that retag option existing', () => {
        allureReporter.addSeverity('critical');
        coreHomePage.clickOnSmashMonthDropdown();
        TestBuildingBlocks.addStepAndExecute(`Click on option button for Open`, () => {
            coreHomePage.ClickOnTableOptionButton();
            coreHomePage.selectPopUpOptions('Retag');
            expect(coreHomePage.isRetaggedPageTitleExisting()).to.equal(true, `Retagged page title was not displaying`);
        });
    });
});