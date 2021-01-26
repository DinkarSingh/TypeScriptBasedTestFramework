import { expect } from 'chai';
import { CoreHomePage } from '../../../src/pages/jellycorePages/coreHomePage/coreHome.page';
import { TestBuildingBlocks } from '../../../src/infra/utilities/testBuildingBlock';
import { TestLogger } from '../../../src/infra/loggers/test-logger';
import { CoreMainMenuEnum } from '../../../src/infra/enum/coreMainMenu-enum';
import { Channel } from '../../../src/pages/jellycorePages/channels/channel.page';
import allureReporter from '@wdio/allure-reporter';
import { LoginDetails } from "../../../src/infra/models/login-detail";
import { BaseTestData } from "../../../src/infra/models/base-test-data";
import { JellycoreTestBuildingBlocks } from '../../../src/infra/utilities/jellycore-test-buildingBlock';
import { jellyCoreConfig } from '../../../src/infra/config/jellyCore.config';
import { ChennelsHeaders } from '../../../src/infra/enum/channelHeaders-enum';

let coreHomePage = new CoreHomePage();
const channel = new Channel();
let logger: TestLogger;
let testIndex = 0;
let testData: BaseTestData = new BaseTestData(undefined);
let jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);


describe('Jellycore: Channels module test cases', () => {

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

    it('Verify that time period filter applied', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Verify that in core home page new post button displaying`, () => {
            browser.pause(2000);
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.CHANNELS} on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.CHANNELS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.CHANNELS)).to.equal(true, `${CoreMainMenuEnum.CHANNELS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on time period dropdown filter`, () => {
            channel.clickTimePeriodFilter();
        });
        const title = channel.getPostTitle();
        const options = "Last 90 days";
        const optionAll = "Last 7 days";
        TestBuildingBlocks.addStepAndExecute(`Select time period as ${options} from the dropdown`, () => {
            channel.selectPeriodDropdownFilter(options);
            channel.clickPeriodValidation('Validate');
            const mainPagePostTitle = channel.getPostTitle();
            expect(title).to.not.equal(mainPagePostTitle, `${options} post are not displaying`)
        });
        TestBuildingBlocks.addStepAndExecute(`Select time period as ${optionAll} from the dropdown`, () => {
            channel.clickTimePeriodFilter();
            channel.selectPeriodDropdownFilter(optionAll);
            channel.clickPeriodValidation('Validate');
            const allPagePostTitle = channel.getPostTitle();
            expect(title).to.equal(allPagePostTitle, `${optionAll} post are not displaying`)
        });
    });

    it('Verify that channel table has all the informaton', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Verify that in core home page new post button displaying`, () => {
            browser.pause(2000);
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.CHANNELS} on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.CHANNELS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.CHANNELS)).to.equal(true, `${CoreMainMenuEnum.CHANNELS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that channel valus are displaying in the each column`, () => {
            channel.waitTillTableReloads();
            expect(channel.isChannelInfoExisting()).to.equal(true, `Channel details was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that ${ChennelsHeaders.VIDEOS} column values are displaying in the each column`, () => {
            expect(channel.isVideoColumnExisting()).to.equal(true, `${ChennelsHeaders.VIDEOS} column values was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that ${ChennelsHeaders.POSTS} column values are displaying in the each column`, () => {
            expect(channel.isPostsColumnExisting()).to.equal(true, `${ChennelsHeaders.POSTS} column values was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that ${ChennelsHeaders.X_POSTS} column valus values are displaying in the each column`, () => {
            expect(channel.isXPostsColumnExisting()).to.equal(true, `${ChennelsHeaders.X_POSTS} column valus was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that ${ChennelsHeaders.POSTING_PACE} column values are displaying in the each column`, () => {
            expect(channel.isPostingPaceColumnExisting()).to.equal(true, `${ChennelsHeaders.POSTING_PACE} column valus was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that ${ChennelsHeaders.VIDEO_IMPRESSION} column values are displaying in the each column`, () => {
            expect(channel.isVideoImpressionColumnExisting()).to.equal(true, `${ChennelsHeaders.VIDEO_IMPRESSION} column valus was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that ${ChennelsHeaders.CTR} column values are displaying in the each column`, () => {
            expect(channel.isCTRColumnExisting()).to.equal(true, `${ChennelsHeaders.CTR} column values was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that ${ChennelsHeaders.VIEWS} column values are displaying in the each column`, () => {
            expect(channel.isViewsColumnExisting()).to.equal(true, `${ChennelsHeaders.VIEWS} column values was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that ${ChennelsHeaders.CPM} column values are displaying in the each column`, () => {
            expect(channel.isCPMColumnExisting()).to.equal(true, `${ChennelsHeaders.CPM} column values was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that ${ChennelsHeaders.EARNING} column values are displaying in the each column`, () => {
            expect(channel.isEarningColumnExisting()).to.equal(true, `${ChennelsHeaders.EARNING} column values was not displaying`);
        });
    });

    it('Verify that selected column filter displaying channels table header', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Verify that in core home page new post button displaying`, () => {
            browser.pause(2000);
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.CHANNELS} on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.CHANNELS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.CHANNELS)).to.equal(true, `${CoreMainMenuEnum.CHANNELS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on column filter button`, () => {
            channel.clickColumnFilterButton();
            expect(channel.isColumnFilterOpenExisting()).to.equal(true, `Column filter panel was not opened`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the column ${ChennelsHeaders.VIEWS_VIDEOS} from filter`, () => {
            channel.selectChannelColumn(ChennelsHeaders.VIEWS_VIDEOS);
            const tableHeader = channel.getTableHeaderValues();
            const isPublishedTableExisting = [ChennelsHeaders.VIEWS_VIDEOS].every((enumOption) => tableHeader.includes(enumOption));
            expect(isPublishedTableExisting).to.equal(true, `Selectd column ${ChennelsHeaders.VIEWS_VIDEOS} was not displaying in the table`);
        });
        TestBuildingBlocks.addStepAndExecute(`Unselect the column ${ChennelsHeaders.VIEWS_VIDEOS} from filter`, () => {
            channel.unSelectColumns(ChennelsHeaders.VIEWS_VIDEOS);
            channel.ClickCloseColumnFilterButton();
            const tableHeader = channel.getTableHeaderValues();
            const isPublishedTableExisting = [ChennelsHeaders.VIEWS_VIDEOS].every((enumOption) => tableHeader.includes(enumOption));
            expect(isPublishedTableExisting).to.equal(false, `Selectd column ${ChennelsHeaders.VIEWS_VIDEOS} was displaying in the table`);
        });
    });


    it('Verify that type of page filter applied', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Verify that in core home page new post button displaying`, () => {
            browser.pause(2000);
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.CHANNELS} on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.CHANNELS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.CHANNELS)).to.equal(true, `${CoreMainMenuEnum.CHANNELS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on type of page dropdown filter`, () => {
            channel.clickTypeOfPageFilter();
        });
        const title = channel.getPostTitle();
        const options = "Draft Pages";
        const optionAll = "All Page types";
        TestBuildingBlocks.addStepAndExecute(`Select type of page as ${options} from the dropdown`, () => {
            channel.selectDropdownFilter(options);
            const mainPagePostTitle = channel.getPostTitle();
            expect(title).to.not.equal(mainPagePostTitle, `${options} post are not displaying`)
        });
        TestBuildingBlocks.addStepAndExecute(`Select type of page as ${optionAll} from the dropdown`, () => {
            channel.selectDropdownFilter(optionAll);
            browser.pause(3000);
            const allPagePostTitle = channel.getPostTitle();
            expect(title).to.equal(allPagePostTitle, `${optionAll} post are not displaying`)
        });
    });

    it('Verify that verticals filter applied', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Verify that in core home page new post button displaying`, () => {
            browser.pause(2000);
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.CHANNELS} on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.CHANNELS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.CHANNELS)).to.equal(true, `${CoreMainMenuEnum.CHANNELS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on type vertical dropdown filter`, () => {
            channel.clickVericalFilter();
        });
        const title = channel.getPostTitle();
        const options = "Basket";
        const optionAll = "All Verticals";
        TestBuildingBlocks.addStepAndExecute(`Select type vertical as ${options} from the dropdown`, () => {
            channel.selectDropdownFilter(options);
            const mainPagePostTitle = channel.getPostTitle();
            expect(title).to.not.equal(mainPagePostTitle, `${options} post are not displaying`)
        });
        TestBuildingBlocks.addStepAndExecute(`Select type vertical as ${optionAll} from the dropdown`, () => {
            channel.selectDropdownFilter(optionAll);
            const allPagePostTitle = channel.getPostTitle();
            expect(title).to.equal(allPagePostTitle, `${optionAll} post are not displaying`)
        });
    });
});