import { expect } from 'chai';
import { CoreHomePage } from '../../../src/pages/jellycorePages/coreHomePage/coreHome.page';
import { TestBuildingBlocks } from '../../../src/infra/utilities/testBuildingBlock';
import { TestLogger } from '../../../src/infra/loggers/test-logger';
import { CoreMainMenuEnum } from '../../../src/infra/enum/coreMainMenu-enum'
import { Creators } from '../../../src/pages/jellycorePages/creators/creators.page';
import allureReporter from '@wdio/allure-reporter';
import { LoginDetails } from "../../../src/infra/models/login-detail";
import { BaseTestData } from "../../../src/infra/models/base-test-data";
import { JellycoreTestBuildingBlocks } from '../../../src/infra/utilities/jellycore-test-buildingBlock';
import { jellyCoreConfig } from '../../../src/infra/config/jellyCore.config';

let coreHomePage = new CoreHomePage();
const creators = new Creators();
let logger: TestLogger;
let testIndex = 0;
let testData: BaseTestData = new BaseTestData(undefined);
let jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);


describe('Jellycore: Creators module test cases', () => {

    before(() => {
        logger = new TestLogger();
        testData = new BaseTestData(new LoginDetails(jellyCoreConfig.JellycoreEmail, jellyCoreConfig.JellycorePassword));
        jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);
        coreHomePage = jellycoreTestBuildingBlocks.navigateToCoreHomePage();
    });

    beforeEach(() => {
        testIndex++;
        coreHomePage = jellycoreTestBuildingBlocks.navigateToCoreHomePage();
    });

    it('Verify that creators can download the videos', () => {
        allureReporter.addSeverity('critical');
        const searchField = "We Let FORTUNE COOKIES Control Our Lives! (BAD IDEA)";
        const status = "Download edit files";
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu Creators on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.CREATORS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.CREATORS)).to.equal(true, `${CoreMainMenuEnum.CREATORS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the library sub menus are selected for Creators main menu`, () => {
            expect(creators.isLibraryExistingDisplaying()).to.equal(true, `Library sub main menu was not selected bydefult`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the video is downloading`, () => {
            creators.waitTillTableReloads();
            creators.clickOnFilterButton();
            expect(creators.isFilterPanelExisting()).to.equal(true, `Filter panel was not displyed`);
            creators.selectPostedOnTimeSchedule("All time");
            creators.clickClearAllButton();
            creators.waitTillTableReloads();
            browser.pause(5000);
            creators.enterSearchFilterText(searchField);
            creators.ClickOnTableOptionButton();
            browser.pause(2000);
            creators.selectPopUpOptions(status);
            const downLoadCheckBoxStatus = creators.getDownloadVideoStatus();
            expect(downLoadCheckBoxStatus).to.equal(true, `Video download can not be possible`);
            creators.clickDownLoadPopUpButton("Download");
            expect(creators.getUpdatedStatusText()).to.contain("Download yt", `Updated option pop-up does not displayed`);
        });
    });

    it('Verify that creators can change the status as Banned by Creator', () => {
        allureReporter.addSeverity('critical');
        const status = "Banned by Creator";
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu Creators on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.CREATORS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.CREATORS)).to.equal(true, `${CoreMainMenuEnum.CREATORS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the library sub menus are selected for Creators main menu`, () => {
            expect(creators.isLibraryExistingDisplaying()).to.equal(true, `Library sub main menu was not selected bydefult`);
        });
        TestBuildingBlocks.addStepAndExecute(`Change the creators status as ${status}`, () => {
            creators.waitTillTableReloads();
            creators.clickOnFilterButton();
            expect(creators.isFilterPanelExisting()).to.equal(true, `Filter panel was not displyed`);
            creators.selectPostedOnTimeSchedule("Last month");
            creators.waitTillTableReloads();
            creators.selectStatusFilterList("Available");
            expect(creators.isTableColumnExisting()).to.equal(true, `In table column are not displaying`);
            creators.clickClearAllButton();
            creators.waitTillTableReloads();
            let statusList = creators.getStatusTableValues();
            const isAvailableOptionsExisting = statusList.every(statusOption => statusOption === 'Available');
            expect(isAvailableOptionsExisting).to.equal(true, `In the status column does not have available option`);
            browser.pause(2000);
            creators.ClickOnTableOptionButton();
            //creators.waitTillOptionLoadReloads();
            creators.selectPopUpOptions(status);
            creators.waitTillTableReloads();
            statusList = creators.getStatusTableValues();
            browser.pause(2000);
            expect(statusList[0]).to.equal(status, `Status does not changed as ${status}`);
            expect(creators.getUpdatedStatusText()).to.equal("Video status updated", `Updated ooption pop does not displayed`);
            creators.waitTillTableReloads();
            creators.ClickOnTableOptionButton();
            //creators.waitTillOptionLoadReloads();
            creators.selectPopUpOptions("Available");
            expect(creators.getUpdatedStatusText()).to.equal("Video status updated", `Updated option pop-up does not displayed`);
            browser.pause(2000);
            statusList = creators.getStatusTableValues();
            expect(statusList[0]).to.equal("Available", `Status does not changed as ${status}`);
        });
    });

    it('Verify that creators can change the status as Not Brand Safe', () => {
        allureReporter.addSeverity('critical');
        const status = "Not Brand Safe";
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu Creators on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.CREATORS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.CREATORS)).to.equal(true, `${CoreMainMenuEnum.CREATORS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the library sub menus are selected for Creators main menu`, () => {
            expect(creators.isLibraryExistingDisplaying()).to.equal(true, `Library sub main menu was not selected bydefult`);
        });
        TestBuildingBlocks.addStepAndExecute(`Change the creators status as ${status}`, () => {
            creators.waitTillTableReloads();
            creators.clickOnFilterButton();
            expect(creators.isFilterPanelExisting()).to.equal(true, `Filter panel was not displyed`);
            creators.selectPostedOnTimeSchedule("Last month");
            creators.waitTillTableReloads();
            creators.selectStatusFilterList("Available");
            expect(creators.isTableColumnExisting()).to.equal(true, `In table column are not displaying`);
            creators.clickClearAllButton();
            creators.waitTillTableReloads();
            let statusList = creators.getStatusTableValues();
            const isAvailableOptionsExisting = statusList.every(statusOption => statusOption === 'Available');
            expect(isAvailableOptionsExisting).to.equal(true, `In the status column does not have available option`);
            creators.ClickOnTableOptionButton();
            creators.waitTillOptionLoadReloads();
            creators.selectPopUpOptions(status);
            browser.pause(2000);
            statusList = creators.getStatusTableValues();
            expect(statusList[0]).to.equal(status, `Status does not changed as ${status}`);
            expect(creators.getUpdatedStatusText()).to.equal("Video status updated", `Updated option pop-up does not displayed`);
            creators.waitTillTableReloads();
            creators.ClickOnTableOptionButton();
            creators.waitTillOptionLoadReloads();
            creators.selectPopUpOptions("Available");
            expect(creators.getUpdatedStatusText()).to.equal("Video status updated", `Updated option pop-up does not displayed`);
            creators.waitTillTableReloads();
            statusList = creators.getStatusTableValues();
            expect(statusList[0]).to.equal("Available", `Status does not changed as ${status}`);
        });
    });

    it('Verify that creators can change the status as Bad AB test', () => {
        allureReporter.addSeverity('critical');
        const status = "Bad AB test";
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu Creators on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.CREATORS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.CREATORS)).to.equal(true, `${CoreMainMenuEnum.CREATORS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the library sub menus are selected for Creators main menu`, () => {
            expect(creators.isLibraryExistingDisplaying()).to.equal(true, `Library sub main menu was not selected bydefult`);
        });
        TestBuildingBlocks.addStepAndExecute(`Change the creators status as ${status}`, () => {
            creators.waitTillTableReloads();
            creators.clickOnFilterButton();
            expect(creators.isFilterPanelExisting()).to.equal(true, `Filter panel was not displyed`);
            creators.selectPostedOnTimeSchedule("Last month");
            creators.waitTillTableReloads();
            creators.selectStatusFilterList("Available");
            expect(creators.isTableColumnExisting()).to.equal(true, `In table column are not displaying`);
            creators.clickClearAllButton();
            creators.waitTillTableReloads();
            let statusList = creators.getStatusTableValues();
            const isAvailableOptionsExisting = statusList.every(statusOption => statusOption === 'Available');
            expect(isAvailableOptionsExisting).to.equal(true, `In the status column does not have available option`);
            creators.ClickOnTableOptionButton();
            creators.waitTillOptionLoadReloads();
            creators.selectPopUpOptions(status);
            creators.waitTillTableReloads();
            statusList = creators.getStatusTableValues();
            expect(statusList[0]).to.equal(status, `Status does not changed as ${status}`);
            expect(creators.getUpdatedStatusText()).to.equal("Video status updated", `Updated option pop-up does not displayed`);
            creators.waitTillTableReloads();
            creators.ClickOnTableOptionButton();
            creators.waitTillOptionLoadReloads();
            creators.selectPopUpOptions("Available");
            expect(creators.getUpdatedStatusText()).to.equal("Video status updated", `Updated option pop-up does not displayed`);
            creators.waitTillTableReloads();
            statusList = creators.getStatusTableValues();
            expect(statusList[0]).to.equal("Available", `Status does not changed as ${status}`);
        });
    });

    it('Verify that creators can change the status as Too old', () => {
        allureReporter.addSeverity('critical');
        const status = "Too old";
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu Creators on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.CREATORS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.CREATORS)).to.equal(true, `${CoreMainMenuEnum.CREATORS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the library sub menus are selected for Creators main menu`, () => {
            expect(creators.isLibraryExistingDisplaying()).to.equal(true, `Library sub main menu was not selected bydefult`);
        });
        TestBuildingBlocks.addStepAndExecute(`Change the creators status as ${status}`, () => {
            creators.waitTillTableReloads();
            creators.clickOnFilterButton();
            expect(creators.isFilterPanelExisting()).to.equal(true, `Filter panel was not displyed`);
            creators.selectPostedOnTimeSchedule("Last month");
            creators.waitTillTableReloads();
            creators.selectStatusFilterList("Available");
            expect(creators.isTableColumnExisting()).to.equal(true, `In table column are not displaying`);
            creators.clickClearAllButton();
            creators.waitTillTableReloads();
            let statusList = creators.getStatusTableValues();
            const isAvailableOptionsExisting = statusList.every(statusOption => statusOption === 'Available');
            expect(isAvailableOptionsExisting).to.equal(true, `In the status column does not have available option`);
            creators.ClickOnTableOptionButton();
            creators.waitTillOptionLoadReloads();
            creators.selectPopUpOptions(status);
            creators.waitTillTableReloads();
            statusList = creators.getStatusTableValues();
            expect(statusList[0]).to.equal(status, `Status does not changed as ${status}`);
            expect(creators.getUpdatedStatusText()).to.equal("Video status updated", `Updated option pop-up does not displayed`);
            creators.waitTillTableReloads();
            creators.ClickOnTableOptionButton();
            creators.waitTillOptionLoadReloads();
            creators.selectPopUpOptions("Available");
            expect(creators.getUpdatedStatusText()).to.equal("Video status updated", `Updated option pop-up does not displayed`);
            creators.waitTillTableReloads();
            statusList = creators.getStatusTableValues();
            expect(statusList[0]).to.equal("Available", `Status does not changed as ${status}`);
        });
    });

    it('Verify that creators can change the status as Status Error', () => {
        allureReporter.addSeverity('critical');
        const status = "Status Error";
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu Creators on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.CREATORS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.CREATORS)).to.equal(true, `${CoreMainMenuEnum.CREATORS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the library sub menus are selected for Creators main menu`, () => {
            expect(creators.isLibraryExistingDisplaying()).to.equal(true, `Library sub main menu was not selected bydefult`);
        });
        TestBuildingBlocks.addStepAndExecute(`Change the creators status as ${status}`, () => {
            creators.waitTillTableReloads();
            creators.clickOnFilterButton();
            expect(creators.isFilterPanelExisting()).to.equal(true, `Filter panel was not displyed`);
            creators.selectPostedOnTimeSchedule("Last month");
            creators.waitTillTableReloads();
            creators.selectStatusFilterList("Available");
            expect(creators.isTableColumnExisting()).to.equal(true, `In table column are not displaying`);
            creators.clickClearAllButton();
            creators.waitTillTableReloads();
            const statusList = creators.getStatusTableValues();
            const isAvailableOptionsExisting = statusList.every(statusOption => statusOption === 'Available');
            expect(isAvailableOptionsExisting).to.equal(true, `In the status column does not have available option`);
            creators.ClickOnTableOptionButton();
            creators.waitTillOptionLoadReloads();
            creators.selectPopUpOptions(status);
            expect(creators.isStatuErrorReasonExisting()).to.equal(true, `Error status pop does not displayed`);
            creators.enterTextOnTextBox("Test error message");
            creators.ClickValidateButton();
            expect(creators.getUpdatedStatusText()).to.equal("Video status updated", `Updated option pop-up does not displayed`);
            creators.waitTillTableReloads();
            creators.ClickOnTableOptionButton();
            creators.waitTillOptionLoadReloads();
            creators.selectPopUpOptions("Not a status error");
            expect(creators.getUpdatedStatusText()).to.equal("Video status updated", `Updated option pop-up does not displayed`);
        });
    });
});