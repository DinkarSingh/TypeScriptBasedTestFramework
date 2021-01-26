import { expect } from 'chai';
import { TestLogger } from "../../../src/infra/loggers/test-logger";
import { BaseTestData } from "../../../src/infra/models/base-test-data";
import { LoginDetails } from "../../../src/infra/models/login-detail";
import { projConfig } from "../../../src/infra/resources/projConfig";
import { JellycoreTestBuildingBlocks } from "../../../src/infra/utilities/jellycore-test-buildingBlock";
import { CoreHomePage } from "../../../src/pages/jellycorePages/coreHomePage/coreHome.page";
import { PlanningPage } from "../../../src/pages/jellycorePages/planning/planning.page"
import {TestBuildingBlocks} from '../../../src/infra/utilities/testBuildingBlock';
import { CoreMainMenuEnum } from "../../../src/infra/enum/coreMainMenu-enum";
import allureReporter from '@wdio/allure-reporter';

let coreHomePage = new CoreHomePage();
const planningPage = new PlanningPage();
const currentTestName: string = '';
let logger: TestLogger;
let testIndex = 0;
let testData: BaseTestData = new BaseTestData(undefined);
let jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);

describe('Jellycore: Planning module test cases', () => {
    before(() => {
        logger = new TestLogger();
        testData = new BaseTestData(new LoginDetails(projConfig.userID, projConfig.password));
        jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);
        coreHomePage = jellycoreTestBuildingBlocks.navigateToCoreHomePage();
    });

    beforeEach(() => {
        testIndex++;
        coreHomePage = jellycoreTestBuildingBlocks.navigateToCoreHomePage();
    });

    it('Verify that previouly channel selected for planning page', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Click on main menu Posts on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.PLANNING);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.PLANNING)).to.equal(true, `${CoreMainMenuEnum.PLANNING} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that Schedule planning page displaying`, () => {
            expect(planningPage.isChangeChannelExisting()).to.equal(true, `Change channel button is not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on change channel button`, () => {
            planningPage.clickOnButtonChangeChannel();
            expect(planningPage.isTitleChangeChannelExisting()).to.equal(true, `Change channel title is not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the channel from the list`, () => {
            const channelName = "Gamology France";
            browser.pause(3000);
            planningPage.selectChannelList(channelName);
            expect(planningPage.isSelectedChannelExisting(channelName)).to.equal(true, `Channel is not selected as ${channelName}`);
        });
        const headerDate = planningPage.getHeaderDateText();
        TestBuildingBlocks.addStepAndExecute(`Click on the next key for channel planning dates`, () => {
            planningPage.clickNextMoveKey();
            const nextDate = planningPage.getHeaderDateText();
            expect(headerDate).to.not.eq(nextDate, `Date was not unchange`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on the previous key for channel planning dates`, () => {
            planningPage.clickPreMoveKey();
            const nextDate = planningPage.getHeaderDateText();
            expect(headerDate).to.equal(nextDate, `Date was not unchange`);
        });
    });

    it('Verify that planning main menu button can access', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Click on main menu Posts on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.PLANNING);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.PLANNING)).to.equal(true, `${CoreMainMenuEnum.PLANNING} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that Schedule planning page displaying`, () => {
            expect(planningPage.isChangeChannelExisting()).to.equal(true, `Change channel button is not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on change channel button`, () => {
            planningPage.clickOnButtonChangeChannel();
            expect(planningPage.isTitleChangeChannelExisting()).to.equal(true, `Change channel title is not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the channel from the list`, () => {
            const channelName = "Gamology France";
            browser.pause(3000);
            planningPage.selectChannelList(channelName);
            expect(planningPage.isSelectedChannelExisting(channelName)).to.equal(true, `Channel is not selected as ${channelName}`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify available planning dates displaying`, () => {
            planningPage.selectAvailableDates();
            expect(planningPage.isPopUpTitleExisting()).to.equal(true, `Available dates pop up was not displaying`);
            expect(planningPage.isNewScheduleExisting()).to.equal(true, `Submit new schedule was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Close the available dates pop`, () => {
            const channelName = "Gamology France";
            planningPage.closePopUpButton();
            expect(planningPage.isSelectedChannelExisting(channelName)).to.equal(true, `Channel is not selected as ${channelName}`);
        });
    });
});